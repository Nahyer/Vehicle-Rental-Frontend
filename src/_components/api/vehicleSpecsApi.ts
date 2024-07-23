
import { RootState } from "@/app/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TVehicleSpecs {
  vehicleSpec_id: number;
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: number;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
}

export const vehicleSpecsApi = createApi({
  reducerPath: 'vehicleSpecsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/vehiclespecs',
    prepareHeaders:(headers,{getState})=>{
      const token = (getState() as RootState).session.token
      if(token){
        headers.set('authorization', token)
      }
      return headers
    }
   }),
  endpoints: (builder) => ({
    getvehicleSpecs: builder.query<TVehicleSpecs[], void>({
      query: () => '',
    }),
    addvehicleSpecs: builder.mutation<TVehicleSpecs, Partial<TVehicleSpecs>>({
      query: (item) => ({
        url: 'create',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: item
      })
    }),
    updatevehicleSpecs: builder.mutation<TVehicleSpecs, Partial<TVehicleSpecs>>({
      query: (item) => ({
        url: 'update',
        method: 'PUT',
        body: item
      })
    }),
    deletevehicleSpecs: builder.mutation<string, number>({
      query: (id) => ({
        url: `delete/${id.toString()}`,
        method: 'DELETE'
      })
    })
  })
});

export const { useGetvehicleSpecsQuery, useAddvehicleSpecsMutation, useUpdatevehicleSpecsMutation, useDeletevehicleSpecsMutation } = vehicleSpecsApi;
