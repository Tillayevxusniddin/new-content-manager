import { useEffect } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Dialog({ open, onClose, children, className }: DialogProps) {
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousRootPaddingRight = root.style.paddingRight;
    const previousRootOverscrollBehavior = root.style.overscrollBehavior;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const previousBodyOverscrollBehavior = body.style.overscrollBehavior;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    root.style.overflow = "hidden";
    root.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    if (scrollbarWidth > 0) {
      root.style.paddingRight = `${scrollbarWidth}px`;
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      root.style.overflow = previousRootOverflow;
      root.style.paddingRight = previousRootPaddingRight;
      root.style.overscrollBehavior = previousRootOverscrollBehavior;
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      body.style.overscrollBehavior = previousBodyOverscrollBehavior;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative my-8 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-glass-border bg-card/95 shadow-2xl",
          className,
        )}
      >
        <div className="max-h-[min(86vh,760px)] overflow-y-auto p-6 md:p-7">{children}</div>
      </div>
    </div>
  );
}
