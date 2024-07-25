import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { persistor, store } from './app/store.ts'
import RegisterPage from './features/register/RegisterPage.tsx'
import PrivateRoutes from './_components/PrivateRoutes.tsx'
// import Dashboard from './_components/Dashboard.tsx'
import AdminDashboard from './_components/admin/Dashboard.tsx'
import VehicleSpecs from './_components/VehicleSpecs.tsx'
import Bookings from './_components/customer/Bookings.tsx'
import Support from './_components/Support.tsx'
import UserDashboard from './_components/customer/UserDashboard.tsx'
import Overview from './_components/customer/Overview.tsx'
import AdminOverview from './_components/admin/Overview.tsx'
import Profile from './_components/customer/Profile.tsx'
import EditProfile from './_components/customer/EditProfile.tsx'
import BookingSuccesful from './_components/customer/BookingSuccesful.tsx'
import BookingCancelled from './_components/customer/BookingCancelled.tsx'
import Nav from './_components/Nav.tsx'
import Search from './_components/Search.tsx'
import BookingHistory from './_components/customer/BookingHistory.tsx'
import { AccountSettings } from './_components/customer/AccountSettings.tsx'
import ManageVehicles from './_components/admin/ManageVehicles.tsx'
import Reports from './_components/admin/Reports.tsx'
import ManageUsers from './_components/admin/ManageUsers.tsx'
import BranchLocations from './_components/admin/BranchLocations.tsx'
import ManageTickets from './_components/admin/ManageTickets.tsx'
import Layout from './app/Lyout.tsx'
import AboutUs from './_components/AboutUs.tsx'
import Wrong from './app/Wrong.tsx'
import NotFoundPage from './features/NotFoundPage.tsx'
import FleetManagement from './_components/admin/FleetManagement.tsx'






const router = createBrowserRouter([
  {
    element: <Layout/>,
    children:[
      {
        element: <Nav/>,
        children:[
         
            {
              path: '/',
              element: <App />,
              errorElement: <Wrong />
            },
            // {
            //   path: 'login',
            //   element: <LoginModal/>,
            //   errorElement: <Wrong />
            // },
            {
              path:'register',
              element: <RegisterPage/>,
              errorElement: <Wrong />
            },
            {
              path: '*',
              element: <Wrong />,
              errorElement: <Wrong />
            },
            
           
            {
              path:'models/:vehicleId',
              element:<PrivateRoutes><VehicleSpecs/></PrivateRoutes>,
              errorElement: <Wrong />
          
            },
            {
              //search
              path:'vehicles',
              element:<Search/>,
              errorElement: <Wrong />,
            },
            {
              //bookings
              path:'vehicles/booking/:vehicleId',
              element:<PrivateRoutes><Bookings/></PrivateRoutes>,
              errorElement: <Wrong />
            },
            {
              path: 'about',
              element: <AboutUs />,
              errorElement: <Wrong />
          }
         
           
            
           
        
        ]
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      { path: 'customer/dashboard',
        element:<UserDashboard />,
        errorElement: <Wrong />,
        children:[
          {
            path: 'overview',
            element:<Overview />,
            errorElement: <Wrong />
          },
          {
            path: 'profile',
            element:<Profile />,
            errorElement: <Wrong />,
            children:[
              {
                path: 'edit/:pid',
                element:<EditProfile />,
                errorElement: <Wrong />
              }
            ]
          },
          {
            path:'tickets',
            element:<Support />,
            errorElement: <Wrong />
          },
          {
            path: 'bookings',
            element:<BookingHistory />,
            errorElement: <Wrong />
          },
          {
            path: 'booking-successful',
            element:<BookingSuccesful />,
            errorElement: <Wrong />
          },
          {
            path: 'booking-cancelled',
            element:<BookingCancelled />,
            errorElement: <Wrong />
          },
          {
            path: 'settings',
            element:<AccountSettings/>,
            children:[
              {
                path: 'edit/',
                element:<EditProfile />,
                errorElement: <Wrong />
              },
              {
                path:'support',
                element:<PrivateRoutes><Support/></PrivateRoutes>,
                errorElement: <Wrong />
              },
            ],
            errorElement: <Wrong />,
          }
        ]
      },
      {
        path: 'admin/',
        element:<PrivateRoutes><AdminDashboard /></PrivateRoutes>,
        children:[
          {
            path: 'dashboard',
            element:<AdminOverview />,
            errorElement: <Wrong />
          },
          {
            path:'manage-vehicles',
            element:<ManageVehicles />,
            errorElement: <Wrong />
          },
          {
            path:'reports',
            element:<Reports />,
            errorElement: <Wrong />
          },
          {
            path: 'manage-customers',
            element:<ManageUsers />,
            errorElement: <Wrong />
          },
          {
            path: 'branch-locations',
            element:<BranchLocations />,
            errorElement: <Wrong />
          },
          {
            path: 'tickets',
            element:<ManageTickets />,
            errorElement: <Wrong />
          },
          {
            path: 'fleet-management',
            element:<FleetManagement/>,
            errorElement: <Wrong />
          }
        ],
        errorElement: <Wrong />
      }
      
    ]
  },

  

])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* Wrap RouterProvider in a div with bg-white to set the background color */}
        <div className="bg-slate-200">
          <RouterProvider router={router} />
        </div>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
