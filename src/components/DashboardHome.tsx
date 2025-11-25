import React from "react";
import { Users, UtensilsCrossed, DollarSign, MessageSquare, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Active Meal Plans",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: UtensilsCrossed,
    color: "bg-green-500",
  },
  {
    title: "Payments Today",
    value: "$12,458",
    change: "+23.1%",
    trend: "up",
    icon: DollarSign,
    color: "bg-emerald-500",
  },
  {
    title: "Messages Sent",
    value: "4,562",
    change: "-3.2%",
    trend: "down",
    icon: MessageSquare,
    color: "bg-cyan-500",
  },
];

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900 mb-1">Dashboard Overview</h2>
        <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-slate-600">{stat.title}</CardTitle>
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-slate-900 mb-1">{stat.value}</div>
              <div className="flex items-center gap-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>
                <span className="text-slate-500">from last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", email: "sarah.j@email.com", plan: "Premium" },
                { name: "Michael Chen", email: "m.chen@email.com", plan: "Basic" },
                { name: "Emily Davis", email: "emily.d@email.com", plan: "Premium" },
                { name: "James Wilson", email: "j.wilson@email.com", plan: "Standard" },
              ].map((user, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-900 truncate">{user.name}</p>
                    <p className="text-slate-500 truncate">{user.email}</p>
                  </div>
                  <span className="text-slate-600 px-2 py-1 bg-slate-100 rounded">{user.plan}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Popular Meal Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Keto Power", users: 342, calories: "1800 kcal" },
                { name: "Mediterranean Diet", users: 289, calories: "2000 kcal" },
                { name: "High Protein", users: 256, calories: "2200 kcal" },
                { name: "Vegan Balanced", users: 198, calories: "1900 kcal" },
              ].map((plan, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-slate-900">{plan.name}</p>
                    <p className="text-slate-500">{plan.calories}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600">{plan.users}</p>
                    <p className="text-slate-500">users</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
