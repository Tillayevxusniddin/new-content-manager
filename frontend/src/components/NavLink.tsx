import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  active?: boolean;
  end?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ to, active, end, children, className }: NavLinkProps) {
  return (
    <RouterNavLink
      to={to}
      end={end}
      className={({ isActive }) => {
        const selected = active ?? isActive;
        return cn(
          "block rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium transition-all",
          selected
            ? "border-primary/25 bg-primary/15 text-foreground shadow-[0_0_0_1px_hsl(var(--primary)/0.15)_inset]"
            : "text-muted-foreground hover:border-glass-border hover:bg-surface-hover hover:text-foreground",
          className,
        );
      }}
    >
      {children}
    </RouterNavLink>
  );
}
