import { Link, useLocation } from "react-router-dom";
import { BookOpen, Home, LayoutDashboard, Search, User2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { to: "/", icon: Home, label: "ホーム" },
  { to: "/books", icon: BookOpen, label: "書籍一覧" },
  { to: "/login", icon: User2, label: "ログイン" },
  { to: "/admin", icon: LayoutDashboard, label: "管理者" },
];

export function AppNavigation() {
  const location = useLocation();

  return (
    <>
      <aside className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 rounded-3xl border border-glass-border bg-card/70 p-2 backdrop-blur-xl md:flex">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group relative flex items-center justify-center rounded-2xl px-3 py-3 transition-all",
                isActive ? "bg-primary/15 text-primary glow-soft" : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-xl border border-glass-border bg-card/90 px-3 py-1.5 text-xs font-medium opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          );
        })}
      </aside>

      <nav className="fixed inset-x-0 bottom-4 z-50 flex justify-center md:hidden">
        <div className="flex gap-1 rounded-3xl border border-glass-border bg-card/80 p-2 backdrop-blur-xl">
          {navItems.map((item) => {
            const active = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
            return (
              <NavLink key={item.to} to={item.to} active={active} className="flex flex-col items-center gap-1 px-3 py-2 text-[10px]">
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
