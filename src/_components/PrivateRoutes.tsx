import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { useToast } from "@/components/ui/use-toast"


const PrivateRoutes = ({children}:any) => {
  const{user:authuser} = useSelector((x: RootState) => x.session)
  const {toast} = useToast()

  if (!authuser){

    toast({
      description: "You need to be logged in to access this page",
    })

    return null
   
  }

  return children
}

export default PrivateRoutes