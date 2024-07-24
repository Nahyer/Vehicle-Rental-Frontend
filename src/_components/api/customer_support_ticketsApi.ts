
import { RootState } from "@/app/store";
import { baseUrl } from "@/utils/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TCustomerSupportTickets {
  ticket_id: number;
  user_id: number;
  subject: string;
  description: string;
  status: string;
  users:{
    full_name: string;
    email: string;
  };
  }

export const customerSupportTicketsApi = createApi({
  reducerPath: 'customerSupportTicketsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/tickets`,
    prepareHeaders:(headers,{getState})=>{
      const token = (getState() as RootState).session.token
      token && headers.set('authorization', `${token}`)
      return headers
    }
   }),
  endpoints: (builder) => ({
    getcustomerSupportTickets: builder.query<TCustomerSupportTickets[], void>({
      query: () => ''
    }),
    addcustomerSupportTickets: builder.mutation<TCustomerSupportTickets, Partial<TCustomerSupportTickets>>({
      query: (item) => ({
        url: 'create',
        method: 'POST',
        body: item
      })
    }),
    updatecustomerSupportTickets: builder.mutation<TCustomerSupportTickets, Partial<TCustomerSupportTickets>>({
      query: (item) => ({
        url: 'update',
        method: 'PUT',
        body: item
      })
    }),
    deletecustomerSupportTickets: builder.mutation<string, number>({
      query: (id) => ({
        url: `delete/${id.toString()}`,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useGetcustomerSupportTicketsQuery,
  useAddcustomerSupportTicketsMutation,
  useUpdatecustomerSupportTicketsMutation,
  useDeletecustomerSupportTicketsMutation
} = customerSupportTicketsApi;