
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
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/vehicleSpecs' }),
  endpoints: (builder) => ({
    getvehicleSpecs: builder.query<TVehicleSpecs[], void>({
      query: () => ''
    }),
    addvehicleSpecs: builder.mutation<TVehicleSpecs, Partial<TVehicleSpecs>>({
      query: (item) => ({
        url: 'add',
        method: 'POST',
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
