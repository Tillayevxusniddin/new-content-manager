import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useMediaPlayer } from "@/hooks/useMediaPlayer";
import { useProgress } from "@/hooks/useProgress";
import type { BookSummary } from "@/lib/types";

export function AudioPlayer({ book }: { book: BookSummary }) {
  const media = useMediaPlayer(900);
  const { progress, setAudioPosition } = useProgress(book.id);

  return (
    <div className="space-y-6">
      <div className="mx-auto flex w-full max-w-md flex-col items-center rounded-[2rem] border border-glass-border bg-surface/90 p-8 text-center">
        <div className={`mb-6 h-40 w-40 rounded-full border border-white/10 bg-gradient-to-br ${book.coverTone} shadow-2xl ${media.playing ? "animate-spin-slow" : ""}`} />
        <div className="text-lg font-bold text-foreground">{book.title}</div>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <div className="mt-6 grid w-full gap-2">
          <Slider value={media.position} onChangeValue={media.seek} max={900} />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>5:15</span>
            <span>15:00</span>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <Button variant="outline" size="icon"><SkipBack className="h-4 w-4" /></Button>
          <Button size="lg" onClick={media.toggle}>
            {media.playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon"><SkipForward className="h-4 w-4" /></Button>
        </div>
        <div className="mt-5 flex w-full items-center gap-3 text-muted-foreground">
          <Volume2 className="h-4 w-4" />
          <Slider value={media.volume} onChangeValue={media.setVolumeValue} />
        </div>
      </div>

      <div className="rounded-2xl border border-glass-border bg-card/70 p-4">
        <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
          <span>保存された位置</span>
          <span>{progress.audioPositionSec} sec</span>
        </div>
        <Progress value={(progress.audioPositionSec / 900) * 100} />
        <div className="mt-4 flex justify-end">
          <Button onClick={() => setAudioPosition(media.position)}>現在位置を保存</Button>
        </div>
      </div>
    </div>
  );
}
