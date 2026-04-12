import { Link } from "react-router-dom";
import { BookOpenText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/useAuth";

export function Navbar() {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <header className="sticky top-0 z-40 border-b border-glass-border bg-background/65 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-3 font-bold text-foreground">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary glow-soft">
            <BookOpenText className="h-5 w-5" />
          </span>
          <div>
            <div>Book Summary App</div>
            <div className="text-xs font-normal text-muted-foreground">社員向け要約プラットフォーム</div>
          </div>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              {isAdmin ? (
                <>
                  <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">ダッシュボード</Link>
                  <Link to="/admin/books" className="text-sm text-muted-foreground hover:text-foreground">書籍管理</Link>
                  <Link to="/admin/categories" className="text-sm text-muted-foreground hover:text-foreground">カテゴリ管理</Link>
                </>
              ) : (
                <>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">ホーム</Link>
                  <Link to="/books" className="text-sm text-muted-foreground hover:text-foreground">書籍一覧</Link>
                </>
              )}
              <span className="rounded-full border border-glass-border bg-card/60 px-2.5 py-1 text-xs text-muted-foreground">
                {isAdmin ? "ADMIN" : "USER"}
              </span>
            </>
          ) : (
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">ログイン</Link>
          )}
          {user ? (
            <Button size="sm" variant="outline" onClick={logout}>ログアウト</Button>
          ) : (
            <Link
              to="/login"
              className="inline-flex h-8 items-center justify-center rounded-xl bg-primary px-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 glow-primary"
            >
              サインイン
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {user ? (
            <>
              <span className="rounded-full border border-glass-border bg-card/60 px-2 py-1 text-[10px] text-muted-foreground">
                {isAdmin ? "ADMIN" : "USER"}
              </span>
              <Button size="sm" variant="outline" onClick={logout}>ログアウト</Button>
            </>
          ) : (
            <Link
              to="/login"
              className="inline-flex h-8 items-center justify-center rounded-xl bg-primary px-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
            >
              ログイン
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
