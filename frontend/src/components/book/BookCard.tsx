import { Link } from "react-router-dom";
import { FileText, Headphones, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { BookSummary } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: BookSummary;
  variant?: "default" | "large";
}

export function BookCard({ book, variant = "default" }: BookCardProps) {
  const isLarge = variant === "large";

  return (
    <Link
      to={`/books/${book.id}`}
      className={cn(
        "group block overflow-hidden rounded-[1.6rem] border border-glass-border bg-card/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10",
        isLarge && "md:col-span-2",
      )}
    >
      <div className={cn("grid h-full", isLarge ? "md:grid-cols-[180px_1fr]" : "grid-rows-[210px_1fr]") }>
        <div className={cn("relative overflow-hidden", isLarge ? "min-h-56" : "min-h-52")}>
          <div className={cn("absolute inset-0 bg-gradient-to-br", book.coverTone)} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_30%)]" />
          <div className="relative flex h-full flex-col justify-between p-5 text-white">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/55">
              <span>{book.categoryName}</span>
              <span>{book.progress}%</span>
            </div>
            <div>
              <div className={cn("font-black leading-none", isLarge ? "text-4xl" : "text-3xl")}>{book.title}</div>
              <div className="mt-2 text-sm text-white/70">{book.author}</div>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              {book.hasText && <FileText className="h-4 w-4" />}
              {book.hasAudio && <Headphones className="h-4 w-4" />}
              {book.hasVideo && <Video className="h-4 w-4" />}
            </div>
          </div>
        </div>

        <div className={cn("p-4", isLarge ? "flex flex-col justify-between" : "") }>
          <div>
            <Badge className="mb-3 border-white/10 bg-white/5 text-white/80">{book.categoryName}</Badge>
            <h3 className={cn("line-clamp-2 font-bold text-foreground transition-colors group-hover:text-primary", isLarge ? "text-xl" : "text-base")}>
              {book.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">{book.author}</p>
            {isLarge && <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{book.description}</p>}
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{book.duration}</span>
              <span>{book.progress}% 完了</span>
            </div>
            <Progress value={book.progress} className="h-1.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
