import { MoreVertical, Eye } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const users = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", age: 28, subscription: "Premium", status: "Active" },
  { id: 2, name: "Michael Chen", email: "m.chen@email.com", age: 35, subscription: "Basic", status: "Active" },
  { id: 3, name: "Emily Davis", email: "emily.d@email.com", age: 42, subscription: "Premium", status: "Active" },
  { id: 4, name: "James Wilson", email: "j.wilson@email.com", age: 31, subscription: "Standard", status: "Inactive" },
  { id: 5, name: "Lisa Anderson", email: "lisa.a@email.com", age: 29, subscription: "Premium", status: "Active" },
  { id: 6, name: "David Martinez", email: "d.martinez@email.com", age: 38, subscription: "Basic", status: "Active" },
  { id: 7, name: "Jennifer Taylor", email: "j.taylor@email.com", age: 26, subscription: "Standard", status: "Active" },
  { id: 8, name: "Robert Brown", email: "r.brown@email.com", age: 45, subscription: "Premium", status: "Inactive" },
];

export function Users() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900 mb-1">Users Management</h2>
          <p className="text-slate-500">Manage all registered users and their subscriptions.</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 hidden md:flex">
          Add New User
        </Button>
      </div>

      {/* Desktop Table View */}
      <Card className="border-slate-200 hidden md:block">
        <CardHeader>
          <CardTitle className="text-slate-900">All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Subscription Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-slate-900">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{user.email}</TableCell>
                  <TableCell className="text-slate-600">{user.age}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      user.subscription === "Premium" 
                        ? "border-green-500 text-green-700 bg-green-50"
                        : user.subscription === "Standard"
                        ? "border-blue-500 text-blue-700 bg-blue-50"
                        : "border-slate-500 text-slate-700 bg-slate-50"
                    }>
                      {user.subscription}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      user.status === "Active"
                        ? "border-emerald-500 text-emerald-700 bg-emerald-50"
                        : "border-slate-400 text-slate-600 bg-slate-50"
                    }>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem>Change Plan</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {users.map((user) => (
          <Card key={user.id} className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shrink-0">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 mb-1">{user.name}</p>
                  <p className="text-slate-500 truncate mb-2">{user.email}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className={
                      user.subscription === "Premium" 
                        ? "border-green-500 text-green-700 bg-green-50"
                        : user.subscription === "Standard"
                        ? "border-blue-500 text-blue-700 bg-blue-50"
                        : "border-slate-500 text-slate-700 bg-slate-50"
                    }>
                      {user.subscription}
                    </Badge>
                    <Badge variant="outline" className={
                      user.status === "Active"
                        ? "border-emerald-500 text-emerald-700 bg-emerald-50"
                        : "border-slate-400 text-slate-600 bg-slate-50"
                    }>
                      {user.status}
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="shrink-0">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
