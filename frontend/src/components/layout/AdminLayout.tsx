import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, FolderOpen, LayoutDashboard, LogOut, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const navItems = [
  { to: "/admin", label: "ダッシュボード", icon: LayoutDashboard },
  { to: "/admin/books", label: "書籍管理", icon: BookOpen },
  { to: "/admin/categories", label: "カテゴリ", icon: FolderOpen },
  { to: "/admin/books/new", label: "新規追加", icon: Plus },
  { to: "/admin/settings", label: "設定", icon: Settings },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, switchRole } = useAuth();

  return (
    <div className="mesh-gradient min-h-screen">
      <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-glass-border bg-card/65 p-6 backdrop-blur-xl lg:flex">
        <Link to="/admin" className="mb-10 flex items-center gap-3 text-lg font-bold text-foreground">
          <BookOpen className="h-6 w-6 text-primary" />
          Admin Panel
        </Link>

        <div className="mb-6 rounded-2xl border border-glass-border bg-surface/80 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Current User</div>
          <div className="mt-2 text-sm font-semibold text-foreground">{user?.name ?? "Guest"}</div>
          <div className="text-xs text-muted-foreground">{user?.email ?? "-"}</div>
          <div className="mt-3 flex gap-2">
            <Button size="sm" variant="outline" onClick={() => switchRole("USER")}>USER</Button>
            <Button size="sm" onClick={() => switchRole("ADMIN")}>ADMIN</Button>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to || (item.to !== "/admin" && location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all",
                  active ? "bg-primary/15 text-primary glow-soft" : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-3 pt-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <LogOut className="h-4 w-4" />
            ログアウト
          </Button>
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← サイトに戻る</Link>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 border-b border-glass-border bg-background/70 px-4 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2 font-semibold text-foreground">
              <BookOpen className="h-5 w-5 text-primary" /> Admin
            </Link>
            <Button size="sm" variant="outline" onClick={() => navigate("/admin/books/new")}>新規追加</Button>
          </div>
        </header>
        <main className="px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
