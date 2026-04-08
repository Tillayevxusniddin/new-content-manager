import { Link } from "react-router-dom";
import { BookOpenText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export function Navbar() {
  const { user, logout } = useAuth();

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
          <Link to="/books" className="text-sm text-muted-foreground hover:text-foreground">書籍一覧</Link>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">管理者</Link>
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">ログイン</Link>
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
      </div>
    </header>
  );
}
