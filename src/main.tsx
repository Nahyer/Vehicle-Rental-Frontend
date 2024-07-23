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
              errorElement: <ErrorPage />
            },
            // {
            //   path: 'login',
            //   element: <LoginModal/>,
            //   errorElement: <ErrorPage />
            // },
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
              path:'models/:vehicleId',
              element:<PrivateRoutes><VehicleSpecs/></PrivateRoutes>,
              errorElement: <ErrorPage />
          
            },
            {
              //search
              path:'vehicles',
              element:<Search/>,
              errorElement: <ErrorPage />,
            },
            {
              //bookings
              path:'vehicles/booking/:vehicleId',
              element:<PrivateRoutes><Bookings/></PrivateRoutes>,
              errorElement: <ErrorPage />
            },
            {
              path: 'about',
              element: <AboutUs />,
              errorElement: <ErrorPage />
          }
         
           
            
           
        
        ]
      },
      { path: 'customer/dashboard',
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
            element:<Profile />,
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
            path:'tickets',
            element:<Support />,
            errorElement: <ErrorPage />
          },
          {
            path: 'bookings',
            element:<BookingHistory />,
            errorElement: <ErrorPage />
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
          },
          {
            path: 'settings',
            element:<AccountSettings/>,
            children:[
              {
                path: 'edit/:pid',
                element:<EditProfile />,
                errorElement: <ErrorPage />
              },
              {
                path:'support',
                element:<PrivateRoutes><Support/></PrivateRoutes>,
                errorElement: <ErrorPage />
              },
            ],
            errorElement: <ErrorPage />,
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
            errorElement: <ErrorPage />
          },
          {
            path:'manage-vehicles',
            element:<ManageVehicles />,
            errorElement: <ErrorPage />
          },
          {
            path:'reports',
            element:<Reports />,
            errorElement: <ErrorPage />
          },
          {
            path: 'manage-customers',
            element:<ManageUsers />,
            errorElement: <ErrorPage />
          },
          {
            path: 'branch-locations',
            element:<BranchLocations />,
            errorElement: <ErrorPage />
          },
          {
            path: 'tickets',
            element:<ManageTickets />,
            errorElement: <ErrorPage />
          }
        ],
        errorElement: <ErrorPage />
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
