import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ to, active, children, className }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "rounded-xl transition-colors",
        active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-surface-hover",
        className,
      )}
    >
      {children}
    </Link>
  );
}
