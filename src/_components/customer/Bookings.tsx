import { useEffect, useState } from "react";
import { useGetLocationsQuery } from "../../features/locationsAndBranches/locBrancesAPI";
import Nav, { AuthUser } from "../Nav";
import { useForm } from "react-hook-form";
import { RootState } from "../../app/store";
import {  useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetVehicleByIdQuery } from "../../features/vehicles/vehicleApi";
import { bookingsApi } from "../../features/bookings/bookingsApi";
import { loadStripe } from '@stripe/stripe-js';
import { paymentApi } from "../../features/payments/paymentApi";

type FormValues = {
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: Date;
  return_date: Date;
  total_amount: number;
};


const Bookings = () => {

  const {user}=useSelector((state:RootState)=>state.session)
  const [checkOut,{data}] =paymentApi.useCheckOutMutation()

  const {register,handleSubmit,setValue,formState:{errors}} = useForm<FormValues>()
  const {vehicleId}=useParams()
  const {data:vehicle, error, isLoading:loadingV} =useGetVehicleByIdQuery(Number(vehicleId))
  const {data:locations,isLoading,isError}= useGetLocationsQuery()
  const [addBooking] = bookingsApi.useAddBookingMutation()

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalCost,setTotalCost] = useState<number | ''>('');
  const [locationId, setLocationId] = useState<number | null>();
 
  if(!user) return console.log('No user found')
	const {user_id:uId}: AuthUser=user 
  error && console.log(error)
  const vehicleSpecs = vehicle?.vehicleSpecs
  const rentalRate = vehicle?.rental_rate;
  
  const handleBookDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	  setStartDate(new Date(event.target.value));
	};
	
	const handleReturnDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {	
		setEndDate(new Date(event.target.value));
	};

	const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const locId = parseInt(event.target.value);
		console.log(typeof(locId));
		setLocationId(locId);
	}

	
	const calculateTotalCost = ()=> {
		if (startDate && endDate && rentalRate) {
			const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
			return rentalRate * duration;
		}
		return 0;
	};
	
	useEffect(() => {
	  if (startDate && endDate && rentalRate) {
		setTotalCost(calculateTotalCost());
	  }
	}, [startDate, endDate]);

	

  const Book = async (data: FormValues) => {
	if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
		console.error('Stripe publishable key is not defined');
		return;
	  }
	if (!startDate || !endDate || !locationId || !totalCost) {
		return console.log("Please fill in all fields");
	}

	data.user_id = uId;
	data.vehicle_id = Number(vehicleId);
	data.location_id = locationId as number;
	data.total_amount = totalCost as number;
	console.log(data);
	
	 const res= await addBooking(data)
	 
	 if(res.data){
		 console.log(res.data)

		 const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!)
		 const stripe = await stripePromise;
		 const[{booking_id}]=res.data

		 const payment = {
			 amount:totalCost,
			 bookingId:booking_id,
			 vehicleSpecs:`${vehicleSpecs?.manufacturer} + ' ' + ${vehicleSpecs?.model}`
		 }

		 console.log(payment)
		 const response = await checkOut(payment)
		 console.log(response.data)
		 const session = response.data
		 await stripe?.redirectToCheckout({sessionId:session.id})
	 } 
	
	
	
  };

  //Todo: Implement validation for dates 

    return (
			<div className='bg-black text-white'>
				<header className='flex justify-between items-center py-4 px-8'>
					<h1 className='text-3xl font-bold'>Book Your Dream Car</h1>
					<Nav />
				</header>
				<section className='py-8 px-8'>
					<div className='flex items-center space-x-8'>
						<img
							src='path_to_large_image'
							alt='Selected Vehicle'
							className='w-96'
						/>
						<div>
							<h2 className='text-2xl font-bold'>
								Car Name: {vehicleSpecs?.manufacturer} {vehicleSpecs?.model}
							</h2>
							<p className='text-lg'>
								Specifications: {vehicleSpecs?.features}
							</p>
							<p className='text-lg'>
								Rental Rate: ${vehicle?.rental_rate} per day
							</p>
						</div>
					</div>
					<h2 className='text-2xl font-bold'>Booking Form</h2>
					<form onSubmit={handleSubmit(Book)} className='mt-8'>
						<div className='mt-4'>
							<input
								type='hidden'
								className='border border-gray-300 rounded-md px-4 py-2'
								id='user_id'
								{...register("user_id")}
							/>
							{errors.user_id && (
								<span className='text-red-500 text-xs'>
									Username is required
								</span>
							)}
							<input
								type='hidden'
								// value={(totalCost).toString()}
								id='total_amount'
								{...register('total_amount')}
							/>
								{errors.total_amount && (
									<span className='text-red-500 text-xs'>
										total_amount is required
									</span>)
							}
							<input
								type='hidden'
								id='vehicelId'
								{...register("vehicle_id")}
							/>
							<label className='block'>Pick-Up Date:</label>
							<input
								type='date'
								className='border border-gray-300 rounded-md px-4 py-2'
								id='booking_date'
								{...register("booking_date", { required: true })}
								onChange={handleBookDateChange}
							/>
							{errors.booking_date && (
								<span className='text-red-500 text-xs'>
									Username is required
								</span>
							)}
						</div>
						<div className='mt-4'>
							<label className='block'>Return Date:</label>
							<input
								type='date'
								className='border border-gray-300 rounded-md px-4 py-2'
								id='return_date'
								{...register("return_date")}
								onChange={handleReturnDateChange}
							/>
							{errors.return_date && (
								<span className='text-red-500 text-xs'>
									Username is required
								</span>
							)}
						</div>
						<div className='mt-4'>
							<label className='block'>Pick-Up Location:</label>
							<select
								className='border border-gray-300 rounded-md px-4 py-2'
								{...register("location_id")}
								onChange={handleLocationChange}
							>
								{isLoading ? (
									<option>Loading...</option>
								) : (
									locations?.map((location) => (
										<option key={location.location_id} value={location.location_id}>
											{location.name}
										</option>
									))
								)}
							</select>
						</div>
						<div className='mt-4'>
							<label className='block'>Total Cost:</label>
						<span  className='text-lg'>
								$ {calculateTotalCost()}
							</span>
							
							
						</div>
						<div className='mt-8'>
							<h2 className='text-2xl font-bold'>Confirmation Section</h2>
							<div className='mt-4'>
								<h3 className='text-xl font-bold'>Summary:</h3>
								<p className='text-lg'>
									Selected Dates: $SELECTION_PLACEHOLDER$
								</p>
								<p className='text-lg'>Location: $SELECTION_PLACEHOLDER$</p>
								<p className='text-lg'>Total Cost: ${calculateTotalCost()} </p>
							</div>
							{/* <div className="mt-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Terms and Conditions
              </label>
            </div> */}
						</div>
						<div className='mt-8'>
							<button
								type='submit'
								className='bg-red-500 text-white py-2 px-4 rounded-md'
							>
								Confirm Booking
							</button>
							<button className='bg-blue-500 text-white py-2 px-4 rounded-md ml-4'>
								Cancel
							</button>
						</div>
					</form>
				</section>

				<div className='flex items-center justify-center mt-8'>
					<img
						src='chat_support_icon'
						alt='Chat Support'
						className='w-8 h-8 mr-2'
					/>
					<a href='/faq' className='text-blue-500'>
						FAQ
					</a>
				</div>
			</div>
		);
  }



export default Bookings