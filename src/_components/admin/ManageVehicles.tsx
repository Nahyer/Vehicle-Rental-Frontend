import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { useForm } from "react-hook-form";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MoveVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast";
import { useAddvehicleSpecsMutation } from "../api/vehicleSpecsApi";
import { ButtonLoading } from "@/features/login/LoginForm";
import { useGetVehiclesQuery } from "@/features/vehicles/vehicleApi";

const MAX_FILE_SIZE = 3145728; // 3MB

const validFileExtensions: { [key: string]: string[] } = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

function isValidFileType(fileName: string | undefined, fileType: string): boolean {
	return fileName !== undefined && validFileExtensions[fileType].indexOf(fileName.split('.').pop() ?? '') > -1;
}


const schema = yup.object().shape({
	manufacturer: yup.string().required("Manufacturer is required"),
	model: yup.string().required("Model is required"),
	year: yup.number().required("Year is required").min(1886, "Invalid year"),
	fuel_type: yup.string().required("Fuel type is required"),
	engine_capacity: yup.number().required("Engine capacity is required"),
	transmission: yup.string().required("Transmission is required"),
	seating_capacity: yup
		.number()
		.required("Seating capacity is required")
		.min(1, "At least one seat is required"),
	color: yup.string().required("Color is required"),
	features: yup.string().required("Features are required"),
  rental_rate: yup.number().required("Rental rate is required"),
  image_url: yup
  .mixed<File>()
  .required("Required")
  .test("is-valid-size", "Max allowed size is 100KB",
	value => value && value.size <= MAX_FILE_SIZE)
	.test("is-valid-type", "Not a valid image type",
        value => isValidFileType(value && value.name.toLowerCase(), "image"))
})

const fuelTypes = [
  { label: "Petrol", value: "petrol" },
  { label: "Diesel", value: "diesel" },
  { label: "Electric", value: "electric" },
  { label: "Hybrid", value: "hybrid" },
  { label: "CNG", value: "cng" },
  { label: "LPG", value: "lpg" },
];

const transmissions = [
  { label: "Manual", value: "manual" },
  { label: "Automatic", value: "automatic" },
  { label: "Semi-Automatic", value: "semi-automatic" },
  { label: "CVT (Continuously Variable Transmission)", value: "cvt" },
  { label: "Dual-Clutch", value: "dual-clutch" },
];

const colors = [
  { label: "Red", value: "red" },
  { label: "Blue", value: "blue" },
  { label: "Black", value: "black" },
  { label: "White", value: "white" },
  { label: "Silver", value: "silver" },
  { label: "Grey", value: "grey" },
  { label: "Green", value: "green" },
  { label: "Yellow", value: "yellow" },
  { label: "Orange", value: "orange" },
  { label: "Purple", value: "purple" },
  { label: "Brown", value: "brown" },
  { label: "Gold", value: "gold" },
];

const ManageVehicles = () => {
  const { data:vehicles, isLoading:loadingVehicles, refetch} = useGetVehiclesQuery();
  const {toast} = useToast();
    
	const [addVehicleSpecs,{ error:err,isLoading}] = useAddvehicleSpecsMutation();
	const form = useForm<yup.InferType<typeof schema>>({
		resolver: yupResolver(schema),
    defaultValues: {
        manufacturer: "",
        model: "",
        year: 0,
        fuel_type: "",
        engine_capacity: 0,
        transmission: "",
        seating_capacity: 0,
        color: "",
        features: "",
        rental_rate: 0,
		image_url: undefined,
    },
	});
  
 

	const createVehicle = async (data: yup.InferType<typeof schema> )=> {
    try {
    
      const imgUrl = await uploadFile(data.image_url);
	  console.log("🚀 ~ createVehicle ~ imgUrl:", imgUrl)

	if (imgUrl) {
		data.image_url = imgUrl;	
		const res = await addVehicleSpecs(data);
		toast({
			description: `${res.data}`,
		});
		form.reset();
		refetch();
	} else {
		console.log('Something went wrong');
	}


     if(err){
        console.log(err);
        console.log('Something wrong happened');
      
     }
    } catch (error) {
      console.error(error);
    }
	};

	const uploadFile = async (imag:File) => {
		const data = new FormData();
		data.append("file", imag);
		// data.append("timestamp", timestamp.toString());
		// data.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY)!;
		// data.append("signature", signature);
		// data.append("folder", "images");
   		data.append("upload_preset", 'iizj41xh' );
	

		try {
			let cloudName = 'dejyhjbwg';
			let resourceType = "image";
			let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

			const res = await axios.post(api, data); //RTK
			const { secure_url } = res.data;
			console.log(secure_url);
			return secure_url;
		} catch (error) {
			console.error(error);
		}
	};
	

  


	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Manage Vehicles</CardTitle>
					<CardDescription>
						View and update the vehicle inventory
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Vehicle Id</TableHead>
								<TableHead>Model</TableHead>
								<TableHead>Rate</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{loadingVehicles ? (
								<TableRow>
									<TableCell colSpan={5}>Loading...</TableCell>
								</TableRow>
							) : (
								vehicles?.map((vehicle, index) => (
									<TableRow key={index}>
										<TableCell>{vehicle.vehicle_id}</TableCell>
										<TableCell>
											{vehicle.vehicleSpecs.manufacturer}{" "}
											{vehicle.vehicleSpecs.model}
										</TableCell>
										<TableCell>{vehicle.rental_rate}</TableCell>

										<TableCell>
											{vehicle.availability == true ? (
												<Badge className='bg-green-200 text-green-600'>
													• Available
												</Badge>
											) : (
												<Badge className='bg-red-200 text-red-600'>
													• Not Available
												</Badge>
											)}
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button size='icon' variant='ghost'>
														<MoveVerticalIcon className='w-4 h-4' />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align='end'>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Retire</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
				
			</Card>

			<Card className=' text-zinc-900 p-6 rounded-lg w-full'>
				<h2 className='text-2xl mb-4'>Vehicle Specifications</h2>
				<p className='mb-6'>
					Please fill out the details below to add a new vehicle specification.
				</p>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(createVehicle)}>
						<div className='grid grid-cols-3 gap-4'>
							<FormField
								control={form.control}
								name='manufacturer'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Manufacturer</FormLabel>
										<FormControl>
											<Input placeholder='manufacturer' {...field} />
										</FormControl>
										<FormDescription>
											Enter the manufacturer of the vehicle
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='fuel_type'
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='fuel_type'>Fuel Type</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select fuel type' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{fuelTypes.map((fuelType) => (
													<SelectItem
														key={fuelType.label}
														value={fuelType.value}
													>
														{fuelType.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											Select the fuel type of the vehicle
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='transmission'
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='transmission'>Transmission</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select transmission' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{transmissions.map((transmission) => (
													<SelectItem
														key={transmission.label}
														value={transmission.value}
													>
														{transmission.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											Select the transmission type of the vehicle
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='color'
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='color'>Color</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select color' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{colors.map((color) => (
													<SelectItem key={color.label} value={color.value}>
														{color.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											Select the color of the vehicle
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='seating_capacity'
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='seating_capacity'>
											Seating Capacity
										</FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='Seating capacity'
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Enter the seating capacity of the vehicle
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='features'
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='features'>Features</FormLabel>
										<FormControl>
											<Input placeholder='Features' {...field} />
										</FormControl>
										<FormDescription>
											Enter the features of the vehicle
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='model'
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='model'>Model</FormLabel>
										<Input placeholder='Model' {...field} />
										<FormDescription>
											Select the mode of the vehicle
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='year'
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='year'>Year</FormLabel>
										<Input type='number' placeholder='Year' {...field} />
										<FormDescription>
											Enter the year of the vehicle
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='rental_rate'
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='rental_rate'>Rental Rate</FormLabel>
										<Input type='number' placeholder='Rental rate' {...field} />
										<FormDescription>
											Enter the rental rate of the vehicle
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='image_url'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='image_url'
											className='block text-sm font-medium text-gray-700'
										>
											Upload Image
										</FormLabel>
										<Input
											type='file'
											accept='image/*'
											onChange={(e) => {
												if (e.target.files && e.target.files[0]) {
													field.onChange(e.target.files[0]);
												}
											}}
											className='mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										/>
										<FormDescription>
											Enter the rental rate of the vehicle
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='col-span-3'>
								{isLoading ? (
									<ButtonLoading name='Please wait'  />
								) : (
									<Button
										type='submit'
										className='w-full'
									>
										Submit
									</Button>
								)}
							</div>
						</div>
					</form>
				</Form>
			</Card>
		</>
	);
};

export default ManageVehicles;

