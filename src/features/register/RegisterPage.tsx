import { ArrowRight } from 'lucide-react'
import { useRegisterUserMutation } from './registerSlice'
import {SubmitHandler, useForm } from 'react-hook-form'
import { User } from './registerSlice'
import toast, { Toaster } from 'react-hot-toast'
import { Navigate, redirect } from 'react-router-dom'

const RegisterPage = () => {
  const {register,handleSubmit,formState:{errors}}= useForm<User>()

const [registerUser,{data,error,isLoading,isSuccess}] = useRegisterUserMutation()

  const handleRegister: SubmitHandler<User> = async(user: User) => {
    try {
      console.log(user)
      await registerUser(user)
    } catch (err) {   
      console.error(err)
    }
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (data)toast.success(data)

  if (error) {
    type Error = {
      status: number;
      data: string| unknown;
    };
    console.log(error)
    // const { status, data }= error as Error ;
    // status === 400 ? toast.error(`${data}`) : toast.error('An error occurred');
  }
  if(isSuccess){
    toast.success('User registered successfully')
    return <Navigate to='/login' replace={true}/>
  }
   

  return (
 
  <div className="flex justify-center">
     <Toaster/>
    <div className="w-96">
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && <span className="text-red-500 text-xs">Full Name is required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="contactPhone" className="block text-gray-700 text-sm font-bold mb-2">
                Contact Phone
              </label>
              <input
                type="text"
                id="contactPhone"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("contactPhone", { required: true })}
              />
              {errors.contactPhone && <span className="text-red-500 text-xs">Contact Phone is required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("address", { required: true })}
              />
              {errors.address && <span className="text-red-500 text-xs">Address is required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("username", { required: true })}
              />
              {errors.username && <span className="text-red-500 text-xs">Username is required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("password", { required: true })}
              />
              {errors.password && <span className="text-red-500 text-xs">Password is required</span>}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up <ArrowRight className="inline-block ml-1" size={16} />
            </button>
          </form>
          </div>
          <div>
        {/* display user details
        {data && (
          <div>
            <h2>User Details:</h2>
            <p>Full Name: {data.fullname}</p>
            <p>Email: {data.email}</p>
            <p>Contact Phone: {data.contactPhone}</p>
            <p>Address: {data.address}</p>
            <p>Username: {data.username}</p>
          </div>
        )} */}
      </div>
  </div>
  );
}

export default RegisterPage