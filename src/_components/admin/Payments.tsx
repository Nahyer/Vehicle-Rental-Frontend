import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

import {  ListOrderedIcon, } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface Payment {
  payment_id: string;
  booking_id: string;
  amount: number;
  payment_status: string;
  payment_date: string;
  payment_method: string
  transaction_id: string;
}

interface Sort {
  key: keyof Payment;
  order: "asc" | "desc";
}

interface Filters {
  payment_status: Payment["payment_status"][];
  payment_method: Payment["payment_method"][];
}

export  const Payments = () =>{
  const [search, setSearch] = useState<string>("")
  const [sort, setSort] = useState<Sort>({ key: "payment_id", order: "asc" })
  const [filters, setFilters] = useState<Filters>({
    payment_status: [],
    payment_method: [],
  })

  const payments = useMemo<Payment[]>(() => {
    return [
      {
        payment_id: "PAY001",
        booking_id: "BOOK001",
        amount: 150.0,
        payment_status: "Successful",
        payment_date: "2023-05-01",
        payment_method: "Credit Card",
        transaction_id: "TX001",
      },
      {
        payment_id: "PAY002",
        booking_id: "BOOK002",
        amount: 75.0,
        payment_status: "Failed",
        payment_date: "2023-05-02",
        payment_method: "PayPal",
        transaction_id: "TX002",
      },
      {
        payment_id: "PAY003",
        booking_id: "BOOK003",
        amount: 250.0,
        payment_status: "Successful",
        payment_date: "2023-05-03",
        payment_method: "Credit Card",
        transaction_id: "TX003",
      },
      {
        payment_id: "PAY004",
        booking_id: "BOOK004",
        amount: 100.0,
        payment_status: "Successful",
        payment_date: "2023-05-04",
        payment_method: "Bank Transfer",
        transaction_id: "TX004",
      },
      {
        payment_id: "PAY005",
        booking_id: "BOOK005",
        amount: 200.0,
        payment_status: "Failed",
        payment_date: "2023-05-05",
        payment_method: "Credit Card",
        transaction_id: "TX005",
      },
    ]
      .filter((payment) => {
        const searchValue = search.toLowerCase()
        return (
          payment.payment_id.toLowerCase().includes(searchValue) ||
          payment.booking_id.toLowerCase().includes(searchValue) ||
          payment.amount.toString().toLowerCase().includes(searchValue) ||
          payment.payment_status.toLowerCase().includes(searchValue) ||
          payment.payment_date.toLowerCase().includes(searchValue) ||
          payment.payment_method.toLowerCase().includes(searchValue) ||
          payment.transaction_id.toLowerCase().includes(searchValue)
        )
      })
      .filter((payment) => {
        if (filters.payment_status.length > 0) {
          return filters.payment_status.includes(payment.payment_status as "Successful" | "Failed")
        }
        return true
      })
      .filter((payment) => {
        if (filters.payment_method.length > 0) {
          return filters.payment_method.includes(payment.payment_method as "Credit Card" | "PayPal" | "Bank Transfer")
        }
        return true
      })
      .sort((a, b) => {
        if (sort.order === "asc") {
          return a[sort.key] > b[sort.key] ? 1 : -1
        } else {
          return a[sort.key] < b[sort.key] ? 1 : -1
        }
      })
  }, [search, sort, filters])

  const handleFilterChange = (type: keyof Filters, value: string) => {
    setFilters((prev) => {
      const current = prev[type] as string[]
      return {
        ...prev,
        [type]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      }
    })
  }

  const totalAmount = useMemo<number>(() => {
    return payments.reduce((acc, payment) => acc + payment.amount, 0)
  }, [payments])

  const successfulPayments = useMemo<Payment[]>(() => {
    return payments.filter((payment) => payment.payment_status === "Successful")
  }, [payments])

  const failedPayments = useMemo<Payment[]>(() => {
    return payments.filter((payment) => payment.payment_status === "Failed")
  }, [payments])

  const paymentMethodBreakdown = useMemo<{ [key in Payment["payment_method"]]: { count: number, amount: number } }>(() => {
    return payments.reduce((acc, payment) => {
      if (acc[payment.payment_method]) {
        acc[payment.payment_method].count += 1
        acc[payment.payment_method].amount += payment.amount
      } else {
        acc[payment.payment_method] = {
          count: 1,
          amount: payment.amount,
        }
      }
      return acc
    }, {} as { [key in Payment["payment_method"]]: { count: number, amount: number } })
  }, [payments])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Payment Tracking</h1>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search payments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white dark:bg-gray-950"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ListOrderedIcon className="w-4 h-4" />
                Sort by: {sort.key}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="end">
              <DropdownMenuRadioGroup value={sort.key} onValueChange={(key) => setSort({ key: key as keyof Payment, order: "asc" })}>
                <DropdownMenuRadioItem value="payment_id">Payment ID</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="booking_id">Booking ID</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="amount">Amount</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="payment_status">Payment Status</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="payment_date">Payment Date</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="payment_method">Payment Method</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="transaction_id">Transaction ID</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Amount Paid</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">${totalAmount.toFixed(2)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Successful Payments</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">{successfulPayments.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Failed Payments</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">{failedPayments.length}</CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Payment Method Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(paymentMethodBreakdown).map(([method, data]) => (
                <div key={method} className="flex flex-col items-start">
                  <div className="font-medium">{method}</div>
                  <div className="text-muted-foreground">
                    {data.count} payments, ${data.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <Label className="mb-2 font-medium">Payment Status</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={filters.payment_status.includes("Successful")}
                      onCheckedChange={() => handleFilterChange("payment_status", "Successful")}
                    />
                    Successful
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={filters.payment_status.includes("Failed")}
                      onCheckedChange={() => handleFilterChange("payment_status", "Failed")}
                    />
                    Failed
                  </Label>
                </div>
              </div>
              <div>
                <Label className="mb-2 font-medium">Payment Method</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={filters.payment_method.includes("Credit Card")}
                      onCheckedChange={() => handleFilterChange("payment_method", "Credit Card")}
                    />
                    Credit Card
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={filters.payment_method.includes("PayPal")}
                      onCheckedChange={() => handleFilterChange("payment_method", "PayPal")}
                    />
                    PayPal
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={filters.payment_method.includes("Bank Transfer")}
                      onCheckedChange={() => handleFilterChange("payment_method", "Bank Transfer")}
                    />
                    Bank Transfer
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() =>
                    setSort({
                      key: "payment_id",
                      order: sort.key === "payment_id" ? (sort.order === "asc" ? "desc" : "asc") : "asc",
                    })
                  }
                >
                  Payment ID
                  {sort.key === "payment_id" && (
                    <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() =>
                    setSort({
                      key: "booking_id",
                      order: sort.key === "booking_id" ? (sort.order === "asc" ? "desc" : "asc") : "asc",
                    })
                  }
                >
                  Booking ID
                  {sort.key === "booking_id" && (
                    <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() =>
                    setSort({
                      key: "amount",
                      order: sort.key === "amount" ? (sort.order === "asc" ? "desc" : "asc") : "asc",
                    })
                  }
                >
                  Amount
                  {sort.key === "amount" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() =>
                    setSort({
                      key: "payment_status",
                      order: sort.key === "payment_status" ? (sort.order === "asc" ? "desc" : "asc") : "asc",
                    })
                  }
                >
                  Payment Status
                  {sort.key === "payment_status" && (
                    <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() =>
                    setSort({
                      key: "payment_date",
                      order: sort.key === "payment_date" ? (sort.order === "asc" ? "desc" : "asc") : "asc",
                    })
                  }
                >
                  Payment Date
                  {sort.key === "payment_date" && (
                    <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() =>
                    setSort({
                      key: "payment_method",
                      order: sort.key === "payment_method" ? (sort.order === "asc" ? "desc" : "asc") : "asc",
                    })
                  }
                >
                  Payment Method
                  {sort.key === "payment_method" && (
                    <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() =>
                    setSort({
                      key: "transaction_id",
                      order: sort.key === "transaction_id" ? (sort.order === "asc" ? "desc" : "asc") : "asc",
                    })
                  }
                >
                  Transaction ID
                  {sort.key === "transaction_id" && (
                    <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>
                  )}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.payment_id}>
                  <TableCell>{payment.payment_id}</TableCell>
                  <TableCell>{payment.booking_id}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={payment.payment_status === "Successful" ? "secondary" : "outline"}>
                      {payment.payment_status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.payment_date}</TableCell>
                  <TableCell>{payment.payment_method}</TableCell>
                  <TableCell>{payment.transaction_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Payments


