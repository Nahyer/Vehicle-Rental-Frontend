import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface TVehicle {
	vehicle_id: number;
	vehicleSpec_id: number;
	rental_rate: number;
	availability: boolean;
	vehicleSpecs: {
		manufacturer: string;
		model: string;
		year: number;
        fuel_type: string;
        engine_capacity: number;
        transmission: string;
        seating_capacity: number;
        color: string;
        features: string;
	}; // imageUrl: string;
}
export const vehicleApi = createApi({
    reducerPath: 'vehicleApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/vehicles' }),
    tagTypes: ['getVehicles', 'getVehicleById', 'deleteVehicle'],
    endpoints: (builder) => ({
        getVehicles: builder.query<TVehicle[], void>({ 
            query: () => '',
            providesTags: ['getVehicles'],
         }),
        getVehicleById: builder.query<TVehicle, number>({
        query: (id) => `${id}`
        }),
        addVehicle: builder.mutation<TVehicle, Partial<TVehicle>>({
        query: (vehicle) => ({
            url: '',
            method: 'POST',
             vehicle,
        }),
        invalidatesTags: ['getVehicles'],
        }),
        updateVehicle: builder.mutation<TVehicle, Partial<TVehicle>>({
        query: (vehicle) => ({
            url: '',
            method: 'PUT',
            vehicle,
        }),
        invalidatesTags: ['getVehicles']
        }),
        deleteVehicle: builder.mutation<{success: boolean; id:number}, number>({
        query: (id) => ({
            url:`users/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['getVehicles']
        }),
    }),
    })
export const { useGetVehiclesQuery, useGetVehicleByIdQuery, useAddVehicleMutation, useUpdateVehicleMutation, useDeleteVehicleMutation } = vehicleApi
