import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sampleUploadTargets } from "@/lib/mock-data";

export function MediaUploader() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {sampleUploadTargets.map((target) => (
        <button key={target.id} className="group rounded-3xl border-2 border-dashed border-glass-border bg-white/5 px-4 py-6 text-center transition-colors hover:border-primary/50 hover:bg-white/8">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:glow-soft">
            <Upload className="h-5 w-5" />
          </div>
          <div className="text-sm font-medium text-foreground">{target.label}</div>
          <div className="mt-1 text-xs text-muted-foreground">{target.accept}</div>
        </button>
      ))}
    </div>
  );
}
