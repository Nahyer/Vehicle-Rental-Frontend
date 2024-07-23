import { useState, useMemo } from "react"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import { useGetcustomerSupportTicketsQuery } from "../api/customer_support_ticketsApi"
import { FilterIcon, ListOrderedIcon, StarIcon } from "lucide-react"


const ManageTickets = () => {
  

  const { data: ticketsData, isLoading} =  useGetcustomerSupportTicketsQuery()
  console.log("🚀 ~ ManageTickets ~ data:", ticketsData)

  const [searchText, setSearchText] = useState("")
  const [sortField, setSortField] = useState("id")
  const [sortDirection, setSortDirection] = useState("asc")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredTickets = useMemo(() => {
   let filtered =  ticketsData ? [...ticketsData] : []
    if (searchText) {
      filtered && filtered.filter(
        (ticket) =>
          ticket.users.full_name.toLowerCase().includes(searchText.toLowerCase()) ||
          ticket.subject.toLowerCase().includes(searchText.toLowerCase()),
      )
    }
    if (filterStatus !== "all") {
      filtered && filtered.filter((ticket) => ticket.status === filterStatus)
    }

    return filtered?.sort((a: any, b: any) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [ticketsData, searchText, sortField, sortDirection, filterStatus])

  const totalTickets = ticketsData?.length
  const openTickets = ticketsData?.filter((ticket) => ticket.status === "Open").length
  const closedTickets = ticketsData?.filter((ticket) => ticket.status === "Closed").length
  const averageResolutionTime = 2.5

  return (
      <main className="flex-1 grid grid-cols-[1fr_300px] gap-8 ">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Input
              type="search"
              placeholder="Search tickets..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <FilterIcon className="w-5 h-5" />
                  <span className="sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filterStatus === "all"}
                  onCheckedChange={() => setFilterStatus("all")}
                >
                  All
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterStatus === "Open"}
                  onCheckedChange={() => setFilterStatus("Open")}
                >
                  Open
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterStatus === "Closed"}
                  onCheckedChange={() => setFilterStatus("Closed")}
                >
                  Closed
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <ListOrderedIcon className="w-5 h-5" />
                  <span className="sr-only">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sortField} onValueChange={(value) => setSortField(value)}>
                  <DropdownMenuRadioItem value="id">Ticket Number</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="customerName">Customer Name</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sortDirection} onValueChange={(value) => setSortDirection(value)}>
                  <DropdownMenuRadioItem value="asc">Ascending</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="desc">Descending</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Manage Tickets</CardTitle>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                  </TableRow>
                ):(

                filteredTickets ? filteredTickets?.map((ticket) => (
                  <TableRow key={ticket.ticket_id}>
                    <TableCell className="font-medium">{ticket.ticket_id}</TableCell>
                    <TableCell>{ticket.users.full_name}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      <Badge variant={ticket.status === "Open" ? "secondary" : "destructive"}>{ticket.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="mr-2">
                        View
                      </Button>
                      <Button variant={ticket.status === "Open" ? "secondary" : "destructive"} size="sm" className="mr-2">
                        {ticket.status === "Open" ? "Update" : "Close"}
                      </Button>
                    </TableCell>
                  </TableRow>
                )) :
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No tickets found</TableCell>
                  </TableRow>
                )
                }
              </TableBody>
            </Table>
          </Card>
         
        </div>
        <div className="flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-start gap-1">
                  <span className="text-2xl font-bold">{totalTickets}</span>
                  <span className="text-muted-foreground">Total Tickets</span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-2xl font-bold">{openTickets}</span>
                  <span className="text-muted-foreground">Open Tickets</span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-2xl font-bold">{closedTickets}</span>
                  <span className="text-muted-foreground">Closed Tickets</span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-2xl font-bold">{averageResolutionTime} days</span>
                  <span className="text-muted-foreground">Average Resolution Time</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Customer Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-4xl font-bold">
                  4.8
                  <StarIcon className="w-6 h-6 fill-primary" />
                </div>
                <p className="text-muted-foreground">Based on 250 customer reviews</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
   
  )
}

export default ManageTickets



