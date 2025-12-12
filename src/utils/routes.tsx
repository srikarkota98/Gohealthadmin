import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../components/DashboardLayout";
import { DashboardHome } from "../components/DashboardHome";
import { Users } from "../components/Users";
import { MealPlans } from "../components/MealPlans";
import { MessageLogs } from "../components/MessageLogs";
import { Payments } from "../components/Payments";
import { Settings } from "../components/Settings";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Login } from "../components/Login";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "users", element: <Users /> },
          { path: "meal-plans", element: <MealPlans /> },
          { path: "messages", element: <MessageLogs /> },
          { path: "payments", element: <Payments /> },
          { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },
]);
