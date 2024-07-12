
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TUsers {
  user_id: number;
  full_name: string;
  email: string;
  contact_phone: string;
  address: string;
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/users' }),
  endpoints: (builder) => ({
    getusers: builder.query<TUsers[], void>({
      query: () => ''
    }),
    addusers: builder.mutation<TUsers, Partial<TUsers>>({
      query: (item) => ({
        url: 'add',
        method: 'POST',
        body: item
      })
    }),
    updateusers: builder.mutation<TUsers, Partial<TUsers>>({
      query: (item) => ({
        url: 'update',
        method: 'PUT',
        body: item
      })
    }),
    deleteusers: builder.mutation<string, number>({
      query: (id) => ({
        url: `delete/${id.toString()}`,
        method: 'DELETE'
      })
    })
  })
});
