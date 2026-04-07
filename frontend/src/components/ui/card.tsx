import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-2xl border border-glass-border bg-card/70 backdrop-blur-xl", className)}>{children}</div>;
}
