import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

const schema = yup.object().shape({
    fullname: yup.string().required('fullname is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    contactPhone: yup.string().required('Contact phone is required'),
    address: yup.string().required('Address is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), ''], 'Passwords do not match')
        .required('Confirm Password is required'),
});

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data: yup.InferType<typeof schema>) => {
        // Send data to the server
        console.log(data);
    };

    return (
        <Card className="mx-auto max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader>
                    <CardTitle className="text-xl">Register</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="fullname">Full name</Label>
                            <Input id="fullname" {...register('fullname')} placeholder="fullname" />
                            {errors.fullname && <span className="text-sm text-red-500">{errors.fullname.message}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...register('email')} placeholder="johndoe@example.com" />
                            {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="contactPhone">Contact Phone</Label>
                            <Input id="contactPhone" {...register('contactPhone')} placeholder="123-45-678" />
                            {errors.contactPhone && <span className="text-sm text-red-500">{errors.contactPhone.message}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" {...register('address')} placeholder="123, Main Street, New York" />
                            {errors.address && <span className="text-sm text-red-500">{errors.address.message}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" {...register('username')} placeholder="username" />
                            {errors.username && <span className="text-sm text-red-500">{errors.username.message}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" {...register('password')} placeholder="password" />
                            {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Re-enter Password</Label>
                            <Input id="confirmPassword" type="password" {...register('confirmPassword')} placeholder="Re-enter password" />
                            {errors.confirmPassword && <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>}
                        </div>
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                       
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        Click the login tab
                    </div>
                </CardContent>
            </form>
        </Card>
    );
}

export default SignUp