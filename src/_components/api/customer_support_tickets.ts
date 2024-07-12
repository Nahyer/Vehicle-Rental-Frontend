
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TCustomerSupportTickets {
  ticket_id: number;
  user_id: number;
  subject: string;
  description: string;
  status: string;
}

export const customerSupportTicketsApi = createApi({
  reducerPath: 'customerSupportTicketsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/customer_support_tickets' }),
  endpoints: (builder) => ({
    getcustomerSupportTickets: builder.query<TCustomerSupportTickets[], void>({
      query: () => ''
    }),
    addcustomerSupportTickets: builder.mutation<TCustomerSupportTickets, Partial<TCustomerSupportTickets>>({
      query: (item) => ({
        url: 'add',
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
