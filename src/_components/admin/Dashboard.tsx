import { Outlet } from "react-router-dom";
import { Link} from "react-router-dom";
import avator from "../../assets/images/avatar.svg";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CarFront,
  ClipboardIcon,
  MapPin,
  Monitor,
  Settings,
  Ticket,
  Truck,
  Users2,
} from "lucide-react"



import {useDispatch, useSelector } from "react-redux";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TooltipProvider } from "@radix-ui/react-tooltip";
import logo from "../../assets/images/logo.svg";
import { logoutSession } from "@/features/login/sessionSlice";
import { Button } from "@/components/ui/button";
import { RootState } from "@/app/store";


const UserDashboard = () => {
  const {user} = useSelector((state: RootState) => state.session);
  if (!user) return null;
  const dispatch = useDispatch();
	const logout = () => dispatch(logoutSession());
	return (
		<div>
			 <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-blue-700 sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
							to='/'
							className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gray-300 text-lg font-semibold text-black md:h-8 md:w-8 md:text-base'
						>
							<img
								src={logo}
								className='h-5 w-5 transition-all group-hover:scale-110 stroke-black'
							/>
							<span className='sr-only'>RentMyRide</span>
						</Link>
         
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="dashboard"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Monitor className="h-6 w-6 stroke-white" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="manage-vehicles"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <CarFront className="h-6 w-6 stroke-white" />
                <span className="sr-only">Vehicles</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Vehicles</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="reports"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <ClipboardIcon className="h-6 w-6 stroke-white" />
                <span className="sr-only">Reports</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Reports</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="manage-customers"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Users2 className="h-6 w-6 stroke-white" />
                <span className="sr-only">Customers</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Customers</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="branch-locations"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <MapPin className="h-6 w-6 stroke-white" />
                <span className="sr-only">Branch Locations</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Branch Locations</TooltipContent>
          </Tooltip> 
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="fleet-management"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Truck className="h-6 w-6 stroke-white" />
                <span className="sr-only">Fleet Management</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Fleet Management</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="tickets"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Ticket className="h-6 w-6 stroke-white" />
                <span className="sr-only">Tickets</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Tickets</TooltipContent>
          </Tooltip> 
         
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-6 w-6 stroke-white" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
        
      </aside>
      </TooltipProvider>
      
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 justify-end">
         
        
							<div className='flex-grow space-x-0 text-sm h-8'>
								<h2 className='text-lg font-semibold text-black'>
									{user.full_name}
								</h2>
								<p className='text-muted-foreground text-black'>{user.role}</p>
							</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src={avator}
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
             
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="px-16">
         
          <Outlet/>
        </main>
      </div>
    </div>
		</div>
	);
};

export default UserDashboard;
