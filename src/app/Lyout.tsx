import { Toaster } from "@/components/ui/toaster"
import { Outlet } from "react-router-dom"

// export default function RootLayout() {
//   return (
//     <div>
//         <div><Outlet/></div>
//         <Toaster />
//     </div>
     
//   )
// }



const Lyout = () => {
  return (
    <div>
        <Toaster />
        <div><Outlet/></div>
    </div>
  )
}

export default Lyout
