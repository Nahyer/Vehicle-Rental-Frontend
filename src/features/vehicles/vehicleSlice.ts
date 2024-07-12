// import { createSlice } from "@reduxjs/toolkit";
// import { Vehicle } from "./ListVehicles";

// const initialState: Vehicle[] = []

// const vehicleSlice = createSlice({
//     name: 'vehicles',
//     initialState,
//     reducers: {
//         addVehicle: (state, action) => {
//             state.push(action.payload)
//         },
//         removeVehicle: (state, action) => {
//             return state.filter(vehicle => vehicle.vehicle_id !== action.payload.vehicle_id)
//         },
//         updateVehicle: (state, action) => {
//             const index = state.findIndex(vehicle => vehicle.vehicle_id === action.payload.vehicle_id)
//             if(index !== -1){
//                 state[index] = action.payload
//             }
//         }
//     }
// })
