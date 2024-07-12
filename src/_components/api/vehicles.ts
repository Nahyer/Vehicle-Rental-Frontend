
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TVehicles {
  vehicle_id: number;
  vehicleSpec_id: number;
  rental_rate: number;
  availability: boolean;
}

export const vehiclesApi = createApi({
  reducerPath: 'vehiclesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/vehicles' }),
  endpoints: (builder) => ({
    getvehicles: builder.query<TVehicles[], void>({
      query: () => ''
    }),
    addvehicles: builder.mutation<TVehicles, Partial<TVehicles>>({
      query: (item) => ({
        url: 'add',
        method: 'POST',
        body: item
      })
    }),
    updatevehicles: builder.mutation<TVehicles, Partial<TVehicles>>({
      query: (item) => ({
        url: 'update',
        method: 'PUT',
        body: item
      })
    }),
    deletevehicles: builder.mutation<string, number>({
      query: (id) => ({
        url: `delete/${id.toString()}`,
        method: 'DELETE'
      })
    })
  })
});
