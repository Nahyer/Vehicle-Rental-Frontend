import { createSlice } from "@reduxjs/toolkit";

// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJ1c2VybmFtZSI6InJleSIsInJvbGUiOiJjdXN0b21lciJ9.2jp_N1Nm2o1-owyUcuRK5hIK-GqWY-gsL2UXdOMVcTg",
//     "user": {
//         "user_id": 16,
//         "full_name": "REYHAN LUYAI",
//         "email": "reyhanmark0@gmail.com",
//         "contact_phone": "0743162465",
//         "role": "customer"
//     }
// }
export interface TSess {
    token: string | null;
    user: {
        user_id: number;
        full_name: string;
        email: string;
        contact_phone: string;
        role: string;
        username:string;
        address:string;
    } | null;
}

const initialState:TSess = {
    token:null,
    user: null
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        logSession: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user
        },
        logoutSession: (state) => {
            state.token = null;
            state.user = null
        }
    }
})

export const { logSession, logoutSession } = sessionSlice.actions
export default sessionSlice.reducer