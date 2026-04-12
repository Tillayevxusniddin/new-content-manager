import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("h-10 w-full rounded-xl border border-glass-border bg-card/60 px-3 text-sm outline-none ring-0 placeholder:text-muted-foreground focus:border-primary/70", className)} {...props} />;
}
