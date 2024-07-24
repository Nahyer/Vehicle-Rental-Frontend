import { RootState } from "@/app/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface TUsers {
  user_id: number;
  full_name: string;
  email: string;
  contact_phone: string;
  address: string;
  auth: {
    role: string;
    username?: string;
  };
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_BASEURL}/api/users`,
    prepareHeaders:(headers,{getState})=>{
        const token = (getState() as RootState).session.token
        token && headers.set('authorization', token)
        return headers
      }
    }),
  endpoints: (builder) => ({
    getusers: builder.query<TUsers[], void>({
      query: () => ''
    }),
    getUsersById: builder.query<TUsers, number>({
      query: (id) => `${id}`
    }),
    addusers: builder.mutation<TUsers, Partial<TUsers>>({
      query: (item) => ({
        url: 'add',
        method: 'POST',
        body: item
      })
    }),
    updateusers: builder.mutation<TUsers, Partial<TUsers>>({
      query: (arg: Partial<TUsers>) => ({
        url: `update/${arg.user_id}`,
        method: 'PUT',
        body: arg
      })
    }),
    deleteusers: builder.mutation<string, number[]>({
      query: (id) => ({
        url: `delete/${id.toString()}`,
        method: 'DELETE'
      })
    })
  })
});

export const { useGetusersQuery,useGetUsersByIdQuery, useAddusersMutation, useUpdateusersMutation, useDeleteusersMutation } = usersApi