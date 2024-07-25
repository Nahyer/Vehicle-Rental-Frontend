import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import Payments from "./Payments"
const Reports = () => {
  return (
    <Card>
    <CardHeader className="px-7">
      <CardTitle>Reports</CardTitle>
      <CardDescription>Overview of key business metrics.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="font-medium">Total Revenue</div>
          <div className="text-2xl font-bold">$1.2M</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="font-medium">Vehicles Rented</div>
          <div className="text-2xl font-bold">350</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="font-medium">Customer Satisfaction</div>
          <div className="text-2xl font-bold">4.8</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="font-medium">Reservations Completed</div>
          <div className="text-2xl font-bold">275</div>
        </div>
      </div>
    </CardContent>
    <Payments/>
  </Card>

  )
}

export default Reports