
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAddLocationMutation, useGetLocationsQuery } from "@/features/locationsAndBranches/locBrancesAPI"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";


const BLSchema=yup.object().shape({
  name: yup.string().required("Name is required"),
  contact_phone: yup.string().required("Contact number is required"),
  address: yup.string().required("Address is required")
})


const BranchLocations = () => {
  const {register, handleSubmit, formState:{errors}} = useForm<yup.InferType<typeof BLSchema>>({
    resolver: yupResolver(BLSchema)
  })
  const {data:tbranches,isLoading} = useGetLocationsQuery()
  const [addLocation] = useAddLocationMutation()
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState({ key: "name", order: "asc" })
  const [page] = useState(1)
 
  const filteredBranches = useMemo(() => {
    if (!tbranches) {
      return [];
    }
    return tbranches
      .filter(
        (branch) =>
          (branch.location_id.toString().toLowerCase().includes(search.toLowerCase())) ||
          branch.name.toLowerCase().includes(search.toLowerCase()) ||
          branch.contact_phone.toLowerCase().includes(search.toLowerCase()) ||
          branch.address.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a:any, b:any) => {
        if (sort.order === "asc") {
          return a[sort.key] > b[sort.key] ? 1 : -1
        } else {
          return a[sort.key] < b[sort.key] ? 1 : -1
        }
      })
  }, [tbranches, search, sort])

  
  const handleAddBranch =async (data:yup.InferType<typeof BLSchema>) => {
   console.log(data)
   try {
      const res = await addLocation(data)
      console.log(res)
    
   } catch (error) {
    
   }
   
  }
  const itemsPerPage = 10
  // const totalPages = Math.ceil(filteredBranches.length / itemsPerPage)
  const currentItems = filteredBranches.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Branch Locations</h1>
        <Input
          placeholder="Search branches..."
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
                  setSort({ key: "location_id", order: sort.key === "location_id" ? (sort.order === "asc" ? "desc" : "asc") : "asc" })
                }
              >
                ID# {sort.key === "location_id" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() =>
                  setSort({
                    key: "name",
                    order: sort.key === "name" ? (sort.order === "asc" ? "desc" : "asc") : "asc",
                  })
                }
              >
                Name{" "}
                {sort.key === "name" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() =>
                  setSort({ key: "contact_phone", order: sort.key === "contact_phone" ? (sort.order === "asc" ? "desc" : "asc") : "asc" })
                }
              >
                City {sort.key === "contact_phone" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
              
              <TableHead
                className="cursor-pointer"
                onClick={() =>
                  setSort({ key: "address", order: sort.key === "address" ? (sort.order === "asc" ? "desc" : "asc") : "asc" })
                }
              >
                Adress {sort.key === "address" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? <TableRow ><TableCell  colSpan={4}>Loading...</TableCell></TableRow> :
            
            currentItems.map((branch) => (
              <TableRow key={branch.location_id}>
                <TableCell>{branch.location_id}</TableCell>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.contact_phone}</TableCell>
                <TableCell>{branch.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        {/* <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} /> */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Branch</CardTitle>
          </CardHeader>
            <form onSubmit={handleSubmit(handleAddBranch)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && errors.name.message}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact_phone">Contact Phone</Label>
              <Input id="contact_phone" {...register("contact_phone")} />
              {errors.contact_phone && errors.contact_phone.message}
                
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" {...register("address")} />
              {errors.address && errors.address.message}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" >Add Branch</Button>
          </CardFooter>
           </form>  
        </Card>
      </div>
    </div>
  )
}

export default BranchLocations





