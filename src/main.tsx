import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './ErrorPage.tsx'
import { persistor, store } from './app/store.ts'
import RegisterPage from './features/register/RegisterPage.tsx'
import PrivateRoutes from './_components/PrivateRoutes.tsx'
import Dashboard from './_components/Dashboard.tsx'
import AdminDashboard from './_components/admin/Dashboard.tsx'
import VehicleSpecs from './_components/VehicleSpecs.tsx'
import Bookings from './_components/customer/Bookings.tsx'
import Support from './_components/Support.tsx'
import Login from './features/login/Login.tsx'
import UserDasboard from './_components/customer/UserDashboard.tsx'
import UserDashboard from './_components/customer/UserDashboard.tsx'
import Overview from './_components/customer/Overview.tsx'
import Profile from './_components/customer/Profile.tsx'
import EditProfile from './_components/customer/EditProfile.tsx'
import BookingSuccesful from './_components/customer/BookingSuccesful.tsx'
import BookingCancelled from './_components/customer/BookingCancelled.tsx'
import Nav from './_components/Nav.tsx'
import Search from './_components/Search.tsx'




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: 'login',
    element: <Login/>,
    errorElement: <ErrorPage />
  },
  {
    path:'register',
    element: <RegisterPage/>,
    errorElement: <ErrorPage />
  },
  {
    path: '*',
    element: <ErrorPage />,
    errorElement: <ErrorPage />
  },
  {
    path: 'admin/dashboard',
    element:<PrivateRoutes><AdminDashboard /></PrivateRoutes>,
    errorElement: <ErrorPage />
  },
  {
    path:'models/:vehicleId',
    element:<PrivateRoutes><VehicleSpecs/></PrivateRoutes>,
    errorElement: <ErrorPage />

  },
  {
    //search
    path:'vehicles',
    element:<PrivateRoutes><Nav><Search/></Nav></PrivateRoutes>,
    errorElement: <ErrorPage />
  },
  {
    //bookings
    path:'bookings/:vehicleId',
    element:<PrivateRoutes><Bookings/></PrivateRoutes>,
    errorElement: <ErrorPage />
  },
  {
    //support
    path:'support',
    element:<PrivateRoutes><Support/></PrivateRoutes>,
    errorElement: <ErrorPage />
  },
  { path: 'customer',
    element:<UserDashboard />,
    errorElement: <ErrorPage />,
    children:[
      {
        path: 'overview',
        element:<Overview />,
        errorElement: <ErrorPage />
      },
      {
        path: 'profile',
        element:<Nav><Profile /></Nav>,
        errorElement: <ErrorPage />,
        children:[
          {
            path: 'edit/:pid',
            element:<EditProfile />,
            errorElement: <ErrorPage />
          }
        ]
      },
      {
        path: 'booking-successful',
        element:<BookingSuccesful />,
        errorElement: <ErrorPage />
      },
      {
        path: 'booking-cancelled',
        element:<BookingCancelled />,
        errorElement: <ErrorPage />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById("root")!).render(
  
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
