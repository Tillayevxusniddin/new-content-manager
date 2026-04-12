import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ListChecks } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { books } from "@/lib/mock-data";
import { BookCard } from "@/components/book/BookCard";
import { MediaTabs } from "@/components/media/MediaTabs";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function BookDetailPage() {
  const { id } = useParams();
  const book = books.find((entry) => entry.id === id);

  if (!book) {
    return <NotFoundPage />;
  }

  const related = books.filter((entry) => entry.id !== book.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link to="/books"><Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
        <div className="flex-1">
          <Badge className="mb-2 border-white/10 bg-white/5 text-white/80">{book.categoryName}</Badge>
          <h1 className="text-3xl font-black text-foreground">{book.title}</h1>
          <p className="text-sm text-muted-foreground">{book.author}</p>
        </div>
        <div className={`hidden h-24 w-24 rounded-3xl bg-gradient-to-br ${book.coverTone} lg:block`} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <MediaTabs book={book} />
        </div>

        <aside className="space-y-4">
          <div className="rounded-[2rem] border border-glass-border bg-card/70 p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground"><ListChecks className="h-4 w-4 text-primary" />キーポイント</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {book.keyPoints.map((point) => (
                <li key={point} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />{point}</li>
              ))}
            </ul>
            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground"><span>進捗</span><span>{book.progress}%</span></div>
              <Progress value={book.progress} />
            </div>
          </div>

          <div>
            <div className="mb-3 text-sm font-semibold text-foreground">関連する要約</div>
            <div className="space-y-3">
              {related.map((entry) => <BookCard key={entry.id} book={entry} />)}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
