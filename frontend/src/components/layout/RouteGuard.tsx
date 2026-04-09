// filepath: /home/xusniddin/Development/new-content-manager/frontend/src/components/layout/RouteGuard.tsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/hooks/useAuth";
import type { Role } from "../../lib/auth-context";

type Props = {
  allow?: Role[];
  children?: React.ReactNode;
};

function getDefaultPath(role: Role) {
  return role === "admin" ? "/admin" : "/";
}

export default function RouteGuard({ allow, children }: Props) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allow && !allow.includes(user.role)) {
    return <Navigate to={getDefaultPath(user.role)} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}