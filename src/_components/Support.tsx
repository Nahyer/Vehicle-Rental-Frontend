import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSelector } from "react-redux"
import { RootState } from "@/app/store"
import { useAddcustomerSupportTicketsMutation } from "./api/customer_support_ticketsApi";

const categories = [
  { value: "vehicle_issues", label: "Vehicle Issues" },
  { value: "booking_issues", label: "Booking Issues" },
  { value: "pickup_dropoff_issues", label: "Pickup/Drop-off Issues" },
  { value: "account_membership", label: "Account and Membership" },
  { value: "billing_payments", label: "Billing and Payments" },
  { value: "general_inquiries", label: "General Inquiries" }
];

const TicxketShema = yup.object().shape({
  user_id: yup.number(),
  subject: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  status: yup.string()
})

const Support = () => {
  const [AddTicket] = useAddcustomerSupportTicketsMutation()
  const {user}= useSelector((state:RootState) => state.session)
  const form = useForm<yup.InferType<typeof TicxketShema>>({
    resolver: yupResolver(TicxketShema),
    defaultValues: {
      subject: "",
      description: "",
      status: "Open"
    }

  })
 
  const handleNewTicketSubmit = async(ticket:yup.InferType<typeof TicxketShema>) => {
    ticket.user_id = user?.user_id
    console.log("🚀 ~ handleNewTicketSubmit ~ ticket:", ticket)
    
    try{
     const res=  await AddTicket(ticket)
     console.log(res)
    }catch(error){
      console.log(error)
    }
    
  }
  
  return (
    <>
      <Card>
      <CardHeader>
        <CardTitle>Create New Ticket</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleNewTicketSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <FormField control={form.control}
             name="subject"
             render={({field}) =>(
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.label} value={category.value}>
                          {category.value}
                        </SelectItem>
                      ))}
                    </SelectContent>

                  </Select>
                  <FormMessage/>
              </FormItem>
              )}
            />

          </div>
          <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the issue..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please provide a detailed description of the issue you are experiencing.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button type="submit">Create Ticket</Button>
        </form>

        </Form>
       
      </CardContent>
        </Card> 
    </>
  )
}

export default Support