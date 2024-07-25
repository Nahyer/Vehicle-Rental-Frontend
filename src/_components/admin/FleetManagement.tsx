import { useState, useMemo, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface Vehicle {
  vehicle_id: string;
  acquisition_date: string;
  depreciation_rate: number;
  current_value: number;
  maintenance_cost: number;
  status: "Active" | "Retired";
}

const FleetManagement = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      vehicle_id: "VEH001",
      acquisition_date: "2020-01-01",
      depreciation_rate: 0.2,
      current_value: 50000,
      maintenance_cost: 1000,
      status: "Active",
    },
    {
      vehicle_id: "VEH002",
      acquisition_date: "2021-03-15",
      depreciation_rate: 0.15,
      current_value: 35000,
      maintenance_cost: 800,
      status: "Active",
    },
    {
      vehicle_id: "VEH003",
      acquisition_date: "2019-07-01",
      depreciation_rate: 0.25,
      current_value: 20000,
      maintenance_cost: 1500,
      status: "Retired",
    },
    {
      vehicle_id: "VEH004",
      acquisition_date: "2022-09-01",
      depreciation_rate: 0.18,
      current_value: 45000,
      maintenance_cost: 900,
      status: "Active",
    },
    {
      vehicle_id: "VEH005",
      acquisition_date: "2018-11-01",
      depreciation_rate: 0.22,
      current_value: 15000,
      maintenance_cost: 1200,
      status: "Retired",
    },
  ]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ key: keyof Vehicle, order: "asc" | "desc" }>({ key: "vehicle_id", order: "asc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [showUpdateSheet, setShowUpdateSheet] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleSort = (key: keyof Vehicle) => {
    if (sort.key === key) {
      setSort({ key, order: sort.order === "asc" ? "desc" : "asc" });
    } else {
      setSort({ key, order: "asc" });
    }
  };
  const handlePageChange = (page: number) => setPage(page);
  const handlePageSizeChange = (size: number) => setPageSize(size);
  const handleCreateVehicle = () => {
    setSelectedVehicle(null);
    setShowCreateSheet(true);
  };
  const handleUpdateVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowUpdateSheet(true);
  };
  const handleDeleteVehicle = (vehicle_id: string) => {
    setVehicles(vehicles.filter((v) => v.vehicle_id !== vehicle_id));
  };
  const handleSaveVehicle = (vehicle: Vehicle) => {
    if (selectedVehicle) {
      setVehicles(vehicles.map((v) => (v.vehicle_id === vehicle.vehicle_id ? vehicle : v)));
    } else {
      setVehicles([...vehicles, vehicle]);
    }
    setShowCreateSheet(false);
    setShowUpdateSheet(false);
    setSelectedVehicle(null);
  };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      return Object.values(vehicle).some((value) => value.toString().toLowerCase().includes(search.toLowerCase()));
    });
  }, [vehicles, search]);

  const sortedVehicles = useMemo(() => {
    return filteredVehicles.sort((a, b) => {
      if (sort.order === "asc") {
        return a[sort.key] > b[sort.key] ? 1 : -1;
      } else {
        return a[sort.key] < b[sort.key] ? 1 : -1;
      }
    });
  }, [filteredVehicles, sort]);

  const paginatedVehicles = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedVehicles.slice(startIndex, endIndex);
  }, [sortedVehicles, page, pageSize]);

  return (
    <div className="flex flex-col h-full">
      <header className="bg-background p-4 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Fleet Management</h1>
          <div className="flex items-center gap-4">
            <Button onClick={handleCreateVehicle}>Create Vehicle</Button>
          </div>
        </div>
      </header>
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex items-center mb-4 gap-4">
          <div className="relative flex-1">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search vehicles..."
              className="pl-8 w-full"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>
                <Checkbox checked />
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                <Checkbox checked={false} />
                Retired
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("vehicle_id")}>
                Vehicle ID
                {sort.key === "vehicle_id" && (
                  <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>
                )}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("acquisition_date")}>
                Acquisition Date
                {sort.key === "acquisition_date" && (
                  <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>
                )}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("depreciation_rate")}>
                Depreciation Rate
                {sort.key === "depreciation_rate" && (
                  <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>
                )}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("current_value")}>
                Current Value
                {sort.key === "current_value" && (
                  <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>
                )}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("maintenance_cost")}>
                Maintenance Cost
                {sort.key === "maintenance_cost" && (
                  <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>
                )}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                Status
                {sort.key === "status" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedVehicles.map((vehicle) => (
              <TableRow key={vehicle.vehicle_id}>
                <TableCell>{vehicle.vehicle_id}</TableCell>
                <TableCell>{vehicle.acquisition_date}</TableCell>
                <TableCell>{vehicle.depreciation_rate * 100}%</TableCell>
                <TableCell>${vehicle.current_value.toLocaleString()}</TableCell>
                <TableCell>${vehicle.maintenance_cost.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={vehicle.status === "Active" ? "secondary" : "outline"}>{vehicle.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleUpdateVehicle(vehicle)}>
                      Edit
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteVehicle(vehicle.vehicle_id)}>
                      Delete
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between mt-4">
          {/* <Pagination
            totalPages={Math.ceil(filteredVehicles.length / pageSize)}
            onPageChange={handlePageChange}
          /> */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                {pageSize} Rows
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Rows per page</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={pageSize} onValueChange={(value) => handlePageSizeChange(Number(value))}>
                <DropdownMenuRadioItem value={10}>10</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={20}>20</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={50}>50</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={100}>100</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>
      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Create Vehicle</SheetTitle>
            <SheetDescription>Enter the details of the new vehicle.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicle_id" className="text-right">
                Vehicle ID
              </Label>
              <Input id="vehicle_id" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="acquisition_date" className="text-right">
                Acquisition Date
              </Label>
              <Input id="acquisition_date" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="depreciation_rate" className="text-right">
                Depreciation Rate
              </Label>
              <Input id="depreciation_rate" type="number" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current_value" className="text-right">
                Current Value
              </Label>
              <Input id="current_value" type="number" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maintenance_cost" className="text-right">
                Maintenance Cost
              </Label>
              <Input id="maintenance_cost" type="number" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <select id="status" className="col-span-3">
                <option value="Active">Active</option>
                <option value="Retired">Retired</option>
              </select>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  const formData: Vehicle = {
                    vehicle_id: (document.getElementById("vehicle_id") as HTMLInputElement).value,
                    acquisition_date: (document.getElementById("acquisition_date") as HTMLInputElement).value,
                    depreciation_rate: parseFloat((document.getElementById("depreciation_rate") as HTMLInputElement).value),
                    current_value: parseFloat((document.getElementById("current_value") as HTMLInputElement).value),
                    maintenance_cost: parseFloat((document.getElementById("maintenance_cost") as HTMLInputElement).value),
                    status: (document.getElementById("status") as HTMLSelectElement).value as "Active" | "Retired",
                  };
                  handleSaveVehicle(formData);
                }}
              >
                Save Vehicle
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Sheet open={showUpdateSheet} onOpenChange={setShowUpdateSheet}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Update Vehicle</SheetTitle>
            <SheetDescription>Edit the details of the selected vehicle.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicle_id" className="text-right">
                Vehicle ID
              </Label>
              <Input id="vehicle_id" defaultValue={selectedVehicle?.vehicle_id} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="acquisition_date" className="text-right">
                Acquisition Date
              </Label>
              <Input
                id="acquisition_date"
                type="date"
                defaultValue={selectedVehicle?.acquisition_date}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="depreciation_rate" className="text-right">
                Depreciation Rate
              </Label>
              <Input id="depreciation_rate" type="number" defaultValue={selectedVehicle?.depreciation_rate.toString()} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current_value" className="text-right">
                Current Value
              </Label>
              <Input id="current_value" type="number" defaultValue={selectedVehicle?.current_value.toString()} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maintenance_cost" className="text-right">
                Maintenance Cost
              </Label>
              <Input id="maintenance_cost" type="number" defaultValue={selectedVehicle?.maintenance_cost.toString()} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <select id="status" defaultValue={selectedVehicle?.status} className="col-span-3">
                <option value="Active">Active</option>
                <option value="Retired">Retired</option>
              </select>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (!selectedVehicle) return;
                  const updatedVehicle: Vehicle = {
                    vehicle_id: (document.getElementById("vehicle_id") as HTMLInputElement).value,
                    acquisition_date: (document.getElementById("acquisition_date") as HTMLInputElement).value,
                    depreciation_rate: parseFloat((document.getElementById("depreciation_rate") as HTMLInputElement).value),
                    current_value: parseFloat((document.getElementById("current_value") as HTMLInputElement).value),
                    maintenance_cost: parseFloat((document.getElementById("maintenance_cost") as HTMLInputElement).value),
                    status: (document.getElementById("status") as HTMLSelectElement).value as "Active" | "Retired",
                  };
                  handleSaveVehicle(updatedVehicle);
                }}
              >
                Save Changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FleetManagement;
