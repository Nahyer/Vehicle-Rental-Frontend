
import { baseUrl } from "@/utils/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TBookings {
  booking_id: number;
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string;
  return_date: string;
  total_amount: number;
  booking_status: string;
}

export const bookingsApi = createApi({
  reducerPath: 'bookingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/bookings` }),
  endpoints: (builder) => ({
    getbookings: builder.query<TBookings[], void>({
      query: () => ''
    }),
    addbookings: builder.mutation<TBookings, Partial<TBookings>>({
      query: (item) => ({
        url: 'add',
        method: 'POST',
        body: item
      })
    }),
    updatebookings: builder.mutation<TBookings, Partial<TBookings>>({
      query: (item) => ({
        url: 'update',
        method: 'PUT',
        body: item
      })
    }),
    deletebookings: builder.mutation<string, number>({
      query: (id) => ({
        url: `delete/${id.toString()}`,
        method: 'DELETE'
      })
    })
  })
});
