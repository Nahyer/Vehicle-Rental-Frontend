import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TBooking {
    booking_id: number;
    user_id: number;
    vehicle_id: number;
    location_id: number;
    booking_date: Date;
    return_date: Date;
    total_amount: number;
    booking_status: string;
}

export const bookingsApi = createApi({
    reducerPath: 'bookingsAPI',
    baseQuery: fetchBaseQuery({baseUrl: `'${import.meta.env.VITE_BACKEND_BASEURL}/bookings`}),
    endpoints: (builder) => ({
        getBookings: builder.query<TBooking[], void>({
            query: () => ''
        }),
        addBooking: builder.mutation<{ booking_id: number }[], Partial<TBooking>>({
            query: (booking) => ({
                url: 'add',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: booking
            })
        }),
        updateBooking: builder.mutation<TBooking, Partial<TBooking>>({
            query: (booking) => ({
                url: 'update',
                method: 'PUT',
                body: booking
            })
        }),
        deleteBooking: builder.mutation<string, number>({
            query: (id:number) => ({
                url: `delete/${id.toString()}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetBookingsQuery, useAddBookingMutation, useUpdateBookingMutation, useDeleteBookingMutation } = bookingsApi