import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import AppNavigation from "./AppNavigation";
import { useAuth } from "../../lib/hooks/useAuth";

export function AppShell() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
  if (user.role !== "user") return <Navigate to="/admin" replace />;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[240px_minmax(0,1fr)] md:px-6 md:py-8">
        <aside className="h-fit rounded-2xl border border-glass-border bg-card/60 p-3 backdrop-blur md:sticky md:top-24">
          <AppNavigation />
        </aside>
        <main className="min-w-0 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppShell;