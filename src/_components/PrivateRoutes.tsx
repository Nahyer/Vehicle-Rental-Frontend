import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { Navigate } from "react-router-dom"



const PrivateRoutes = ({children}:any) => {
  const{user:authuser} = useSelector((x: RootState) => x.session)
  if (!authuser){
    return <Navigate to="/"  />
  }

  return children
}

export default PrivateRoutes