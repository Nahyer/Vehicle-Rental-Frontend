import { useSelector, useDispatch } from "react-redux";
import { logoutSession, TSess } from "../features/login/sessionSlice";
import { NavLink } from "react-router-dom";
import { RootState } from "../app/store";

export interface AuthUser {
	user_id: number;
	full_name: string;
	email: string;
	contact_phone: string;
	role: string;
}
const Nav = ({children}) => {
	const { user } = useSelector((state: RootState) => state.session);
	if (!user) return null;
	const { user_id, full_name, email, contact_phone, role }: AuthUser = user;
	const dispatch = useDispatch();
	const logout = () => dispatch(logoutSession());

	return (
    <>
		<nav className='navbar navbar-expand navbar-dark bg-dark'>
			<div className='navbar-nav space-x-4'>
				<p>Welcome {full_name}</p>
				<NavLink to='/' className='nav-item nav-link text-blue-500'>
					Home
				</NavLink>
				<NavLink
					to={`/customer/profile/`}
					className='nav-item nav-link text-blue-500'
				>
					Profile
				</NavLink>
				<NavLink to='/support' className='nav-item nav-link text-blue-500'>
					Support
				</NavLink>
        <NavLink to='/vehicles' className='nav-item nav-link text-blue-500'>
          Vehicles
        </NavLink>
				<NavLink to='/bookings' className='nav-item nav-link text-blue-500'>
					Bookings
				</NavLink>
				<NavLink
					to='/admin/dashboard'
					className='nav-item nav-link text-blue-500'
				>
					AdminDashbord
				</NavLink>
				<button onClick={logout} className='btn btn-link nav-item nav-link'>
					Logout
				</button>
			</div>
		</nav>

    <main>
    {children}
      </main>
    </>
	);
};

export default Nav;
