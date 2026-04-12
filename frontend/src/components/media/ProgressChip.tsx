export function ProgressChip({ value }: { value: number }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-card/70 px-3 py-1 text-xs text-muted-foreground">
      <span className="text-primary font-semibold">{value}%</span>
      <span>進捗</span>
    </div>
  );
}
