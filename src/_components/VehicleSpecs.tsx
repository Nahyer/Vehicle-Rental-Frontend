import { Link, useParams } from "react-router-dom"
import { vehicleApi } from "../features/vehicles/vehicleApi"
// import { TVehicle, useGetVehicleByIdQuery } from "../features/vehicles/vehicleApi"


const VehicleSpecs = () => {
    const { vehicleId } = useParams()
    const {data:vehicle, error, isLoading} =vehicleApi.useGetVehicleByIdQuery(Number(vehicleId))
    //  const navigation = useNavigate()
    if(!vehicle) return null
    const vehicleSpecs = vehicle.vehicleSpecs
    
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error</div>
    // const handleBooking = () => {
    //     console.log('Booked')
    //     navigation(`/vehicles/booking/${vehicleId}`)
    // }
return (
    <div>
        <h2 className="text-2xl font-bold mb-4">Car Specs</h2>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="mb-2">Manufacturer: {vehicleSpecs.manufacturer}</p>
                <p className="mb-2">Model: {vehicleSpecs.model}</p>
                <p className="mb-2">Year: {vehicleSpecs.year}</p>
                <p className="mb-2">Fuel Type: {vehicleSpecs.fuel_type}</p>
                <p className="mb-2">Engine Capacity: {vehicleSpecs.engine_capacity}</p>
            </div>
            <div>
                <p className="mb-2">Transmission: {vehicleSpecs.transmission}</p>
                <p className="mb-2">Seating Capacity: {vehicleSpecs.seating_capacity}</p>
                <p className="mb-2">Color: {vehicleSpecs.color}</p>
                <p className="mb-2">Features: {vehicleSpecs.features}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" >
                    <Link to={`/vehicles/booking/${vehicleId}`}>Book Now</Link></button>
            </div>
        </div>
    </div>
);
}

export default VehicleSpecs