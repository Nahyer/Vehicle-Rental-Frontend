import { RootState } from "@/app/store";
import { useGetBookingByIdQuery } from "@/features/bookings/bookingsApi";
import { useSelector } from "react-redux";
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { paymentApi } from "@/features/payments/paymentApi";
import { useToast } from "@/components/ui/use-toast";



const BookingHistory = () => {
  const [checkOut] = paymentApi.useCheckOutMutation();
  const {toast} = useToast();

    const {user}= useSelector((state:RootState)=>state.session)
    if (!user) {
        return null
    }
    const id = user.user_id
    const { data: bookings, isLoading } = useGetBookingByIdQuery(id)
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState({ key: "booking_id", order: "asc" })
    const [page] = useState(1)
  
    const filteredBookings = useMemo(() => {


      if (!bookings) {
        return [];
      }
    //   const bookingsArray = [booking]; // Assuming the booking data is a single object
      return bookings
        .filter(
          (b) =>
            b.booking_id.toString().toLowerCase().includes(search.toLowerCase()) ||
            b.booking_status.toLowerCase().includes(search.toLowerCase()) ||
            b.vehicles.vehicleSpecs.manufacturer.toLowerCase().includes(search.toLowerCase()) ||
            b.vehicles.vehicleSpecs.model.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a:any, b:any) => {
          if (sort.order === "asc") {
            return a[sort.key] > b[sort.key] ? 1 : -1
          } else {
            return a[sort.key] < b[sort.key] ? 1 : -1
          }
        })
    }, [bookings, search, sort])
  
    const checkOuto = async(b:any) => {
      const key = 'pk_test_51PYWB7AfWaTAZW5WwrIU7cBSiAkB9EM4WS29c76ZfyHDHTL94jNC3IDRSsHfwxB72aQYW37a4abh00yYCxAtRmdB00751Xr5xF'

        console.log(b)
        try {
          toast({description:"Booking was successful"});
			const stripePromise = loadStripe(
				key
			);

			const stripe = await stripePromise;
			// const [{ booking_id }] = res.data || [];

			const payment = {
				amount: b.total_amount,
				bookingId: b.booking_id,
				vehicleSpecs: `${b.vehicles.vehicleSpecs.manufacturer} ${b.vehicles.vehicleSpecs.model}`,
			};
			const response = await checkOut(payment);
			console.log(response.data);
			const session = response.data;
			await stripe?.redirectToCheckout({ sessionId: session.id });
          
        } catch (error) {
          console.error(error)
          
        }


    }
    const itemsPerPage = 10
    const currentItems = filteredBookings.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    
    return (
      <div className="flex flex-col gap-8 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Booking History</h1>
          <Input
            placeholder="Search bookings..."
            className="max-w-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() =>
                    setSort({ key: "booking_id", order: sort.key === "booking_id" ? (sort.order === "asc" ? "desc" : "asc") : "asc" })
                  }
                >
                  Booking ID {sort.key === "booking_id" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() =>
                    setSort({
                      key: "booking_status",
                      order: sort.key === "booking_status" ? (sort.order === "asc" ? "desc" : "asc") : "asc",
                    })
                  }
                >
                  Status {sort.key === "booking_status" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() =>
                    setSort({ key: "manufacturer", order: sort.key === "manufacturer" ? (sort.order === "asc" ? "desc" : "asc") : "asc" })
                  }
                >
                  Manufacturer {sort.key === "manufacturer" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() =>
                    setSort({ key: "model", order: sort.key === "model" ? (sort.order === "asc" ? "desc" : "asc") : "asc" })
                  }
                >
                  Model {sort.key === "model" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableRow ><TableCell colSpan={4}>Loading...</TableCell></TableRow> :
                currentItems.map((b) => (
                  <TableRow key={b.booking_id}>
                    <TableCell>{b.booking_id}</TableCell>
                    <TableCell>{b.booking_status}</TableCell>
                    <TableCell>{b.vehicles.vehicleSpecs.manufacturer} {b.vehicles.vehicleSpecs.model}</TableCell>
                    <TableCell>{b.vehicles.vehicleSpecs.model}</TableCell>
                    <TableCell>
                    {b.booking_status === "completed" ?
                         null : <Button variant={"outline"} size="sm" className="mr-2" onClick={() => checkOuto(b)}>
                         Checkout
                     </Button>
                    }
                   

                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      
      </div>
    )
    };


export default BookingHistory

