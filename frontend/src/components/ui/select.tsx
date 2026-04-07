import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn("h-10 w-full rounded-xl border border-glass-border bg-card/60 px-3 text-sm outline-none focus:border-primary/70", className)} {...props}>
      {children}
    </select>
  );
}
