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
import { useEffect, useState } from "react";
import api from "../utils/axios";


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

interface MessageLogResponse {
  ml_id: number;
  gh_id: string;
  user_gh_id?: string;
  user_full_name: string;
  user_category: string;
  ml_day_number: number;
  ml_day: string;
  ml_type: string;
  ml_message: string;
  createdAt: string;
}

export function MessageLogs() {
  const [messageLogs, setMessageLogs] = useState<MessageLogResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .post("user/message-logs")
      .then((response) => {
        console.log("Meal Plans API Response:", response.data);

        let data: any[] = [];

        if (Array.isArray(response.data)) {
          // Plain array
          data = response.data;
        } else if (Array.isArray(response.data?.data)) {
          // Your case: response.data = { data: [...] }
          data = response.data.data;
        } else if (
          response.data?.data?.mealPlans &&
          Array.isArray(response.data.data.mealPlans)
        ) {
          // Nested under data.mealPlans
          data = response.data.data.mealPlans;
        } else {
          console.warn("Unexpected meal plans API structure:", response.data);
        }

        // Normalize GH ID so it always lands in gh_id
        const normalized: MessageLogResponse[] = data.map((item) => ({
          ...item,
          gh_id:
            item.gh_id ??
            item.user_gh_id ??   // ✅ MISSING KEY (main fix)
            item.ghid ??
            item.ghId ??
            item.GHID ??
            item.gohealth_id ??
            item.gohealthId ??
            "",
        }));

        setMessageLogs(normalized);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching meal plans:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load meal plans"
        );
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900 mb-1">Message Logs</h2>
          <p className="text-slate-500">Track all messages sent to users.</p>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600">Error loading meal plans: {error}</p>
          </CardContent>
        </Card>
      )}

      {/* Desktop Table View */}
      <Card className="border-slate-200 hidden md:block">
        <CardHeader>
          <CardTitle className="text-slate-900">All Messages</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-slate-600">Loading message logs...</p>
            </div>
          ): ( <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Message Id</TableHead>
                <TableHead>GH ID</TableHead>
                <TableHead>GH Full Name</TableHead>
                <TableHead>Day Number</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {messageLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-slate-500">
                    No message logs found
                  </TableCell>
                </TableRow>
              ) : (
                messageLogs.map((msg) => (
                  <TableRow key={msg.ml_id}>
                    <TableCell>{msg.ml_id}</TableCell>
                    <TableCell>{msg.gh_id || msg.user_gh_id || "-"}</TableCell>
                    <TableCell>{msg.user_full_name}</TableCell>
                    <TableCell>{msg.ml_day_number}</TableCell>
                    <TableCell>{msg.ml_day}</TableCell>
                    <TableCell>{msg.ml_type}</TableCell>
                    <TableCell>{msg.createdAt}</TableCell>
                    <TableCell>{msg.ml_message}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
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
