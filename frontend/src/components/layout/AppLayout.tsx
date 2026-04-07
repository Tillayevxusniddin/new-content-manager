import { Outlet } from "react-router-dom";
import { AppNavigation } from "@/components/layout/AppNavigation";
import { Navbar } from "@/components/layout/Navbar";

export function AppShell() {
  return (
    <div className="mesh-gradient min-h-screen">
      <Navbar />
      <AppNavigation />
      <main className="pb-24 md:pb-8 md:pl-24 lg:pl-28">
        <Outlet />
      </main>
    </div>
  );
}
