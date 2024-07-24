import { Navigate, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import avator from "../../assets/images/avatar.svg";

import {

	BookMarked,
	BookMinusIcon,
	Car,

	Home,

	LineChart,

	Monitor,

	Package,

	Package2,

	PanelLeft,

	Settings,
	ShoppingCart,
	TicketSlash,
	Users2
} from "lucide-react";


import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { logoutSession } from "@/features/login/sessionSlice";

const UserDashboard = () => {
	const { user } = useSelector((state: RootState) => state.session);
	if (user === null) {
		return <Navigate to='/' />;
	}
	

	const dispatch = useDispatch();
	const logout = () => dispatch(logoutSession());
	return (
		<div className='flex min-h-screen w-full flex-col bg-muted/40'>
			<TooltipProvider>
				<aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-white sm:flex'>
					<nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
						<Link
							to='/'
							className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-black md:h-8 md:w-8 md:text-base'
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
									to='#'
									className='flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
								>
									<BookMinusIcon className='h-6 w-6 stroke-black' />
									<span className='sr-only'>Vehicles</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right'>Vehicles</TooltipContent>
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
					<Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                to="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                to="#"
                className="flex items-center gap-4 px-2.5 text-foreground"
              >
                <ShoppingCart className="h-5 w-5" />
                Orders
              </Link>
              <Link
                to="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
                Products
              </Link>
              <Link
                to="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Users2 className="h-5 w-5" />
                Customers
              </Link>
              <Link
                to="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <LineChart className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
					<Breadcrumb className='hidden md:flex'>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link to='#'>Dashboard</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link to='#'>Orders</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>Recent Orders</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					{/* <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div> */}
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

// function Sidebar() {
// 	return (
// 		<nav className='sidebar'>
// 			<ul>
// 				<li>
// 					<NavLink to='overview'>Overview</NavLink>
// 				</li>
// 				<li>
// 					<NavLink to='profile'>My Profile</NavLink>
// 				</li>
// 				{/* <li><NavLink to="/booking-history">Booking History</NavLink></li>
//         <li><NavLink to="/current-bookings">Current Bookings</NavLink></li>
//         <li><NavLink to="/book-vehicle">Book a Vehicle</NavLink></li>
//         <li><NavLink to="/account-settings">Manage Account Settings</NavLink></li>
//         <li><NavLink to="/support-tickets">Support Tickets</NavLink></li>
//         <li><NavLink to="/notifications">Notifications</NavLink></li>
//         <li><NavLink to="/payment-history">Payment History</NavLink></li>
//         <li><NavLink to="/favorites">Vehicle Favorites</NavLink></li>
//         <li><NavLink to="/help-center">Help Center</NavLink></li>
//         <li><NavLink to="/logout">Logout</NavLink></li> */}
// 			</ul>
// 		</nav>
// 	);
// }
