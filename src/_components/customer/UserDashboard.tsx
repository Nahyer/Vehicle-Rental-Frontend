import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import Overview from "./Overview";
import ErrorPage from "../../ErrorPage";



const UserDashboard = () => {
  return (
    <div>
        <Sidebar />
        <Outlet />
    </div>
  )
}

export default UserDashboard




function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li><NavLink to="overview">Overview</NavLink></li>
        <li><NavLink to="profile">My Profile</NavLink></li>
        {/* <li><NavLink to="/booking-history">Booking History</NavLink></li>
        <li><NavLink to="/current-bookings">Current Bookings</NavLink></li>
        <li><NavLink to="/book-vehicle">Book a Vehicle</NavLink></li>
        <li><NavLink to="/account-settings">Manage Account Settings</NavLink></li>
        <li><NavLink to="/support-tickets">Support Tickets</NavLink></li>
        <li><NavLink to="/notifications">Notifications</NavLink></li>
        <li><NavLink to="/payment-history">Payment History</NavLink></li>
        <li><NavLink to="/favorites">Vehicle Favorites</NavLink></li>
        <li><NavLink to="/help-center">Help Center</NavLink></li>
        <li><NavLink to="/logout">Logout</NavLink></li> */}
      </ul>
    </nav>
  );
}



