import { RootState } from "@/app/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Tlocation{
    location_id: number;
    name: string;
    address: string;
    contact_phone: string;
}

export const locBranchesApi = createApi({
    reducerPath: 'locBranchesAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_BACKEND_BASEURL}/api/branchlocations`,
    prepareHeaders:(headers,{getState})=>{
        const token = (getState() as RootState).session.token
        token && headers.set('authorization', token)
        return headers
      }
    }),
    endpoints: (builder) => ({
        getLocations: builder.query<Tlocation[], void>({
            query: () => ''
        }),
        addLocation: builder.mutation<Tlocation, Partial<Tlocation>>({
            query: (location) => ({
                url: 'add',
                method: 'POST',
                body: location
            })
        }),
        updateLocation: builder.mutation<Tlocation, Partial<Tlocation>>({
            query: (location) => ({
                url: 'update',
                method: 'PUT',
                body: location
            })
        }),
        deleteLocation: builder.mutation<string, number>({
            query: (id:number) => ({
                url: `delete/${id.toString()}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetLocationsQuery, useAddLocationMutation, useUpdateLocationMutation, useDeleteLocationMutation } = locBranchesApi