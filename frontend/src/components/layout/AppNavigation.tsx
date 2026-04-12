import type { ComponentType } from "react";
import { NavLink } from "../NavLink";
import { BookOpenText, Gauge, LayoutGrid, Layers, Settings } from "lucide-react";
import { useAuth } from "../../lib/hooks/useAuth";

type Item = { to: string; label: string; icon: ComponentType<{ className?: string }>; end?: boolean };

const USER_ITEMS: Item[] = [
  { to: "/", label: "ホーム", icon: LayoutGrid, end: true },
  { to: "/books", label: "書籍一覧", icon: BookOpenText },
];

const ADMIN_ITEMS: Item[] = [
  { to: "/admin", label: "ダッシュボード", icon: Gauge, end: true },
  { to: "/admin/books", label: "書籍管理", icon: BookOpenText },
  { to: "/admin/categories", label: "カテゴリ管理", icon: Layers },
  { to: "/admin/settings", label: "設定", icon: Settings },
];

export default function AppNavigation() {
  const { user } = useAuth();
  if (!user) return null;

  const items = user.role === "admin" ? ADMIN_ITEMS : USER_ITEMS;
  const roleLabel = user.role === "admin" ? "管理者メニュー" : "ユーザーメニュー";

  return (
    <nav className="space-y-3">
      <div className="rounded-xl border border-glass-border/70 bg-card/70 px-3 py-2">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">{roleLabel}</p>
      </div>
      {items.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.end}>
          <span className="flex items-center gap-2.5">
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </span>
        </NavLink>
      ))}
    </nav>
  );
}