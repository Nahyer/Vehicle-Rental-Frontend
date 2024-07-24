import { baseUrl } from "@/utils/baseUrl";
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Payment {
    payment_id: number;
    amount: number;
    payment_date: string;
    payment_method: string;
    payment_status: string;
    booking_id: number;
}

export interface PaymentDetails {
    amount: number;
    bookingId: number;
    vehicleSpecs: string;
} 
export interface Tsession{
    session_id: number;
    session_date: string;
    session_time: string;
    session_status: string;
}

export const paymentApi = createApi({
    reducerPath: 'paymentAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${baseUrl}/api/payments`}),
    endpoints: (builder) => ({
        getPayments: builder.query<Payment[], void>({
            query: () => ''
        }),
        checkOut: builder.mutation<any,PaymentDetails>({
            query: (payment) => ({
                url: 'checkout',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: payment
            })
        }),
        updatePayment: builder.mutation<Payment, Partial<Payment>>({
            query: (payment) => ({
                url: 'update',
                method: 'PUT',
                body: payment
            })
        }),
        deletePayment: builder.mutation<string, number>({
            query: (id:number) => ({
                url: `delete/${id.toString()}`,
                method: 'DELETE'
            })
        })
    })
})



