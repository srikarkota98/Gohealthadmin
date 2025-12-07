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
import { useEffect, useState } from "react";
import api from "../utils/axios";

interface User {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  mobile_number: string;
  meal_id: string;
  createdAt: string;
}

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ensure users is always an array
  const usersArray = Array.isArray(users) ? users : [];

  useEffect(() => {
    api.post("user/users")
      .then((response) => {
        console.log("API Response:", response.data);
        
        // Extract users from response.data.data.users
        let usersData: User[] = [];
        
        if (response.data?.data?.users && Array.isArray(response.data.data.users)) {
          usersData = response.data.data.users;
        } else if (response.data?.users && Array.isArray(response.data.users)) {
          usersData = response.data.users;
        } else if (Array.isArray(response.data)) {
          usersData = response.data;
        } else {
          console.warn("API response structure unexpected:", response.data);
          usersData = [];
        }
        
        setUsers(usersData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setError(error.response?.data?.message || error.message || "Failed to load users");
        setLoading(false);
      });
  }, []);

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

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600">Error loading users: {error}</p>
          </CardContent>
        </Card>
      )}

      {loading && (
        <Card className="border-slate-200">
          <CardContent className="p-8 text-center">
            <p className="text-slate-600">Loading users...</p>
          </CardContent>
        </Card>
      )}

      {/* Desktop Table View */}
      {!loading && !error && (
        <Card className="border-slate-200 hidden md:block">
          <CardHeader>
            <CardTitle className="text-slate-900">All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Mobile Number</TableHead>
                  <TableHead>Meal Id</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersArray.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-slate-500 py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  usersArray.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                        {user.full_name.split(" ").map(n => n[0]).join("").toUpperCase()}
                      </div>
                      <span className="text-slate-900">{user.full_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{user.mobile_number}</TableCell>
                  <TableCell className="text-slate-600">{user.meal_id}</TableCell>
                  <TableCell className="text-slate-600">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
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
                        <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Mobile Card View */}
      {!loading && !error && (
        <div className="md:hidden space-y-3">
          {usersArray.length === 0 ? (
            <Card className="border-slate-200">
              <CardContent className="p-8 text-center">
                <p className="text-slate-500">No users found</p>
              </CardContent>
            </Card>
          ) : (
            usersArray.map((user) => (
          <Card key={user.id} className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shrink-0">
                  {user.full_name.split(" ").map(n => n[0]).join("").toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 mb-1">{user.full_name}</p>
                  <p className="text-slate-500 truncate mb-2">{user.mobile_number}</p>
                  <p className="text-slate-500 truncate mb-2">{user.meal_id}</p>
                  <p className="text-slate-400 text-xs">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <Button size="sm" variant="outline" className="shrink-0">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
