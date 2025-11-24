import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const payments = [
  { id: 1, user: "Sarah Johnson", amount: "$49.99", planType: "Premium", date: "Nov 24, 2025", status: "Completed" },
  { id: 2, user: "Michael Chen", amount: "$19.99", planType: "Basic", date: "Nov 24, 2025", status: "Completed" },
  { id: 3, user: "Emily Davis", amount: "$49.99", planType: "Premium", date: "Nov 23, 2025", status: "Completed" },
  { id: 4, user: "James Wilson", amount: "$29.99", planType: "Standard", date: "Nov 23, 2025", status: "Pending" },
  { id: 5, user: "Lisa Anderson", amount: "$49.99", planType: "Premium", date: "Nov 23, 2025", status: "Completed" },
  { id: 6, user: "David Martinez", amount: "$19.99", planType: "Basic", date: "Nov 22, 2025", status: "Completed" },
  { id: 7, user: "Jennifer Taylor", amount: "$29.99", planType: "Standard", date: "Nov 22, 2025", status: "Failed" },
  { id: 8, user: "Robert Brown", amount: "$49.99", planType: "Premium", date: "Nov 21, 2025", status: "Completed" },
];

export function Payments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900 mb-1">Payments</h2>
          <p className="text-slate-500">View and manage all payment transactions.</p>
        </div>
        <Button variant="outline" className="hidden md:flex">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <p className="text-slate-500 mb-1">Today's Revenue</p>
            <p className="text-slate-900">$12,458</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <p className="text-slate-500 mb-1">This Month</p>
            <p className="text-slate-900">$284,562</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <p className="text-slate-500 mb-1">Pending</p>
            <p className="text-slate-900">$1,240</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <p className="text-slate-500 mb-1">Failed</p>
            <p className="text-slate-900">$480</p>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Table View */}
      <Card className="border-slate-200 hidden md:block">
        <CardHeader>
          <CardTitle className="text-slate-900">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Plan Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white">
                        {payment.user.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-slate-900">{payment.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-900">{payment.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      payment.planType === "Premium" 
                        ? "border-green-500 text-green-700 bg-green-50"
                        : payment.planType === "Standard"
                        ? "border-blue-500 text-blue-700 bg-blue-50"
                        : "border-slate-500 text-slate-700 bg-slate-50"
                    }>
                      {payment.planType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{payment.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      payment.status === "Completed"
                        ? "border-emerald-500 text-emerald-700 bg-emerald-50"
                        : payment.status === "Pending"
                        ? "border-amber-500 text-amber-700 bg-amber-50"
                        : "border-red-500 text-red-700 bg-red-50"
                    }>
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {payments.map((payment) => (
          <Card key={payment.id} className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shrink-0">
                  {payment.user.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-slate-900">{payment.user}</p>
                    <p className="text-slate-900">{payment.amount}</p>
                  </div>
                  <p className="text-slate-500 mb-2">{payment.date}</p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={
                      payment.planType === "Premium" 
                        ? "border-green-500 text-green-700 bg-green-50"
                        : payment.planType === "Standard"
                        ? "border-blue-500 text-blue-700 bg-blue-50"
                        : "border-slate-500 text-slate-700 bg-slate-50"
                    }>
                      {payment.planType}
                    </Badge>
                    <Badge variant="outline" className={
                      payment.status === "Completed"
                        ? "border-emerald-500 text-emerald-700 bg-emerald-50"
                        : payment.status === "Pending"
                        ? "border-amber-500 text-amber-700 bg-amber-50"
                        : "border-red-500 text-red-700 bg-red-50"
                    }>
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
