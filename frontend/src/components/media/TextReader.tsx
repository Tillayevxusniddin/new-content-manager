import { CheckCircle2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/hooks/useProgress";
import type { BookSummary } from "@/lib/types";

export function TextReader({ book }: { book: BookSummary }) {
  const { progress, markTextCompleted } = useProgress(book.id);

  return (
    <div className="space-y-6">
      <article className="prose prose-invert max-w-none prose-p:text-foreground/85 prose-headings:text-white">
        {book.textContent.split("\n").map((line, index) => {
          if (!line.trim()) return <div key={index} className="h-3" />;
          if (line.startsWith("## ")) return <h2 key={index}>{line.replace("## ", "")}</h2>;
          if (line.startsWith("### ")) return <h3 key={index}>{line.replace("### ", "")}</h3>;
          if (line.startsWith("> ")) return (
            <blockquote key={index} className="border-l-2 border-primary pl-4 italic text-muted-foreground">
              {line.replace("> ", "")}
            </blockquote>
          );
          if (line.match(/^\d+\./)) return <li key={index} className="ml-5">{line.replace(/^\d+\.\s*/, "")}</li>;
          return <p key={index}>{line.replace(/\*\*(.*?)\*\*/g, "$1")}</p>;
        })}
      </article>

      <div className="rounded-2xl border border-glass-border bg-card/70 p-4">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">読書進捗</span>
          <span className="font-semibold text-primary">{progress.isTextCompleted ? "完了" : "進行中"}</span>
        </div>
        <Progress value={progress.isTextCompleted ? 100 : 65} />
        <div className="mt-4 flex justify-end">
          <Button onClick={markTextCompleted}>
            <CheckCircle2 className="h-4 w-4" />
            読了として保存
          </Button>
        </div>
      </div>
    </div>
  );
}
