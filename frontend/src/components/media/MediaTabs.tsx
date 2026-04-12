import { useState } from "react";
import { BookOpen, Headphones, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { AudioPlayer } from "@/components/media/AudioPlayer";
import { TextReader } from "@/components/media/TextReader";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import type { BookSummary } from "@/lib/types";

export function MediaTabs({ book }: { book: BookSummary }) {
  const [tab, setTab] = useState<"text" | "audio" | "video">("text");

  const tabButton = (key: typeof tab, label: string, icon: React.ReactNode) => (
    <button
      onClick={() => setTab(key)}
      className={cn(
        "min-w-0 flex-1 rounded-2xl px-2 py-2.5 text-xs font-medium transition-all sm:px-4 sm:py-3 sm:text-sm",
        tab === key ? "bg-primary text-primary-foreground glow-soft" : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
      )}
    >
      <span className="inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap sm:gap-2">{icon}{label}</span>
    </button>
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2 rounded-3xl border border-glass-border bg-card/70 p-2">
        {tabButton("text", "テキスト", <BookOpen className="h-4 w-4" />)}
        {tabButton("audio", "音声", <Headphones className="h-4 w-4" />)}
        {tabButton("video", "動画", <Video className="h-4 w-4" />)}
      </div>
      <div className="rounded-[2rem] border border-glass-border bg-card/70 p-5">
        {tab === "text" && <TextReader book={book} />}
        {tab === "audio" && <AudioPlayer book={book} />}
        {tab === "video" && <VideoPlayer book={book} />}
      </div>
    </div>
  );
}
