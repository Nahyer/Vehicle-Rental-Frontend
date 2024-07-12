import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { loginApi } from "../features/login/loginApi";
import { registerApi } from "../features/register/registerSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import sessionReducer from "../features/login/sessionSlice"
import { vehicleApi } from "../features/vehicles/vehicleApi";
import { locBranchesApi } from "../features/locationsAndBranches/locBrancesAPI";
import { bookingsApi } from "../features/bookings/bookingsApi";
import { paymentApi } from "../features/payments/paymentApi";

const persistConfig = {
    key: 'root',
    version: 1,
    storage
  }

const rootReducer = combineReducers({
    session: sessionReducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [vehicleApi.reducerPath]: vehicleApi.reducer,
    [locBranchesApi.reducerPath]: locBranchesApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer
  })
const persistedReducer = persistReducer(persistConfig, rootReducer)

 export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }
    )
    .concat(registerApi.middleware).concat(loginApi.middleware)
    .concat(vehicleApi.middleware).concat(locBranchesApi.middleware)
    .concat(bookingsApi.middleware).concat(paymentApi.middleware)
 });

export const persistor = persistStore(store);
setupListeners(store.dispatch);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;