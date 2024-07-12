
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TAuthentication {
  auth_id: number;
  user_id: number;
  username: string;
  role: string;
  password: string;
}

export const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/authentication' }),
  endpoints: (builder) => ({
    getauthentication: builder.query<TAuthentication[], void>({
      query: () => ''
    }),
    addauthentication: builder.mutation<TAuthentication, Partial<TAuthentication>>({
      query: (item) => ({
        url: 'add',
        method: 'POST',
        body: item
      })
    }),
    updateauthentication: builder.mutation<TAuthentication, Partial<TAuthentication>>({
      query: (item) => ({
        url: 'update',
        method: 'PUT',
        body: item
      })
    }),
    deleteauthentication: builder.mutation<string, number>({
      query: (id) => ({
        url: `delete/${id.toString()}`,
        method: 'DELETE'
      })
    })
  })
});
