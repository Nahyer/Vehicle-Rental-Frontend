import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useLoginUserMutation } from './loginApi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { logSession } from './sessionSlice'
import { Navigate } from 'react-router-dom'

import UserLogin from '../../_components/customer/UserLogin'
import AdminLogin from '../../_components/admin/AdminLogin '


type FormValues = {
  username:string,
  password:string
}

const Login = () => {
  const {user} = useSelector((state:RootState) => state.session)
  const [loginUser, {data, error, isLoading}] = useLoginUserMutation()
  const { register, handleSubmit, formState:{errors} } = useForm<FormValues>()
  const dispatch = useDispatch()

  if (user) return <Navigate to='/dashboard' replace={true}/>

  const onsubmit = async(creds:FormValues) => {
    console.log(creds)
    const res = await loginUser(creds)
    console.log(res.data)
    if (res.error) {
      console.log(res.error)
    }
    if (res.data) {
      dispatch(logSession(res.data))
    }
  }


  if(isLoading){
    return <div>Loading...</div>
  }
  if(data){
    console.log(data)
  }

  if(error){
    console.log(error)
  }

  return (
    <>
    <div className="flex justify-center">
      <div className="w-96">
        <form onSubmit={handleSubmit(onsubmit)}>
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
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login <ArrowRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login


{/* <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">Vehicle Rental Login</h1>
        <div className="flex flex-col mb-4">
          <label for="userType" className="text-sm font-medium mb-2 block">User Type:</label>
          <div className="flex items-center space-x-4">
            <input type="radio" id="user" name="userType" value="user" className="mr-2" defaultChecked />
            <label for="user">User Login</label>
            <input type="radio" id="admin" name="userType" value="admin" className="mr-2" />
            <label for="admin">Admin Login</label>
          </div>
        </div>
        {/* Conditionally render UserLogin or AdminLogin component based on selected userType */}
        // {(document.querySelector('#user') as HTMLInputElement)?.checked && <UserLogin />}
        // {(document.querySelector('#admin')as HTMLInputElement)?.checked && <AdminLogin />}
    //   </div>
    // </div> */}