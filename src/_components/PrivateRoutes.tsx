import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { Navigate, Outlet } from "react-router-dom"



const PrivateRoutes = ({children}) => {
  const{user:authuser} = useSelector((x: RootState) => x.session)
  if (!authuser){
    return <Navigate to="/login"  />
  }

  return children
}

export default PrivateRoutes