import { useState, useMemo, SetStateAction } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

import { TUsers, useGetusersQuery } from "../api/users"


import { FilterIcon, MoveHorizontalIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


const ManageUsers = () => {
  

  // const [search, setSearch] = useState("")

  // const [roleFilter, setRoleFilter] = useState("")

  // const [selectedUsers, setSelectedUsers] = useState<number[]>([])

 

  // const [editUser, setEditUser] = useState<Partial<TUsers>>({})
  // const [addUser, setAddUser] = useState<Partial<TUsers>>({})
  const { data: users, error} = useGetusersQuery()
  // const [deleteUser] = useDeleteusersMutation()
  // const [updateUser] = useUpdateusersMutation()
  // const [addUsers] = useAddusersMutation()

  // const filteredUsers = useMemo(() => {
  //   if (!users) {
  //     return []
  //   }
  //   return users
  //     .filter(
  //       (user) =>
  //         user.full_name.toLowerCase().includes(search.toLowerCase()) ||
  //         user.email.toLowerCase().includes(search.toLowerCase())
  //     )
  //     .filter((user) => (roleFilter ? user.role === roleFilter : true))
  //     .sort((a, b) => {
  //       if (sort.order === "asc") {
  //         return a[sort.key] > b[sort.key] ? 1 : -1
  //       } else {
  //         return a[sort.key] < b[sort.key] ? 1 : -1
  //       }
  //     })
  // }, [users, search, roleFilter, sort])
  if (error) {
  console.log("🚀 ~ ManageUsers ~ error:", error)
  }

  // const handleDelete = async () => {
  //   await deleteUser(selectedUsers)
  //   setSelectedUsers([])
  //   setShowDeleteModal(false)
  //   refetch()
  // }
  // const handleUpdate = async (data: Partial<TUsers>) => {
  //   await updateUser(data)
  //   setShowEditModal(false)
  //   refetch()
  // }


  // const handleAdd = async (data: Partial<TUsers>) => {
  //   try {
      
  //     await addUsers(data)
  
  //     refetch()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  // const handleSelectAll = (checked: boolean) => {
  //   if (checked) {
  //     setSelectedUsers(users?.map((user) => user.user_id) || [])
  //   } else {
  //     setSelectedUsers([])
  //   }
  // }
  return (
    <div>
     
          <Component customers={users ?? []}/>

    </div>
  )

}

export default ManageUsers




 function Component({customers}: {customers: TUsers[]}) {
  // const [users] = useState([
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "john@example.com",
  //     phone: "555-1234",
  //     rentals: 5 ,
  //     active: true,
  //   },
    
  // ])
  // const [users, setUsers] = useState([
  //   {
  //     id: 1,
  //     name: "Admin User",
  //     email: "admin@example.com",
  //     role: "admin",
  //     active: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Regular User",
  //     email: "user@example.com",
  //     role: "user",
  //     active: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Deactivated User",
  //     email: "deactivated@example.com",
  //     role: "user",
  //     active: false,
  //   },
  // ])

  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const filteredCustomers = useMemo(() => {
    return customers
      .filter((customer) => customer.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a:any, b:any) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
        if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
        return 0
      })
  }, [customers, searchTerm, sortColumn, sortDirection])
  const handleSort = (column: SetStateAction<string>) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }
  // const [newUser, setNewUser] = useState({
  //   name: "",
  //   email: "",
  //   role: "user",
  //   active: true,
  // })

  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [currentUserDetails, setCurrentUserDetails] = useState(null)
  // const userDetails = {
  //   name: "John Doe",
  //   email: "john.doe@example.com",
  //   role: "User",
  //   // Add other necessary details
  // };


 
  return (
    <div className="flex flex-col h-screen">
      
      <main className="flex-1 bg-muted/40 p-6">
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Customers</h2>
              <div className="flex items-center gap-2">
                <Input
                  type="search"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-background px-4 py-2 rounded-md"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <FilterIcon className="w-5 h-5" />
                      <span className="sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={sortColumn} onValueChange={handleSort}>
                      <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="email">Email</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="phone">Phone</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.user_id}>
                    <TableCell>{customer.full_name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.contact_phone}</TableCell>
                    
                    
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoveHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <ul>
                            <li><Edit data={customer}/></li>
                            <li><View data={customer}/></li>
                            
                          </ul>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
          </div>
          {/* <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">admins</h2>
             
            </div>
            <div className="grid gap-4">
             
              
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge variant={user.active ? "secondary" : "outline"} className="px-2 py-1 rounded-md">
                        {user.active ? "Active" : "Deactivated"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => handleUserDeactivate(user.id)}>
                        <PowerOffIcon className="w-5 h-5" />
                        <span className="sr-only">{user.active ? "Deactivate" : "Activate"}</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div> */}
        </div>
      </main>
    </div>
  )
}

function Edit({data}:any) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Name
            </Label>
            <Input id="username" defaultValue={data.name} placeholder={data.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue={data.username} className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

// function SheetDem({ mode = 'view', data }: { mode: string, data: any }) {
//   const isEditMode = mode === 'edit';

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="link">Open</Button>
//       </SheetTrigger>
//       <SheetContent>
//         <SheetHeader>
//           <SheetTitle>{isEditMode ? 'Edit profile' : 'View profile'}</SheetTitle>
//           <SheetDescription>
//             {isEditMode ? 'Make changes to your profile here. Click save when you\'re done.' : 'View the details of your profile.'}
//           </SheetDescription>
//         </SheetHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Name
//             </Label>
//             {isEditMode ? (
//               <Input id="name" defaultValue={data.name} className="col-span-3" />
//             ) : (
//               <p className="col-span-3">{data.name}</p>
//             )}
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="username" className="text-right">
//               Username
//             </Label>
//             {isEditMode ? (
//               <Input id="username" defaultValue={data.username} className="col-span-3" />
//             ) : (
//               <p className="col-span-3">{data.username}</p>
//             )}
//           </div>
//         </div>
//         {isEditMode && (
//           <SheetFooter>
//             <SheetClose asChild>
//               <Button type="submit">Save changes</Button>
//             </SheetClose>
//           </SheetFooter>
//         )}
//       </SheetContent>
//     </Sheet>
//   );
// }

function View({ data }: { data: any }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>View profile</SheetTitle>
          <SheetDescription>View the details of your profile.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <p className="col-span-3">{data.name}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <p className="col-span-3">{data.username}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

