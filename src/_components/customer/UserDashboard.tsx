import { Navigate, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import avator from "../../assets/images/avatar.svg";

import {

	BookMarked,
	Car,


	Monitor,


	Settings,
	TicketSlash
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import logo from "../../assets/images/logo.svg";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { logoutSession } from "@/features/login/sessionSlice";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
	const nav = useNavigate();
	const { user } = useSelector((state: RootState) => state.session);
	if (user === null) {
		return <Navigate to='/' />;
	}
	

	const dispatch = useDispatch();
	const logout = () =>{ 
		toast({
			description: "Logout successful"
		})
		dispatch(logoutSession());
		nav("/")
	
	}
	return (
		<div className='flex min-h-screen w-full flex-col bg-muted/40'>
			<TooltipProvider>
				<aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-white sm:flex'>
					<nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
						<Link
							to='/'
							className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-slate-400 text-lg font-semibold text-black md:h-8 md:w-8 md:text-base'
						>
							<img
								src={logo}
								className='h-4 w-4 transition-all group-hover:scale-110 stroke-black'
							/>
							<span className='sr-only'>RentMyRide</span>
						</Link>

						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									to='/customer/dashboard/overview'
									className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
								>
									<Monitor className='h-6 w-6 stroke-black' />
									<span className='sr-only'>Dashboard</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right'>Dashboard</TooltipContent>
						</Tooltip>
						
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									to='/vehicles'
									className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
								>
									<Car className='h-6 w-6 stroke-black' />
									<span className='sr-only'>Book Vehicle</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right'>Book Vehicle</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									to='bookings'
									className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
								>
									<BookMarked className='h-6 w-6 stroke-black' />
									<span className='sr-only'>Booking History</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right'>Booking History</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									to='tickets'
									className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
								>
									<TicketSlash className='h-6 w-6 stroke-black' />
									<span className='sr-only'>Tickets</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right'>Tickects</TooltipContent>
						</Tooltip>
					</nav>
					<nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									to='settings'
									className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
								>
									<Settings className='h-6 w-6 stroke-black' />
									<span className='sr-only'>Settings</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right'>Settings</TooltipContent>
						</Tooltip>
					</nav>
				</aside>
			</TooltipProvider>

			<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
				<header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 justify-between'>
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
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<main >
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default UserDashboard;

