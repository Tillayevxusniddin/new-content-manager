import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  children: ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

interface TabsContentProps {
  children: ReactNode;
  className?: string;
}

export function Tabs({ children, className }: TabsProps) {
  return <div className={cn("space-y-3", className)}>{children}</div>;
}

export function TabsList({ children, className }: TabsProps) {
  return <div className={cn("flex gap-2 rounded-3xl border border-glass-border bg-card/70 p-2", className)}>{children}</div>;
}

export function TabsTrigger({ active, children, onClick, className }: TabsTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 rounded-2xl px-4 py-3 text-sm font-medium transition-all",
        active ? "bg-primary text-primary-foreground glow-soft" : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, className }: TabsContentProps) {
  return <div className={cn("rounded-[2rem] border border-glass-border bg-card/70 p-5", className)}>{children}</div>;
}
