import {  useMemo, useState } from "react";
import { useGetLocationsQuery } from "../../features/locationsAndBranches/locBrancesAPI";
import { useForm } from "react-hook-form";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { bookingsApi } from "../../features/bookings/bookingsApi";
import { loadStripe } from "@stripe/stripe-js";
import { paymentApi } from "../../features/payments/paymentApi";
import { vehicleApi } from "../../features/vehicles/vehicleApi";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	SelectSeparator,
} from "@/components/ui/select";

import { format } from "date-fns";

import {
	Form,
	FormControl,
	FormField,
	FormLabel,
	FormItem,
	FormMessage,
} from "@/components/ui/form";

import { toast } from "@/components/ui/use-toast";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/features/login/LoginForm";

const BookingSchema = yup.object().shape({
	user_id: yup.number().required("User ID is required"),
	vehicle_id: yup.number().required("Vehicle ID is required"),
	location_id: yup.number().required("Location ID is required"),
	booking_date: yup.date().required("Booking date is required"),
	return_date: yup.date().required("Return date is required"),
	total_amount: yup.number().required("Total amount is required"),
});

const Bookings = () => {
	const { user } = useSelector((state: RootState) => state.session);
	const [checkOut,{isLoading:isChecking}] = paymentApi.useCheckOutMutation();
	const { data: locations, isLoading } = useGetLocationsQuery();

	const { vehicleId } = useParams();

	const form = useForm<yup.InferType<typeof BookingSchema>>({
		resolver: yupResolver(BookingSchema),
		defaultValues: {
			user_id: user?.user_id,
			vehicle_id: Number(vehicleId),
			location_id: undefined,
			booking_date: undefined,
			return_date: undefined,
			total_amount: 0,
		},
	});

	const { data: vehicle, error } = vehicleApi.useGetVehicleByIdQuery(
		Number(vehicleId)
	);

	const [addBooking] =
		bookingsApi.useAddBookingMutation();

	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);
	const [locationId, setLocationId] = useState<number | undefined>(undefined);

	if (!user) return <Navigate to={"/login"} />;
	error && console.log(error);
	const vehicleSpecs = vehicle?.vehicleSpecs;
	const rentalRate = vehicle?.rental_rate;

	const calculateTotalCost = () => {
		if (startDate && endDate && rentalRate) {
			const duration =
				Math.ceil(
					(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
				) + 1;
			return rentalRate * duration;
		}
		return 0;
	};

	const totalCost = useMemo(() => {
		if (startDate && endDate && rentalRate) {
			return calculateTotalCost();
		}
		return 0;
	}, [startDate, endDate, rentalRate]);



	const Book = async (data: yup.InferType<typeof BookingSchema>) => {
		const key = 'pk_test_51PYWB7AfWaTAZW5WwrIU7cBSiAkB9EM4WS29c76ZfyHDHTL94jNC3IDRSsHfwxB72aQYW37a4abh00yYCxAtRmdB00751Xr5xF'

		if (!key) {
			console.error("Stripe publishable key  not defined");
			return;
		}
		if (!startDate || !endDate || !locationId || !totalCost) {
			return console.log("Please fill in all fields");
		}

		data.total_amount = totalCost as number;
		



		const res = await addBooking(data);
		
		if(res.data)
		{
			toast({description:"Booking was successful"});
			const stripePromise = loadStripe(
				key
			);

			const stripe = await stripePromise;
			const [{ booking_id }] = res.data || [];

			const payment = {
				amount: totalCost,
				bookingId: booking_id,
				vehicleSpecs: `${vehicleSpecs?.manufacturer} ${vehicleSpecs?.model}`,
			};
			const response = await checkOut(payment);
			console.log(response.data);
			const session = response.data;
			await stripe?.redirectToCheckout({ sessionId: session.id });
		}

		if (res.error) {
			toast({description:"An error occured while booking"});
			console.log(res);
		}
			
		
	};

	console.log(form.watch())

	//Todo: Implement validation for dates

	return (
		<div className='flex flex-col min-h-screen'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(Book)}
					className='grid grid-cols-2 gap-4 p-6 md:p-10 mt-10'
				>
					{/* <main className='flex-1 grid md:grid-cols-2 gap-8 p-6 md:p-10'> */}
					<div className='bg-card p-6 rounded-lg shadow'>
						<h2 className='text-2xl font-bold mb-4'>Book Your Rental</h2>

						<FormField
							control={form.control}
							name='booking_date'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel htmlFor='booking_date'>Pickup Date</FormLabel>
									<Input
										type='date'
										value={
											field.value
												? new Date(field.value).toISOString().split("T")[0]
												: ""
										}
										onChange={(e) => {
											field.onChange(e.target.value);
											setStartDate(new Date(e.target.value));
										}}
										min={format(new Date(), "yyyy-MM-dd")}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='return_date'
							render={({ field }) => (
								<FormItem className='flex flex-col my-3'>
									<FormLabel htmlFor='return-date'>Drop-off Date</FormLabel>

									<Input
										type='date'
										value={
											field.value
												? new Date(field.value).toISOString().split("T")[0]
												: ""
										}
										onChange={(e) => {
											field.onChange(e.target.value);
											setEndDate(new Date(e.target.value));
										}}
										min={format(new Date(), "yyyy-MM-dd")}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='location_id'
							render={({ field }) => (
								<FormItem className='flex flex-col my-3'>
									<FormLabel htmlFor='location'>Location</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
											setLocationId(Number(value));
										}}
										defaultValue={field.value?.toString()}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select pickup location' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{isLoading ? (
												<div>Loading...</div>
											) : (
												locations?.map((location) => (
													<SelectItem
														key={location.location_id}
														value={location.location_id.toString()}
													>
														{location.name}
													</SelectItem>
												))
											)}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='mt-10'>
							<label className='block text-xs text-emerald-950'>
								Total Cost:
							</label>
							<span className='text-3xl font-bold text-emerald-500'>
								$ {totalCost}
							</span>
						</div>
					</div>
					
					<div className=' flex flex-col justify-center  bg-card p-6 rounded-lg shadow'>
					{isLoading ?
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
				:
				(<>
				<h2 className='text-2xl font-bold mb-4'>
							{vehicleSpecs?.manufacturer} {vehicleSpecs?.model}
						</h2>
						<div className='grid gap-4'>
							<img
								src={`${vehicleSpecs?.image_url}`}
								alt={`${vehicleSpecs?.manufacturer} ${vehicleSpecs?.model}`}
								width={300}
								height={200}
								className='h-48 w-full rounded-t-lg object-cover transition-opacity group-hover:opacity-80'
							/>
					

							<div className='p-4'>
								<div className='flex items-center justify-between'>
									<div className='text-lg font-medium'>
										<SelectSeparator />
										{vehicle?.availability && (
											<Badge className='bg-green-200 text-green-600'>
												• Available
											</Badge>
										)}
									</div>
									<div className='text-green-600'>
										<span className=' text-2xl font-bold'>
											${vehicle?.rental_rate}
										</span>
										/day
									</div>
								</div>
								<div className='mt-2 text-sm text-muted-foreground'>
									{vehicleSpecs?.year} • {vehicleSpecs?.seating_capacity}{" "}
									passengers • {vehicleSpecs?.engine_capacity} mpg
								</div>
								<p className='mt-4 text-sm leading-relaxed'>
									{vehicleSpecs?.features}
								</p>
							</div>
						</div>
				</>)}
						
					</div>
					<div className='bg-card p-6 rounded-lg shadow col-span-2'>
						<h2 className='text-2xl font-bold mb-4'>Your Booking</h2>
						<div className='grid gap-4'>
							<div className='grid grid-cols-[120px_1fr] items-center gap-4'>
								<img
									src={vehicleSpecs?.image_url}
									width={120}
									height={80}
									alt='Vehicle'
									className='aspect-video object-cover rounded-md'
								/>
								<div>
									<div className='font-medium'>
										{vehicle?.vehicleSpecs.manufacturer}{" "}
										{vehicle?.vehicleSpecs.model}
									</div>

									<div className='text-muted-foreground'>
										$ {vehicle?.rental_rate}/day
									</div>
								</div>
							</div>
							<div className='grid grid-cols-2 gap-4'>
								<div className='grid gap-2'>
									<div className='font-medium'>Pickup Location</div>
									{
										<div>
											{
												locations?.find(
													(location) => location.location_id === locationId
												)?.name
											}
										</div>
									}
								</div>
								<div className='grid gap-2'>
									<div className='font-medium'>Drop-off Location</div>
									{
										<div>
											{
												locations?.find(
													(location) => location.location_id === locationId
												)?.name
											}
										</div>
									}
								</div>
							</div>
							<div className='grid grid-cols-2 gap-4'>
								<div className='grid gap-2'>
									<div className='font-medium'>Pickup Date</div>
									<div>
										{startDate &&
											startDate.toLocaleDateString("en-US", {
												month: "long",
												day: "numeric",
												year: "numeric",
											})}
									</div>
								</div>
								<div className='grid gap-2'>
									<div className='font-medium'>Drop-off Date</div>
									<div>
										{endDate &&
											endDate.toLocaleDateString("en-US", {
												month: "long",
												day: "numeric",
												year: "numeric",
											})}
									</div>
								</div>
							</div>
							<div className='grid grid-cols-2 gap-4'>
								<div className='grid gap-2'>
									<div className='font-medium'>Total Cost</div>
									<div>${totalCost}</div>
								</div>

								{ isChecking ? <ButtonLoading name="Checking out..."/> : <Button type='submit' className='w-full'>
									Confirm Booking
								</Button>}
								
							</div>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default Bookings;

