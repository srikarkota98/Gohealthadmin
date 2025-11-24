import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const messages = [
  { 
    id: 1, 
    message: "Your meal plan has been updated", 
    user: "Sarah Johnson", 
    status: "Delivered", 
    date: "Nov 24, 2025", 
    time: "09:30 AM" 
  },
  { 
    id: 2, 
    message: "Weekly nutrition report is ready", 
    user: "Michael Chen", 
    status: "Delivered", 
    date: "Nov 24, 2025", 
    time: "08:15 AM" 
  },
  { 
    id: 3, 
    message: "Reminder: Complete your health survey", 
    user: "Emily Davis", 
    status: "Read", 
    date: "Nov 23, 2025", 
    time: "04:45 PM" 
  },
  { 
    id: 4, 
    message: "New recipe added to your plan", 
    user: "James Wilson", 
    status: "Failed", 
    date: "Nov 23, 2025", 
    time: "02:20 PM" 
  },
  { 
    id: 5, 
    message: "Payment confirmation for Premium plan", 
    user: "Lisa Anderson", 
    status: "Delivered", 
    date: "Nov 23, 2025", 
    time: "11:00 AM" 
  },
  { 
    id: 6, 
    message: "Your subscription will renew tomorrow", 
    user: "David Martinez", 
    status: "Delivered", 
    date: "Nov 22, 2025", 
    time: "03:30 PM" 
  },
  { 
    id: 7, 
    message: "Welcome to GoHealth!", 
    user: "Jennifer Taylor", 
    status: "Read", 
    date: "Nov 22, 2025", 
    time: "10:15 AM" 
  },
  { 
    id: 8, 
    message: "Meal prep tips for this week", 
    user: "Robert Brown", 
    status: "Pending", 
    date: "Nov 21, 2025", 
    time: "05:00 PM" 
  },
];

export function MessageLogs() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900 mb-1">Message Logs</h2>
          <p className="text-slate-500">Track all messages sent to users.</p>
        </div>
      </div>

      {/* Desktop Table View */}
      <Card className="border-slate-200 hidden md:block">
        <CardHeader>
          <CardTitle className="text-slate-900">All Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Message</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((msg) => (
                <TableRow key={msg.id}>
                  <TableCell className="text-slate-900 max-w-xs truncate">
                    {msg.message}
                  </TableCell>
                  <TableCell className="text-slate-600">{msg.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      msg.status === "Delivered"
                        ? "border-green-500 text-green-700 bg-green-50"
                        : msg.status === "Read"
                        ? "border-blue-500 text-blue-700 bg-blue-50"
                        : msg.status === "Failed"
                        ? "border-red-500 text-red-700 bg-red-50"
                        : "border-amber-500 text-amber-700 bg-amber-50"
                    }>
                      {msg.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{msg.date}</TableCell>
                  <TableCell className="text-slate-600">{msg.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile List View */}
      <div className="md:hidden space-y-3">
        {messages.map((msg) => (
          <Card key={msg.id} className="border-slate-200">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-slate-900 flex-1">{msg.message}</p>
                  <Badge variant="outline" className={
                    msg.status === "Delivered"
                      ? "border-green-500 text-green-700 bg-green-50"
                      : msg.status === "Read"
                      ? "border-blue-500 text-blue-700 bg-blue-50"
                      : msg.status === "Failed"
                      ? "border-red-500 text-red-700 bg-red-50"
                      : "border-amber-500 text-amber-700 bg-amber-50"
                  }>
                    {msg.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>{msg.user}</span>
                  <span>{msg.date} • {msg.time}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
