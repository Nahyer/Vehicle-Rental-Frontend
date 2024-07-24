import { RootState } from "@/app/store";
import { baseUrl } from "@/utils/baseUrl";
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
export interface Booking {
    booking_id: number;
    user_id: number;
    vehicle_id: number;
    location_id: number;
    booking_date: string;
    return_date: string;
    total_amount: string;
    booking_status: string;
    created_at: string;
    updated_at: string;
    vehicles: Vehicle;
  }
 export interface VehicleSpecs {
    manufacturer: string;
    model: string;
    year: number;
    fuel_type: string;
    engine_capacity: number;
    transmission: string;
    seating_capacity: number;
    color: string;
    features: string;
    image_url: string;
  }
  
  export interface Vehicle {
    vehicle_id: number;
    vehicleSpecs: VehicleSpecs;
  }
  

export const bookingsApi = createApi({
    reducerPath: 'bookingsAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${baseUrl}/api/bookings`,
        prepareHeaders:(headers,{getState})=>{
            const token = (getState() as RootState).session.token
            token && headers.set('authorization', token)
            return headers
          }
        }),
    endpoints: (builder) => ({
        getBookings: builder.query<TBooking[], void>({
            query: () => ''
        }),
        getBookingById: builder.query<Booking[], number>({
            query: (id) => `${id}`
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

export const { useGetBookingsQuery,useGetBookingByIdQuery, useAddBookingMutation, useUpdateBookingMutation, useDeleteBookingMutation } = bookingsApi