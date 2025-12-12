import React from "react";
import { Search, Bell, Menu, LogOut } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="flex items-center gap-4 p-4 md:px-6">
        {/* Mobile Menu Icon */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>

        {/* Mobile Logo */}
        <div className="flex md:hidden items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <span className="text-white text-sm">GH</span>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search..." 
            className="pl-9 bg-slate-50 border-slate-200"
          />
        </div>

        {/* Spacer */}
        <div className="flex-1 md:hidden" />

        {/* Search Icon - Mobile */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="w-5 h-5" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-blue-500">
            3
          </Badge>
        </Button>

        {/* Admin Avatar */}
        <Avatar className="w-9 h-9 md:w-10 md:h-10">
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            AD
          </AvatarFallback>
        </Avatar>

        {/* Logout */}
        <Button
          variant="outline"
          size="sm"
          className="inline-flex"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
}
