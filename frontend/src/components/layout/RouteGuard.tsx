import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import type { Role } from "@/lib/types";

interface RouteGuardProps {
  children: ReactNode;
  allowRoles?: Role[];
}

export function RouteGuard({ children, allowRoles }: RouteGuardProps) {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowRoles && user && !allowRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}