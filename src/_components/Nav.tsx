import { useSelector, useDispatch } from "react-redux";
import { logoutSession } from "../features/login/sessionSlice";
import { NavLink, Outlet } from "react-router-dom";
import { RootState } from "../app/store";
import logo from "../assets/images/logo.svg";
import Footer from "./Footer";
import LoginForm from "@/features/login/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUp from "@/features/login/SignUp";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import avator from "../assets/images/avatar.svg";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTrigger
} from "@/components/ui/dialog";


export interface AuthUser {
	user_id: number;
	full_name: string;
	email: string;
	contact_phone: string;
	role: string;
}
const Nav = () => {
	const { user } = useSelector((state: RootState) => state.session);
	
		// const { full_name, role } = user as AuthUser;
	

	const dispatch = useDispatch();
	const logout = () => dispatch(logoutSession());

	return (
		<>
			<nav className='fixed top-0 w-full z-20 flex items-center justify-between p-4 bg-slate-50 text-foreground'>
				<div className='flex pr-2'>
					<NavLink to='/'>
						<img src={logo} alt='logo' className='mr-2' style={{ width: 40 }} />
					</NavLink>
					'
				</div>

				<div className='grow space-x-8 justify-center'>
					<NavLink
						to='/vehicles'
						className='text-lg text-slate-950 hover:text-primary'
					>
						Explore
					</NavLink>
					<a href='#' className='text-lg text-slate-950 hover:text-primary'>
						About
					</a>
					<a href='#' className='text-lg text-slate-950 hover:text-primary'>
						Contact
					</a>
					<NavLink
						to='/support'
						className='text-lg text-slate-950 hover:text-primary'
					>
						Support
					</NavLink>
				</div>
				{user ? (
					<div className='dropdown dropdown-end flex flex-row space-x-3'>
						<div>
							<div className='flex-grow space-x-0 text-sm h-8'>
								<h2 className='text-lg font-semibold text-black'>
									{user.full_name}
								</h2>
								<p className='text-muted-foreground text-black'>{user.role}</p>
							</div>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='outline'
									size='icon'
									className='overflow-hidden rounded-full'
								>
									<img
										src={avator}
										width={36}
										height={36}
										alt='Avatar'
										className='overflow-hidden rounded-full'
									/>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								{user.role === "customer" ? (
									<NavLink
										to={`/customer/dashboard/overview`}
										className='nav-item nav-link text-blue-500'
									>
										<DropdownMenuLabel>Dashboard</DropdownMenuLabel>
									</NavLink>
								) : (
									<NavLink
										to={`/admin/dashboard/`}
										className='nav-item nav-link text-blue-500'
									>
										<DropdownMenuLabel>Dashboard</DropdownMenuLabel>
									</NavLink>
								)}

								<DropdownMenuSeparator />
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuItem>Support</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				) : (
					<div className='flex space-x-4'>
						<Dialog >
							<DialogTrigger asChild>
								<Button variant='outline'className="px-4 py-2 bg-white text-primary rounded-full hover:bg-primary/80 hover:text-white">Login</Button>
							</DialogTrigger>
							<DialogContent className='sm:max-w-[425px] max-h-[80vh] overflow-y-auto '>
							
								<Tabs defaultValue='login'>
						<TabsList className='grid w-full grid-cols-2'>
							<TabsTrigger value='login'>Login</TabsTrigger>
							<TabsTrigger value='register'>Register</TabsTrigger>
						</TabsList>
						<TabsContent value='login'>
							<LoginForm />
						</TabsContent>
						<TabsContent value='register'>
							<SignUp />
						</TabsContent>
					</Tabs>
								
							</DialogContent>
						</Dialog>
						<button className='px-4 py-2 bg-primary text-zinc-200 rounded-full hover:bg-primary/80'>
							Register
						</button>
					</div>
				)}
			</nav>
			<dialog id='my_modal_3' className='modal rounded-lg p-6'>
				<div className='modal-box pr-0 bg-zinc-200 rounded-lg '>
					<form method='dialog'>
						{/* if there is a button in form, it will close the modal */}
						<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
							✕
						</button>
					</form>
					<Tabs defaultValue='login' className='w-[400px]'>
						<TabsList className='grid w-full grid-cols-2'>
							<TabsTrigger value='login'>Login</TabsTrigger>
							<TabsTrigger value='register'>Register</TabsTrigger>
						</TabsList>
						<TabsContent value='login'>
							<LoginForm />
						</TabsContent>
						<TabsContent value='register'>
							<SignUp />
						</TabsContent>
					</Tabs>
				</div>
			</dialog>
			<main className='z-0'>
				<Outlet />
			</main>

			<Footer />
			{/* <div className='navbar bg-slate-50'>
				<div className='flex-none'>
					
				</div>
			</div> */}
		</>
	);
};

export default Nav;
