
import { baseUrl } from "@/utils/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TPayments {
  payment_id: number;
  booking_id: number;
  amount: number;
  payment_status: string;
  payment_date: string;
  payment_method: string;
  transaction_id: string;
}

export const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/payments` }),
  endpoints: (builder) => ({
    getpayments: builder.query<TPayments[], void>({
      query: () => ''
    }),
    addpayments: builder.mutation<TPayments, Partial<TPayments>>({
      query: (item) => ({
        url: 'add',
        method: 'POST',
        body: item
      })
    }),
    updatepayments: builder.mutation<TPayments, Partial<TPayments>>({
      query: (item) => ({
        url: 'update',
        method: 'PUT',
        body: item
      })
    }),
    deletepayments: builder.mutation<string, number>({
      query: (id) => ({
        url: `delete/${id.toString()}`,
        method: 'DELETE'
      })
    })
  })
});
