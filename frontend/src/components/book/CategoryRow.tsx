import { useMemo, useRef } from "react";
import { ArrowLeft, ArrowRight, Brain, Briefcase, Cpu, FolderOpen, Rocket, Sparkles, TrendingUp, Users } from "lucide-react";
import { categories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const iconMap = { Brain, Briefcase, Cpu, FolderOpen, Rocket, Sparkles, TrendingUp, Users };

export function CategoryRow() {
  const rowRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => categories, []);

  const scroll = (direction: "left" | "right") => {
    rowRef.current?.scrollBy({ left: direction === "left" ? -260 : 260, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-glass-border bg-card/90 p-2 text-foreground shadow-xl md:block">
        <ArrowLeft className="h-4 w-4" />
      </button>
      <div ref={rowRef} className="scrollbar-hide flex gap-3 overflow-x-auto py-2 pl-0 md:px-8">
        {items.map((category) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap] ?? FolderOpen;
          return (
            <button
              key={category.id}
              className={cn(
                "flex min-w-44 items-center gap-3 rounded-2xl border border-glass-border bg-card/70 px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:bg-surface-hover",
                category.accent,
              )}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5">
                <Icon className="h-4 w-4" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold text-foreground">{category.name}</span>
                <span className="text-xs text-muted-foreground">{category.count} 件</span>
              </span>
            </button>
          );
        })}
      </div>
      <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full border border-glass-border bg-card/90 p-2 text-foreground shadow-xl md:block">
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
