import {
  Card
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom";
import { useGetVehiclesQuery } from "./vehicleApi";

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox";
import { SelectSeparator } from "@/components/ui/select";


const ListVehicles = () => {
	const {
		data: dBvehicles,
	
		isLoading,
	
	} = useGetVehiclesQuery();


		
		const [search, setSearch] = useState("");
		const [filters] = useState({
			type: [],
			passengers: [],
			fuelEfficiency: [],
		});
		const [sort, setSort] = useState("availability");

		const vehicles = useMemo(() => {
			return dBvehicles?.filter((vehicle) => {
				const searchValue = search.toLowerCase();
				return (
					vehicle.vehicleSpecs.manufacturer.toLowerCase().includes(searchValue) ||
					vehicle.vehicleSpecs.model.toLowerCase().includes(searchValue) ||
					vehicle.vehicleSpecs.year.toString().includes(searchValue) ||
					vehicle.rental_rate.toString().includes(searchValue)
				);
			}).filter((vehicle) => {
				if (filters.passengers.length > 0 &&
					!filters.passengers.includes(vehicle.vehicleSpecs.seating_capacity as never)) {
					return false;
				}
				if (filters.fuelEfficiency.length > 0 &&
					!filters.fuelEfficiency.includes(vehicle.vehicleSpecs.fuel_type as never)) {
					return false;
				}
				return true;
			}).sort((a: any, b: any) => {
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
		}, [search, filters, sort]);


		if (isLoading) return <div>Loading...</div>;
		console.log("🚀 ~ ListVehicles ~ dBvehicles:", dBvehicles)

	// if (!vehicles) return <div>No vehicles are available</div>;
	
	// console.log(vehicles);
	// //!handle this no data found error

	// if (isFetching) return <div>Updating...</div>;

	// if (isLoading) return <div>Loading...</div>;

	// const handleFilterChange = (filters: any) => {
	// 	let filtered = vehicles;
	// 	if (filters.vehicleType) {
	// 		filtered = filtered.filter(
	// 			(v: any) => v.vehicleSpecs.vehicleType === filters.vehicleType
	// 		);
	// 	}
	// 	if (filters.manufacturer) {
	// 		filtered = filtered.filter(
	// 			(v: any) => v.vehicleSpecs.manufacturer === filters.manufacturer
	// 		);
	// 	}
	// 	if (filters.model) {
	// 		filtered = filtered.filter(
	// 			(v: any) => v.vehicleSpecs.model === filters.model
	// 		);
	// 	}
	// 	if (filters.year) {
	// 		filtered = filtered.filter(
	// 			(v: any) => v.vehicleSpecs.year === filters.year
	// 		);
	// 	}
	// 	if (filters.transmission) {
	// 		filtered = filtered.filter(
	// 			(v: any) => v.vehicleSpecs.transmission === filters.transmission
	// 		);
	// 	}

	// 	setFilteredVehicles(filtered);
	// 	console.log();
	// };

	// const handleSortChange = (sort: string) => {
	// 	let sorted = filteredVehicles;
	// 	if (sort === "price") {
	// 		sorted = sorted.sort((a: any, b: any) => a.rental_rate - b.rental_rate);
	// 	}
	// 	if (sort === "availability") {
	// 		sorted = sorted.sort((a: any, b: any) => a.availability - b.availability);
	// 	}
	// 	setFilteredVehicles(sorted);
	// };

	return (
		<div className='container mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-16'>
			   <section className="bg-muted py-12 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Find Your Perfect Ride
            </h1>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
              Explore our wide selection of vehicles and book your rental with ease.
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
				{vehicles?.map((vehicle) => (
					<Card key={vehicle.vehicle_id}>
						<Link to={`booking/${vehicle.vehicleSpec_id}`}  className='group relative block h-full'>
							<img
								src='/placeholder.svg'
								alt={`${vehicle.vehicleSpecs.manufacturer} ${vehicle.vehicleSpecs.model}`}
								width={300}
								height={200}
								className='h-48 w-full rounded-t-lg object-cover transition-opacity group-hover:opacity-80' />
							<div className='p-4'>
								<div className='flex items-center justify-between'>
									<div className='text-lg font-medium'>
										{vehicle.vehicleSpecs.manufacturer} {vehicle.vehicleSpecs.model}
										<SelectSeparator/>
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
									{vehicle.vehicleSpecs.year} • {vehicle.vehicleSpecs.seating_capacity} passengers •{" "}
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
				<Accordion type='single' collapsible>
					<AccordionItem value='filters'>
						<AccordionTrigger className='text-base font-medium'>
							Filters
						</AccordionTrigger>
						<AccordionContent>
							<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
								<div className='grid gap-2'>
									<Label htmlFor='type' className='text-sm font-medium'>
										Vehicle Type
									</Label>
									<div>
										<div className='flex flex-col gap-2'>
											<Label
												htmlFor='type-sedan'
												className='flex items-center gap-2 font-normal'
											>
												<Checkbox id='type-sedan' value='sedan' />
												Sedan
											</Label>
											<Label
												htmlFor='type-suv'
												className='flex items-center gap-2 font-normal'
											>
												<Checkbox id='type-suv' value='suv' />
												SUV
											</Label>
											<Label
												htmlFor='type-truck'
												className='flex items-center gap-2 font-normal'
											>
												<Checkbox id='type-truck' value='truck' />
												Truck
											</Label>
										</div>
									</div>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='passengers' className='text-sm font-medium'>
										Passengers
									</Label>
									<div>
										<div className='flex flex-col gap-2'>
											<Label
												htmlFor='passengers-4'
												className='flex items-center gap-2 font-normal'
											>
												<Checkbox id='passengers-4' value={4} />4 passengers
											</Label>
											<Label
												htmlFor='passengers-5'
												className='flex items-center gap-2 font-normal'
											>
												<Checkbox id='passengers-5' value={5} />5 passengers
											</Label>
											<Label
												htmlFor='passengers-8'
												className='flex items-center gap-2 font-normal'
											>
												<Checkbox id='passengers-8' value={8} />8 passengers
											</Label>
										</div>
									</div>
								</div>
								<div className='grid gap-2'>
									<Label
										htmlFor='fuel-efficiency'
										className='text-sm font-medium'
									>
										Fuel Efficiency
									</Label>
									<div>
										<div className='flex flex-col gap-2'>
											<Label
												htmlFor='fuel-efficiency-20'
												className='flex items-center gap-2 font-normal'
											>
												<Checkbox id='fuel-efficiency-20' value={20} />
												20 mpg
											</Label>
											<Label
												htmlFor='fuel-efficiency-25'
												className='flex items-center gap-2 font-normal'
											>
												<Checkbox id='fuel-efficiency-25' value={25} />
												25 mpg
											</Label>
											<Label
												htmlFor='fuel-efficiency-30'
												className='flex items-center gap-2 font-normal'
											>
												<Checkbox id='fuel-efficiency-30' value={30} />
												30 mpg
											</Label>
										</div>
									</div>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
};

export default ListVehicles;

//  function Component() {
//   const [search, setSearch] = useState("")
//   const [filters, setFilters] = useState({
//     type: [],
//     passengers: [],
//     fuelEfficiency: [],
//   })
//   const [sort, setSort] = useState("availability")
//   const vehicles = useMemo(() => {
//     return [
//       {
//         id: 1,
//         image: "/placeholder.svg?height=200&width=300",
//         make: "Toyota",
//         model: "Camry",
//         year: 2022,
//         pricePerDay: 50,
//         description: "Comfortable midsize sedan with great fuel efficiency.",
//         type: "sedan",
//         passengers: 5,
//         fuelEfficiency: 30,
//       },
//       {
//         id: 2,
//         image: "/placeholder.svg?height=200&width=300",
//         make: "Honda",
//         model: "Pilot",
//         year: 2021,
//         pricePerDay: 75,
//         description: "Spacious SUV with seating for up to 8 passengers.",
//         type: "suv",
//         passengers: 8,
//         fuelEfficiency: 22,
//       },
//       {
//         id: 3,
//         image: "/placeholder.svg?height=200&width=300",
//         make: "Ford",
//         model: "F-150",
//         year: 2023,
//         pricePerDay: 80,
//         description: "Powerful full-size pickup truck with towing capacity.",
//         type: "truck",
//         passengers: 5,
//         fuelEfficiency: 18,
//       },
//       {
//         id: 4,
//         image: "/placeholder.svg?height=200&width=300",
//         make: "Hyundai",
//         model: "Sonata",
//         year: 2022,
//         pricePerDay: 45,
//         description: "Stylish midsize sedan with a comfortable interior.",
//         type: "sedan",
//         passengers: 5,
//         fuelEfficiency: 28,
//       },
//       {
//         id: 5,
//         image: "/placeholder.svg?height=200&width=300",
//         make: "Jeep",
//         model: "Wrangler",
//         year: 2021,
//         pricePerDay: 70,
//         description: "Rugged and versatile SUV for off-road adventures.",
//         type: "suv",
//         passengers: 4,
//         fuelEfficiency: 20,
//       },
//       {
//         id: 6,
//         image: "/placeholder.svg?height=200&width=300",
//         make: "Nissan",
//         model: "Altima",
//         year: 2023,
//         pricePerDay: 55,
//         description: "Reliable midsize sedan with a comfortable ride.",
//         type: "sedan",
//         passengers: 5,
//         fuelEfficiency: 27,
//       },
//     ]
//       .filter((vehicle) => {
//         const searchValue = search.toLowerCase()
//         return (
//           vehicle.make.toLowerCase().includes(searchValue) ||
//           vehicle.model.toLowerCase().includes(searchValue) ||
//           vehicle.year.toString().includes(searchValue) ||
//           vehicle.pricePerDay.toString().includes(searchValue)
//         )
//       })
//       .filter((vehicle) => {
//         if (filters.type.length > 0 && !filters.type.includes(vehicle.type)) {
//           return false
//         }
//         if (filters.passengers.length > 0 && !filters.passengers.includes(vehicle.passengers)) {
//           return false
//         }
//         if (filters.fuelEfficiency.length > 0 && !filters.fuelEfficiency.includes(vehicle.fuelEfficiency)) {
//           return false
//         }
//         return true
//       })
//       .sort((a, b) => {
//         switch (sort) {
//           case "availability":
//             return a.id - b.id
//           case "price":
//             return a.pricePerDay - b.pricePerDay
//           case "latest":
//             return b.id - a.id
//           default:
//             return 0
//         }
//       })
//   }, [search, filters, sort])
//   return (
//     <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
//       <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
//         <div className="relative flex-1">
//           <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Search vehicles..."
//             className="pl-8 sm:w-[300px] md:w-[400px] lg:w-[500px]"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="flex items-center gap-2">
//               <div className="h-4 w-4" />
//               Sort by: {sort === "availability" ? "Availability" : sort === "price" ? "Price" : "Latest"}
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
//               <DropdownMenuRadioItem value="availability">Availability</DropdownMenuRadioItem>
//               <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
//               <DropdownMenuRadioItem value="latest">Latest</DropdownMenuRadioItem>
//             </DropdownMenuRadioGroup>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {vehicles && vehicles.map((vehicle) => (
//           <Card key={vehicle.id}>
//             <Link to="#" className="group relative block h-full" >
//               <img
//                 src="/placeholder.svg"
//                 alt={`${vehicle.make} ${vehicle.model}`}
//                 width={300}
//                 height={200}
//                 className="h-48 w-full rounded-t-lg object-cover transition-opacity group-hover:opacity-80"
//               />
//               <div className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div className="text-lg font-medium">
//                     {vehicle.make} {vehicle.model}
// 					{vehicle.availability &&<Badge className="bg-green-200 text-green-600">• Available</Badge>}
//                   </div>
//                   <div  className="text-green-600"><span className=' text-2xl font-bold'>${vehicle.pricePerDay}</span>/day</div>
//                 </div>
//                 <div className="mt-2 text-sm text-muted-foreground">
//                   {vehicle.year} • {vehicle.passengers} passengers • {vehicle.fuelEfficiency} mpg
//                 </div>
//                 <p className="mt-4 text-sm leading-relaxed">{vehicle.description}</p>
//               </div>
//             </Link>
//           </Card>
//         ))}
//       </div>
//       <div className="mt-8">
//         <Accordion type="single" collapsible>
//           <AccordionItem value="filters">
//             <AccordionTrigger className="text-base font-medium">Filters</AccordionTrigger>
//             <AccordionContent>
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="type" className="text-sm font-medium">
//                     Vehicle Type
//                   </Label>
//                   <div>
//                     <div className="flex flex-col gap-2">
//                       <Label htmlFor="type-sedan" className="flex items-center gap-2 font-normal">
//                         <Checkbox id="type-sedan" value="sedan" />
//                         Sedan
//                       </Label>
//                       <Label htmlFor="type-suv" className="flex items-center gap-2 font-normal">
//                         <Checkbox id="type-suv" value="suv" />
//                         SUV
//                       </Label>
//                       <Label htmlFor="type-truck" className="flex items-center gap-2 font-normal">
//                         <Checkbox id="type-truck" value="truck" />
//                         Truck
//                       </Label>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="passengers" className="text-sm font-medium">
//                     Passengers
//                   </Label>
//                   <div>
//                     <div className="flex flex-col gap-2">
//                       <Label htmlFor="passengers-4" className="flex items-center gap-2 font-normal">
//                         <Checkbox id="passengers-4" value={4} />
//                         4 passengers
//                       </Label>
//                       <Label htmlFor="passengers-5" className="flex items-center gap-2 font-normal">
//                         <Checkbox id="passengers-5" value={5} />
//                         5 passengers
//                       </Label>
//                       <Label htmlFor="passengers-8" className="flex items-center gap-2 font-normal">
//                         <Checkbox id="passengers-8" value={8} />
//                         8 passengers
//                       </Label>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="fuel-efficiency" className="text-sm font-medium">
//                     Fuel Efficiency
//                   </Label>
//                   <div>
//                     <div className="flex flex-col gap-2">
//                       <Label htmlFor="fuel-efficiency-20" className="flex items-center gap-2 font-normal">
//                         <Checkbox id="fuel-efficiency-20" value={20} />
//                         20 mpg
//                       </Label>
//                       <Label htmlFor="fuel-efficiency-25" className="flex items-center gap-2 font-normal">
//                         <Checkbox id="fuel-efficiency-25" value={25} />
//                         25 mpg
//                       </Label>
//                       <Label htmlFor="fuel-efficiency-30" className="flex items-center gap-2 font-normal">
//                         <Checkbox id="fuel-efficiency-30" value={30} />
//                         30 mpg
//                       </Label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </AccordionContent>
//           </AccordionItem>
//         </Accordion>
//       </div>
//     </div>
//   )
// }
	
				{/* {vehicles &&
					vehicles.map((vehicle) => (
						<Card className='w-[300px] p-0' key={vehicle.vehicle_id}
						onClick={() => handleCLick(vehicle.vehicle_id)}>
						<img
							src='https://placehold.co/300x200'
							alt={vehicle.vehicleSpecs.model}
							className="h-48 w-full rounded-t-lg object-cover transition-opacity group-hover:opacity-80"
						/>
						<CardContent>
							<div className='flex justify-between items-center'>
								<div>
								<p className="text-green-600"><span className=' text-2xl font-bold'>${vehicle.rental_rate}</span>/day</p>
									<h2 className='text-lg font-semibold text-card-foreground'>Chicken</h2>
									{vehicle.availability &&<Badge className="bg-green-200 text-green-600">• Available</Badge>}
								</div>
								<div className='flex-col text-sm' >
									<p>transmission: {vehicle.vehicleSpecs.transmission}</p>
									<p>fueltype: {vehicle.vehicleSpecs.fuel_type}</p>
									<p>Seats: {vehicle.vehicleSpecs.seating_capacity} Seater</p>
								</div>
							</div>
						</CardContent>
					</Card>
					))}
					 <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search vehicles..."
            className="pl-8 sm:w-[300px] md:w-[400px] lg:w-[500px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <div className="h-4 w-4" />
              Sort by: {sort === "availability" ? "Availability" : sort === "price" ? "Price" : "Latest"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
              <DropdownMenuRadioItem value="availability">Availability</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="latest">Latest</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}

