
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


const BranchLocations = () => {
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState({ key: "name", order: "asc" })
  const [page] = useState(1)
  const [branches, setBranches] = useState([
    {
      id: 1,
      name: "Downtown Branch",
      address: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
    },
    {
      id: 2,
      name: "Airport Branch",
      address: "456 Airport Rd",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
    },
    {
      id: 3,
      name: "Suburban Branch",
      address: "789 Oak Ln",
      city: "Chicago",
      state: "IL",
      zip: "60601",
    },
    {
      id: 4,
      name: "Coastal Branch",
      address: "321 Beach Blvd",
      city: "Miami",
      state: "FL",
      zip: "33101",
    },
    {
      id: 5,
      name: "Mountain Branch",
      address: "159 Ski Rd",
      city: "Denver",
      state: "CO",
      zip: "80201",
    },
    {
      id: 6,
      name: "Suburban Branch 2",
      address: "753 Maple Ave",
      city: "Houston",
      state: "TX",
      zip: "77001",
    },
    {
      id: 7,
      name: "Coastal Branch 2",
      address: "951 Ocean Dr",
      city: "Seattle",
      state: "WA",
      zip: "98101",
    },
    {
      id: 8,
      name: "Mountain Branch 2",
      address: "357 Slope Rd",
      city: "Salt Lake City",
      state: "UT",
      zip: "84101",
    },
  ])
  const filteredBranches = useMemo(() => {
    return branches
      .filter(
        (branch) =>
          branch.name.toLowerCase().includes(search.toLowerCase()) ||
          branch.address.toLowerCase().includes(search.toLowerCase()) ||
          branch.city.toLowerCase().includes(search.toLowerCase()) ||
          branch.state.toLowerCase().includes(search.toLowerCase()) ||
          branch.zip.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a:any, b:any) => {
        if (sort.order === "asc") {
          return a[sort.key] > b[sort.key] ? 1 : -1
        } else {
          return a[sort.key] < b[sort.key] ? 1 : -1
        }
      })
  }, [branches, search, sort])
  const [newBranch, setNewBranch] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  })
  
  const handleNewBranchChange = (field: string, value: string) => {
    setNewBranch({ ...newBranch, [field]: value })
  }
  const handleAddBranch = () => {
    const newId = branches.length + 1
    setBranches([...branches, { id: newId, ...newBranch }])
    setNewBranch({
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    })
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
                  setSort({ key: "name", order: sort.key === "name" ? (sort.order === "asc" ? "desc" : "asc") : "asc" })
                }
              >
                Name {sort.key === "name" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() =>
                  setSort({
                    key: "address",
                    order: sort.key === "address" ? (sort.order === "asc" ? "desc" : "asc") : "asc",
                  })
                }
              >
                Address{" "}
                {sort.key === "address" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() =>
                  setSort({ key: "city", order: sort.key === "city" ? (sort.order === "asc" ? "desc" : "asc") : "asc" })
                }
              >
                City {sort.key === "city" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() =>
                  setSort({
                    key: "state",
                    order: sort.key === "state" ? (sort.order === "asc" ? "desc" : "asc") : "asc",
                  })
                }
              >
                State{" "}
                {sort.key === "state" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() =>
                  setSort({ key: "zip", order: sort.key === "zip" ? (sort.order === "asc" ? "desc" : "asc") : "asc" })
                }
              >
                Zip {sort.key === "zip" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.address}</TableCell>
                <TableCell>{branch.city}</TableCell>
                <TableCell>{branch.state}</TableCell>
                <TableCell>{branch.zip}</TableCell>
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
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={newBranch.name} onChange={(e) => handleNewBranchChange("name", e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={newBranch.address}
                onChange={(e) => handleNewBranchChange("address", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" value={newBranch.city} onChange={(e) => handleNewBranchChange("city", e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={newBranch.state}
                onChange={(e) => handleNewBranchChange("state", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="zip">Zip</Label>
              <Input id="zip" value={newBranch.zip} onChange={(e) => handleNewBranchChange("zip", e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddBranch}>Add Branch</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default BranchLocations





