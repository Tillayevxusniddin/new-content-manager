import { Edit3, MoreHorizontal, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { BookSummary } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

export function BookListTable({ books, onDelete }: { books: BookSummary[]; onDelete?: (bookId: string) => void }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-glass-border bg-card/70 backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/5 text-left text-sm">
          <thead className="bg-white/5 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            <tr>
              <th className="whitespace-nowrap px-4 py-4">書籍</th>
              <th className="whitespace-nowrap px-4 py-4">カテゴリ</th>
              <th className="whitespace-nowrap px-4 py-4">メディア</th>
              <th className="whitespace-nowrap px-4 py-4">進捗</th>
              <th className="whitespace-nowrap px-4 py-4">更新日</th>
              <th className="whitespace-nowrap px-4 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {books.map((book) => (
              <tr key={book.id} className="transition-colors hover:bg-surface-hover/70">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-14 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-[10px] font-black text-white shadow-lg", book.coverTone)}>
                      {book.title.slice(0, 4)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{book.title}</div>
                      <div className="text-xs text-muted-foreground">{book.author}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4"><Badge className="bg-white/5 text-white/75">{book.categoryName}</Badge></td>
                <td className="px-4 py-4 text-muted-foreground">{[book.hasText && "Text", book.hasAudio && "Audio", book.hasVideo && "Video"].filter(Boolean).join(" / ")}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Progress value={book.progress} className="h-2 flex-1" />
                    <span className="w-10 text-right text-xs text-muted-foreground">{book.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-muted-foreground">{formatDate(book.updatedAt)}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/admin/books/${book.id}`}>
                      <Button size="icon" variant="ghost"><Edit3 className="h-4 w-4" /></Button>
                    </Link>
                    <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => onDelete?.(book.id)}><Trash2 className="h-4 w-4 text-red-400" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
