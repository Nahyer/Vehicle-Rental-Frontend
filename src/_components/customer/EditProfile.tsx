
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import {  Mail, NotebookTabs, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useToast } from "@/components/ui/use-toast";
import { useGetUsersByIdQuery, useUpdateusersMutation } from "../api/users"; 
import { ButtonLoading } from "@/features/login/LoginForm";

const schema = yup.object().shape({
	user_id: yup.number(),
	full_name: yup.string().required("Full name is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	contact_phone: yup.string().required("Contact phone is required"),
	address: yup.string().required("Address is required"),
});



const EditProfile = () => {
	const { user } = useSelector((state: RootState) => state.session);
	if (!user?.user_id) return null;
//   const {register, handleSubmit, formState: { errors }} = useForm();

  
//   const onSubmit = async (data:EditFormValues) => {
//     console.log(data);
//   }
const { toast } = useToast();
const [updateUser,{isLoading}] = useUpdateusersMutation();
const {data:userfethed, isLoading:fetUser, refetch} = useGetUsersByIdQuery(user.user_id);

	const { register, handleSubmit, formState: { errors } } = useForm<yup.InferType<typeof schema>>({
		resolver: yupResolver(schema),
		defaultValues: {
			user_id: user?.user_id,
			full_name: user?.full_name,
			email: user?.email,
			contact_phone: user?.contact_phone,
			address: user?.address,
		},
	});

	const onSubmit = async (data: yup.InferType<typeof schema>) => {
	
			try {
				console.log(data);
				const res = await updateUser(data);
				if (res.data) {
					toast({ description: "User updated successfully" });
					refetch();
				}
				if (res.error) {
					console.log(res.error);
					toast({
						title: "Profile update failed",
						description: "An error occurred while updating your profile",
					});
				}
			} catch (error) {	
				console.error(error);
			}
		
	};

	return (
		<Card x-chunk="dashboard-04-chunk-4" className="w-max">
			{/* <CardHeader>
				<CardTitle>{userfethed?.full_name}</CardTitle>
				<CardDescription>
					<span>{user?.username}</span>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex gap-2 items-center">
					<Mail width={20} height={20} />
					<p>{userfethed?.email}</p>
				</div>
				<div className="flex gap-2 items-center">
					<PhoneCall width={15} height={20} />
					<p>{userfethed?.contact_phone}</p>
				</div>
				<div className="flex gap-2 items-center">
					<NotebookTabs width={20} height={20} />
					<p>{userfethed?.address}</p>
				</div>
			</CardContent> */}
			{fetUser ? (
				<div className="flex justify-center items-center h-32 my-3">
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
					</div>
					) : (
					<>
					<CardHeader>
						<CardTitle>{userfethed?.full_name}</CardTitle>
						<CardDescription>
							<span>{user?.username}</span>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex gap-2 items-center">
							<Mail width={20} height={20} />
							<p>{userfethed?.email}</p>
						</div>
						<div className="flex gap-2 items-center">
							<PhoneCall width={15} height={20} />
							<p>{userfethed?.contact_phone}</p>
						</div>
						<div className="flex gap-2 items-center">
							<NotebookTabs width={20} height={20} />
							<p>{userfethed?.address}</p>
						</div>
					</CardContent>
					</>
					)
						}

			<CardFooter>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" className="w-80">
							Edit
						</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Edit profile</SheetTitle>
							<SheetDescription>Update your Profile information</SheetDescription>
						</SheetHeader>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="grid w-full max-w-sm items-center gap-1.5 pt-2">
								<Label htmlFor="full_name">Full Name</Label>
								<Input type="text" id="full_name" placeholder="Full Name" {...register("full_name")} />
								{errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}
							</div>
							<div className="grid w-full max-w-sm items-center gap-1.5 pt-2">
								<Label htmlFor="email">Email</Label>
								<Input type="email" id="email" placeholder="Email" defaultValue={user?.email}{...register("email")}  />
								{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
							</div>
							<div className="grid w-full max-w-sm items-center gap-1.5 pt-2">
								<Label htmlFor="contact_phone">Contact Phone</Label>
								<Input type="text" id="contact_phone" placeholder="Contact Phone" {...register("contact_phone")}  />
								{errors.contact_phone && <p className="text-red-500 text-sm">{errors.contact_phone.message}</p>}
							</div>
							<div className="grid w-full max-w-sm items-center gap-1.5 pt-2">
								<Label htmlFor="address">Address</Label>
								<Input type="text" id="address" placeholder="Address" {...register("address")}  />
								{errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
							</div>
							
							

							<SheetFooter className="mt-3">
								{isLoading ? (
									  <ButtonLoading name="Saving"/>
								) : (
									<Button variant={"outline"} type="submit">
										Save changes
									</Button>	
								)}

								<SheetClose asChild>
									<Button >Cancel</Button>
								</SheetClose>
							</SheetFooter>
						</form>
					</SheetContent>
				</Sheet>
			</CardFooter>
		</Card>
	);
};



export default EditProfile;
