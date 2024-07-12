import { useDispatch, useSelector } from "react-redux";
import {TVehicle, useGetVehiclesQuery} from "./vehicleApi";
import { RootState } from "../../app/store";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
const ListVehicles = () => {
	// const {vehicles}= useSelector((v:RootState)=>v.vehicleApi)
	const {
		data: vehicles,
		error,
		isLoading,
		isFetching,
	} = useGetVehiclesQuery();

	const [filteredVehicles, setFilteredVehicles] = useState<TVehicle[]>([]);
	const navigate = useNavigate();

	if (isLoading) return <div>Loading...</div>;
	console.log(vehicles);
	//!handle this no data found error
	if (error) {
		console.log(error);
		return <div>errrrorrrr</div>;
	}

	if (isFetching) return <div>Updating...</div>;

	if (!vehicles) return null;
	if (isLoading) return <div>Loading...</div>;

	const handleCLick = (id: number) => {
		console.log("clicked");
		navigate(`/models/${id}`);
	};

	const handleFilterChange = (filters:any) => {
		let filtered= vehicles;
		if(filters.vehicleType){
			filtered=filtered.filter((v:any)=>v.vehicleSpecs.vehicleType===filters.vehicleType)
		}
		if(filters.manufacturer){
			filtered=filtered.filter((v:any)=>v.vehicleSpecs.manufacturer===filters.manufacturer)
		}
		if(filters.model){
			filtered=filtered.filter((v:any)=>v.vehicleSpecs.model===filters.model)
		}
		if(filters.year){
			filtered=filtered.filter((v:any)=>v.vehicleSpecs.year===filters.year)
		}
		if(filters.transmission){
			filtered=filtered.filter((v:any)=>v.vehicleSpecs.transmission===filters.transmission)
		}

		setFilteredVehicles(filtered);
		console.log();
	}

	return (
		<>
			<div className='text-xl font-bold mb-4'>ListVehicles</div>
			<div className='bg-white shadow-md rounded-lg p-4'>
				{vehicles &&
					vehicles.map((vehicle) => (
						<div
							key={vehicle.vehicle_id}
							className='mb-4'
							onClick={() => handleCLick(vehicle.vehicle_id)}
						>
							<h3 className='text-lg font-bold'>
								{vehicle.vehicleSpecs.manufacturer} {vehicle.vehicleSpecs.model}
							</h3>
							<p className='mb-2'>Rate: {vehicle.rental_rate}</p>
							{vehicle.availability && (
								<div className='bg-green-500 text-white px-2 py-1 rounded'>
									Available
								</div>
							)}
						</div>
					))}
			</div>
		</>
	);
};

export default ListVehicles;
