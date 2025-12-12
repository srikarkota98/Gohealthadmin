import { Navigate, Outlet, useLocation } from "react-router-dom";

export function ProtectedRoute() {
  const location = useLocation();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

