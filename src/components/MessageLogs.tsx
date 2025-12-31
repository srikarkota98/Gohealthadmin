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
import { Pagination } from "../components/Pagination";


interface MessageLogResponse {
  ml_id: number;
  gh_id: string;
  user_gh_id?: string;
  user_full_name: string;
  user_category: string;
  ml_day_number: number;
  ml_day: string;
  ml_type: string;
  message_status: string;
  ml_message: string;
  createdAt: string;
}


export function MessageLogs() {
  const [messageLogs, setMessageLogs] = useState<MessageLogResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  
  const PAGE_SIZE = 50;
  const totalPages = Math.ceil(totalRecords / PAGE_SIZE);

  const start =
  totalRecords === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;

  const end =
  totalRecords === 0 ? 0 : Math.min(page * PAGE_SIZE, totalRecords);

  console.log(start, "start");
  console.log(end, "end");
  console.log(totalRecords, "totalRecords");


  useEffect(() => {
    setLoading(true);
    api
      .post("user/message-logs", {
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
      })
      .then((response) => {
        console.log("Message Logs API Response:", response.data);

        const data: any[] = response.data?.data.getMessageData || [];
        const total = response.data?.data.totalRecords || 0;

        const normalized: MessageLogResponse[] = data.map((item) => ({
          ...item,
          gh_id:
            item.gh_id ??
            item.user_gh_id ??
            item.ghid ??
            item.ghId ??
            item.GHID ??
            item.gohealth_id ??
            item.gohealthId ??
            "",
        }));

        setMessageLogs(normalized);
        setTotalRecords(total); // ✅ IMPORTANT
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load message logs", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load meal plans"
        );
        setLoading(false);
      });
  }, [page]);

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
                <TableHead>Status</TableHead>
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
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={`min-w-[90px] justify-center px-2 py-1 text-xs font-medium capitalize
                          ${
                            msg.message_status === "read"
                              ? "border-blue-500 text-blue-700 bg-blue-50"
                              : msg.message_status === "delivered"
                              ? "border-green-500 text-green-700 bg-green-50"
                              : msg.message_status === "sent"
                              ? "border-slate-400 text-slate-700 bg-slate-50"
                              : "border-gray-400 text-gray-700 bg-gray-50"
                          }
                        `}
                      >
                        {msg.message_status ?? "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell>{msg.createdAt}</TableCell>
                    <TableCell>{msg.ml_message}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}

        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{start}</span>
          –
          <span className="font-medium text-foreground">{end}</span>
          {" "}of{" "}
          <span className="font-medium text-foreground">{totalRecords}</span>
        </p>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </CardContent>  
      
      </Card>

      {/* Mobile List View */}
      <div className="md:hidden space-y-3">
        {messageLogs.map((msg) => (
          <Card key={msg.ml_id} className="border-slate-200">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-slate-900 flex-1">{msg.ml_message}</p>
                  <Badge variant="outline" className={
                    msg.message_status === "delivered"
                      ? "border-green-500 text-green-700 bg-green-50"
                      : msg.message_status === "read"
                      ? "border-blue-500 text-blue-700 bg-blue-50"
                      : msg.message_status === "sent"
                      ? "border-red-500 text-red-700 bg-red-50"
                      : "border-amber-500 text-amber-700 bg-amber-50"
                  }>
                    {msg.message_status ?? "N/A"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>{msg.user_full_name}</span>
                  <span>{msg.createdAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
