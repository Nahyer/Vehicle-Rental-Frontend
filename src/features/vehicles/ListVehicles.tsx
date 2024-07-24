import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useGetVehiclesQuery } from "./vehicleApi";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { SelectSeparator } from "@/components/ui/select";
import "ldrs/tailspin";

const ListVehicles = () => {
	const { data: dBvehicles, isLoading } = useGetVehiclesQuery(
	);

	const [search, setSearch] = useState("");
	const [filters] = useState({
		type: [],
		passengers: [],
		fuelEfficiency: [],
	});
	const [sort, setSort] = useState("availability");

	const vehicles = useMemo(() => {
		return dBvehicles
			?.filter((vehicle) => {
				const searchValue = search.toLowerCase();
				return (
					vehicle.vehicleSpecs.manufacturer
						.toLowerCase()
						.includes(searchValue) ||
					vehicle.vehicleSpecs.model.toLowerCase().includes(searchValue) ||
					vehicle.vehicleSpecs.year.toString().includes(searchValue) ||
					vehicle.rental_rate.toString().includes(searchValue)
				);
			})
			.filter((vehicle) => {
				if (
					filters.passengers.length > 0 &&
					!filters.passengers.includes(
						vehicle.vehicleSpecs.seating_capacity as never
					)
				) {
					return false;
				}
				if (
					filters.fuelEfficiency.length > 0 &&
					!filters.fuelEfficiency.includes(
						vehicle.vehicleSpecs.fuel_type as never
					)
				) {
					return false;
				}
				return true;
			})
			.sort((a: any, b: any) => {
				switch (sort) {
					case "availability":
						return a.id - b.id;
					case "price":
						return a.pricePerDay - b.pricePerDay;
					case "latest":
						return b.id - a.id;
					default:
						return 0;
				}
			});
	}, [dBvehicles, search, filters, sort]);

	console.log("🚀 ~ ListVehicles ~ dBvehicles:", dBvehicles);

	


	return (
		<div className='container mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-16'>
			<section className='bg-muted py-12 md:py-20 lg:py-24'>
				<div className='container px-4 md:px-6'>
					<div className='grid gap-4 text-center'>
						<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>
							Find Your Perfect Ride
						</h1>
						<p className='max-w-[700px] mx-auto text-muted-foreground md:text-xl'>
							Explore our wide selection of vehicles and book your rental with
							ease.
						</p>
					</div>
				</div>
			</section>
			<div className='mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center'>
				<div className='relative flex-1'>
					<div className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
					<Input
						type='search'
						placeholder='Search vehicles...'
						className='pl-8 sm:w-[300px] md:w-[400px] lg:w-[500px]'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='flex items-center gap-2'>
							<div className='h-4 w-4' />
							Sort by:{" "}
							{sort === "availability"
								? "Availability"
								: sort === "price"
								? "Price"
								: "Latest"}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
							<DropdownMenuRadioItem value='availability'>
								Availability
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value='price'>Price</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value='latest'>
								Latest
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
				{isLoading && (
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
				)}
				{vehicles?.map((vehicle) => (
					<Card key={vehicle.vehicle_id}>
						<Link
							to={`booking/${vehicle.vehicle_id}`}
							className='group relative block h-full'
						>
							<img
								src={vehicle.vehicleSpecs.image_url}
								alt={`${vehicle.vehicleSpecs.manufacturer} ${vehicle.vehicleSpecs.model}`}
								width={300}
								height={200}
								className='h-48 w-full rounded-t-lg object-cover transition-opacity group-hover:opacity-80'
							/>
							<div className='p-4'>
								<div className='flex items-center justify-between'>
									<div className='text-lg font-medium'>
										{vehicle.vehicleSpecs.manufacturer}{" "}
										{vehicle.vehicleSpecs.model}
										<SelectSeparator />
										{vehicle.availability && (
											<Badge className='bg-green-200 text-green-600'>
												• Available
											</Badge>
										)}
									</div>
									<div className='text-green-600'>
										<span className=' text-2xl font-bold'>
											${vehicle.rental_rate}
										</span>
										/day
									</div>
								</div>
								<div className='mt-2 text-sm text-muted-foreground'>
									{vehicle.vehicleSpecs.year} •{" "}
									{vehicle.vehicleSpecs.seating_capacity} passengers •{" "}
									{vehicle.vehicleSpecs.engine_capacity} mpg
								</div>
								<p className='mt-4 text-sm leading-relaxed'>
									{vehicle.vehicleSpecs.features}
								</p>
							</div>
						</Link>
					</Card>
				))}
			</div>
			<div className='mt-8'>
			
			</div>
		</div>
	);
};

export default ListVehicles;
