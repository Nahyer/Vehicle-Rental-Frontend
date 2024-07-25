import { baseUrl } from "@/utils/baseUrl";
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
    fullname: string;
    email: string;
    contactPhone: string;
    address: string;
    username: string;
    password: string;
}

export const registerApi = createApi({
    reducerPath: 'registerApi',
    baseQuery: fetchBaseQuery({baseUrl: `${baseUrl}/api/auth`}),
    endpoints: (builder) => ({
        registerUser: builder.mutation<string,Partial<User>>({
            query: (user)=>({
                url:'register',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: user
            })
        })
    })
    
})

export const { useRegisterUserMutation } = registerApi