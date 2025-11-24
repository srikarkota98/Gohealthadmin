import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "../components/DashboardLayout";
import { DashboardHome } from "../components/DashboardHome";
import { Users } from "../components/Users";
import { MealPlans } from "../components/MealPlans";
import { MessageLogs } from "../components/MessageLogs";
import { Payments } from "../components/Payments";
import { Settings } from "../components/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardHome },
      { path: "users", Component: Users },
      { path: "meal-plans", Component: MealPlans },
      { path: "messages", Component: MessageLogs },
      { path: "payments", Component: Payments },
      { path: "settings", Component: Settings },
    ],
  },
]);
