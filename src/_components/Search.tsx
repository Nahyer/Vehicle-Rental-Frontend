import ListVehicles from "../features/vehicles/ListVehicles";
const Search = () => {
	return (
			<ListVehicles />
	);
};

export default Search;

// import React, { useState } from 'react';
// import Fuse from 'fuse.js';
// import { Badge } from 'your-badge-component'; // Replace with your actual Badge component

// const VehicleList = ({ vehicles }) => {
//   const [selectedTransmission, setSelectedTransmission] = useState('');
//   const [selectedFuelType, setSelectedFuelType] = useState('');
//   const [selectedSeatingCapacity, setSelectedSeatingCapacity] = useState('');
//   const [priceRange, setPriceRange] = useState([0, 500]); // Assuming the price range is between 0 and 500

//   const fuse = new Fuse(vehicles, {
//     keys: ['vehicleSpecs.transmission', 'vehicleSpecs.fuel_type', 'vehicleSpecs.seating_capacity', 'rental_rate'],
//     threshold: 0.4,
//   });

//   const filteredVehicles = fuse.search({
//     $and: [
//       { 'vehicleSpecs.transmission': selectedTransmission || undefined },
//       { 'vehicleSpecs.fuel_type': selectedFuelType || undefined },
//       { 'vehicleSpecs.seating_capacity': selectedSeatingCapacity || undefined },
//       { rental_rate: { $lte: priceRange[1], $gte: priceRange[0] } },
//     ],
//   }).map(result => result.item);

//   return (
//     <div>
//       <div className="filters">
//         <select onChange={(e) => setSelectedTransmission(e.target.value)} value={selectedTransmission}>
//           <option value="">All Transmissions</option>
//           <option value="Automatic">Automatic</option>
//           <option value="Manual">Manual</option>
//         </select>
//         <select onChange={(e) => setSelectedFuelType(e.target.value)} value={selectedFuelType}>
//           <option value="">All Fuel Types</option>
//           <option value="Petrol">Petrol</option>
//           <option value="Diesel">Diesel</option>
//           <option value="Electric">Electric</option>
//         </select>
//         <select onChange={(e) => setSelectedSeatingCapacity(e.target.value)} value={selectedSeatingCapacity}>
//           <option value="">All Seating Capacities</option>
//           <option value="2">2 Seater</option>
//           <option value="4">4 Seater</option>
//           <option value="5">5 Seater</option>
//           <option value="7">7 Seater</option>
//         </select>
//         <input 
//           type="range" 
//           min="0" 
//           max="500" 
//           value={priceRange} 
//           onChange={(e) => setPriceRange([0, e.target.value])} 
//         />
//       </div>
//       <div className='vehicle-list'>
//         {filteredVehicles.map(vehicle => (
//           <div key={vehicle.id} className='flex justify-between items-center'>
//             <div>
//               <p className="text-green-600">
//                 <span className='text-2xl font-bold'>${vehicle.rental_rate}</span>/day
//               </p>
//               <h2 className='text-lg font-semibold text-card-foreground'>{vehicle.name}</h2>
//               {vehicle.availability && <Badge className="bg-green-200 text-green-600">• Available</Badge>}
//             </div>
//             <div className='flex-col text-sm'>
//               <p>transmission: {vehicle.vehicleSpecs.transmission}</p>
//               <p>fueltype: {vehicle.vehicleSpecs.fuel_type}</p>
//               <p>Seats: {vehicle.vehicleSpecs.seating_capacity} Seater</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


