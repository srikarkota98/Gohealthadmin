import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  UtensilsCrossed, 
  MessageSquare, 
  DollarSign, 
  Settings 
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/users", label: "Users", icon: Users },
  { path: "/meal-plans", label: "Plans", icon: UtensilsCrossed },
  { path: "/messages", label: "Messages", icon: MessageSquare },
  { path: "/payments", label: "Payments", icon: DollarSign },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 md:hidden">
      <div className="grid grid-cols-6 gap-1 px-2 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg transition-colors ${
                isActive
                  ? "text-green-600"
                  : "text-slate-500"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
