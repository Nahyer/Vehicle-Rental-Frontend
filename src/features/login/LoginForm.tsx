
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "./loginApi";
import { useDispatch} from "react-redux";
import { logSession } from "./sessionSlice";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast";



export interface FormValues {
	username: string;
	password: string;
};
function LoginForm() {
	const [loginUser, { data, error, isLoading }] = useLoginUserMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();

	const dispatch = useDispatch();
	const {toast} = useToast()

	const onsubmit = async (creds: FormValues) => {
		console.log(creds);
		const res = await loginUser(creds);
		console.log(res.data);
		if (res.error) {
			console.log(res.error);
			toast({
				description: "Something wrong happened. Couldn't log you in"
			})
		}
		if (res.data) {
			dispatch(logSession(res.data));
		}
	};

	if (data) {
		console.log(data);
	}

	if (error) {
		console.log(error);
	}

	return (
		<Card className='w-full max-w-sm'>
			<form onSubmit={handleSubmit(onsubmit)}>
				<CardHeader>
					<CardTitle className='text-2xl'>Login</CardTitle>
					<CardDescription>
						Enter your username below to login to your account.
					</CardDescription>
				</CardHeader>
				<CardContent className='grid gap-4'>
					<div className='grid gap-2'>
						<Label htmlFor='username'>Username</Label>
						<Input
							type='text'
							id='username'
							placeholder='username'
							{...register("username", { required: true })}
						/>
						{errors.username && (
							<span className='text-red-500 text-xs'>Username is required</span>
						)}
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='password'>Password</Label>
						{/* <Link href='#' className='ml-auto inline-block text-sm underline'>
								Forgot your password?
							</Link> */}
						<Input
							id='password'
							type='password'
							placeholder='password'
							{...register("password", { required: true })}
						/>
						{errors.password && (
							<span className='text-red-500 text-xs'>Password is required</span>
						)}
					</div>
					{isLoading ? (
						<ButtonLoading name={'pleasewait'}/>
					) : (
						<Button type='submit' className='w-full'>
							Login
						</Button>
					)}
					
					<div className='mt-4 text-center text-sm'>
						Don&apos;t have an account? <span>Click the register tab</span>
					</div>
				</CardContent>
			</form>
		</Card>
	);
}
export default LoginForm;



export function ButtonLoading({name}: {name: string}) {
	return (
	  <Button disabled>
		<Loader2 className="mr-2 h-4 w-4 animate-spin" />
		{name}
	  </Button>
	)
  }