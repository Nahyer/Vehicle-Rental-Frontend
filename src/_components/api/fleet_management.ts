
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TFleetManagement {
  fleet_id: number;
  vehicle_id: number;
  acquisition_date: string;
  depreciation_rate: number;
  current_value: number;
  maintenance_cost: number;
  status: string;
}

export const fleetManagementApi = createApi({
  reducerPath: 'fleetManagementApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/fleet_management' }),
  endpoints: (builder) => ({
    getfleetManagement: builder.query<TFleetManagement[], void>({
      query: () => ''
    }),
    addfleetManagement: builder.mutation<TFleetManagement, Partial<TFleetManagement>>({
      query: (item) => ({
        url: 'add',
        method: 'POST',
        body: item
      })
    }),
    updatefleetManagement: builder.mutation<TFleetManagement, Partial<TFleetManagement>>({
      query: (item) => ({
        url: 'update',
        method: 'PUT',
        body: item
      })
    }),
    deletefleetManagement: builder.mutation<string, number>({
      query: (id) => ({
        url: `delete/${id.toString()}`,
        method: 'DELETE'
      })
    })
  })
});
