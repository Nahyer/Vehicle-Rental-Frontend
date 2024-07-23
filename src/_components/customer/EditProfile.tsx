
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
import {  Mail, NotebookTabs, PhoneCall,  User2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface EditFormValues {
  
  user_id: number;
  full_name: string;
  email: string;
  contact_phone: string;
  address: string; 
}

const EditProfile = () => {
//   const {register, handleSubmit, formState: { errors }} = useForm();

  
//   const onSubmit = async (data:EditFormValues) => {
//     console.log(data);
//   }

  return (
    <>
   <Card x-chunk='dashboard-04-chunk-4' className='w-max'>
							<CardHeader>
								<CardTitle>Reyhan Luyai</CardTitle>
								<CardDescription>
									<p>username</p>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='flex gap-2  items-center'>
									<User2 width={20} height={20} />
									<p>full name</p>
								</div>
								<div className='flex gap-2 items-center'>
									<Mail width={20} height={20} />
									<p>email</p>
								</div>
								<div className='flex gap-2 items-center'>
									<PhoneCall width={15} height={20} />
									<p>phone number</p>
								</div>
								<div className='flex gap-2 items-center'>
									<NotebookTabs width={20} height={20} />
									<p>address</p>
								</div>
							</CardContent>

							<CardFooter>
								{/* <SheetContent/> */}
								<Sheet>
									<SheetTrigger asChild>
										<Button variant='outline' className='w-80'>
											Edit
										</Button>
									</SheetTrigger>
									<SheetContent>
										<SheetHeader>
											<SheetTitle>Edit profile</SheetTitle>
											<SheetDescription>
												Update your Profile information
											</SheetDescription>
										</SheetHeader>
										<div className='grid w-full max-w-sm items-center gap-1.5 pt-2'>
											<Label htmlFor='email'>Email</Label>
											<Input type='email' id='email' placeholder='Email' />
										</div>
                                        <div className='grid w-full max-w-sm items-center gap-1.5 pt-2'>
											<Label htmlFor='email'>Email</Label>
											<Input type='email' id='email' placeholder='Email' />
										</div>
                                        <div className='grid w-full max-w-sm items-center gap-1.5 pt-2'>
											<Label htmlFor='email'>Email</Label>
											<Input type='email' id='email' placeholder='Email' />
										</div>
                                        <div className='grid w-full max-w-sm items-center gap-1.5 pt-2'>
											<Label htmlFor='email'>Email</Label>
											<Input type='email' id='email' placeholder='Email' />
										</div>
                                        <div className='grid w-full max-w-sm items-center gap-1.5 pt-2'>
											<Label htmlFor='email'>Email</Label>
											<Input type='email' id='email' placeholder='Email' />
										</div>
										<SheetFooter>
											<SheetClose asChild>
												<Button type='submit'>Save changes</Button>
											</SheetClose>
										</SheetFooter>
									</SheetContent>
								</Sheet>
							</CardFooter>
						</Card>
					
    </>
  );

  }

export default EditProfile;
