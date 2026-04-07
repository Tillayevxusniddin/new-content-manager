import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="rounded-[2rem] border border-glass-border bg-card/70 p-8 text-center backdrop-blur-xl">
        <div className="text-6xl font-black text-primary">404</div>
        <div className="mt-2 text-lg font-semibold text-foreground">ページが見つかりません</div>
        <p className="mt-2 text-sm text-muted-foreground">存在しない URL にアクセスしました。</p>
        <Link to="/">
          <Button className="mt-6">ホームに戻る</Button>
        </Link>
      </div>
    </div>
  );
}
