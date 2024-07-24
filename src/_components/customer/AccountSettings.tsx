import { Link, NavLink, Outlet } from "react-router-dom";


// import { Button } from "@/components/ui/button";

// import { Input } from "@/components/ui/input";
// // import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// import * as yup from "yup";

// const schema = yup.object().shape({
// 	displayName: yup
// 		.string()
// 		.max(32, "Display name cannot exceed 32 characters")
// 		.required("Display name is required"),
// });

// import { Label } from "@/components/ui/label"
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"

// export function SheetDemo() {
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="outline">Open</Button>
//       </SheetTrigger>
//       <SheetContent>
//         <SheetHeader>
//           <SheetTitle>Edit profile</SheetTitle>
//           <SheetDescription>
//             Make changes to your profile here. Click save when you're done.
//           </SheetDescription>
//         </SheetHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Name
//             </Label>
//             <Input id="name" value="Pedro Duarte" className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="username" className="text-right">
//               Username
//             </Label>
//             <Input id="username" value="@peduarte" className="col-span-3" />
//           </div>
//         </div>
//         <SheetFooter>
//           <SheetClose asChild>
//             <Button type="submit">Save changes</Button>
//           </SheetClose>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   )
// }


export function AccountSettings() {
	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors },
	// } = useForm({
	// 	resolver: yupResolver(schema),
	// });

	// const onSubmit = (data:yup.InferType<typeof schema>) => {
	// 	console.log(data);
	// };
	return (
		<div className='flex min-h-screen w-full flex-col'>
			{/* <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
       
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
         
  
      </header> */}
			<main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40  md:gap-8 md:p-10'>
				<div className='mx-auto grid w-full max-w-6xl gap-2'>
					<h1 className='text-3xl font-semibold'>Settings</h1>
				</div>
				<div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
					<nav
						className='grid gap-4 text-sm text-muted-foreground'
						x-chunk='dashboard-04-chunk-0'
					>
						<Link to='#' className='font-semibold text-primary'>
							General
						</Link>
						<NavLink to='/customer/dashboard/settings/edit/' className={({isActive})=> isActive? "font-semibold text-primary": ""} >Edit Profile</NavLink>
						<Link to='/customer/dashboard/settings/support'>Support</Link>
					</nav>
					<div className='grid gap-6'>
					
						
                        <Outlet/>
					</div>
				</div>
			</main>
		</div>
	);
}
