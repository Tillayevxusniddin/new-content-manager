import { Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useMediaPlayer } from "@/hooks/useMediaPlayer";
import { useProgress } from "@/hooks/useProgress";
import type { BookSummary } from "@/lib/types";

export function VideoPlayer({ book }: { book: BookSummary }) {
  const media = useMediaPlayer(1200);
  const { progress, setVideoPosition } = useProgress(book.id);

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-glass-border bg-surface/90">
        <div className="relative aspect-video bg-gradient-to-br from-black via-slate-900 to-slate-800">
          <button className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-[65%] items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-2xl sm:h-20 sm:w-20 sm:-translate-y-1/2">
            <Play className="ml-1 h-8 w-8" />
          </button>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4">
            <Slider value={media.position} onChangeValue={media.seek} max={1200} />
            <div className="mt-2 flex items-center justify-between text-xs text-white/70">
              <span>3:45 / 14:20</span>
              <span className="flex items-center gap-2"><Volume2 className="h-4 w-4" /> 80%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-glass-border bg-card/70 p-4">
        <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
          <span>保存された位置</span>
          <span>{progress.videoPositionSec} sec</span>
        </div>
        <Progress value={(progress.videoPositionSec / 1200) * 100} />
        <div className="mt-4 flex justify-end">
          <Button onClick={() => setVideoPosition(media.position)}>現在位置を保存</Button>
        </div>
      </div>
    </div>
  );
}
