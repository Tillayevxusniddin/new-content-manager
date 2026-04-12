import { useEffect, useMemo, useState } from "react";
import { clamp } from "@/lib/utils";
import type { UserProgress } from "@/lib/types";

const STORAGE_KEY = "new-content-manager-progress";

function readStore(): Record<string, UserProgress> {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, UserProgress>;
  } catch {
    return {};
  }
}

function writeStore(store: Record<string, UserProgress>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function useProgress(bookId: string) {
  const [store, setStore] = useState<Record<string, UserProgress>>({});

  useEffect(() => {
    setStore(readStore());
  }, []);

  const progress = useMemo<UserProgress>(() => {
    return store[bookId] ?? {
      bookId,
      isTextCompleted: false,
      audioPositionSec: 0,
      videoPositionSec: 0,
    };
  }, [bookId, store]);

  const update = (partial: Partial<UserProgress>) => {
    setStore((current) => {
      const next = {
        ...current,
        [bookId]: {
          ...progress,
          ...partial,
          audioPositionSec: partial.audioPositionSec ?? progress.audioPositionSec,
          videoPositionSec: partial.videoPositionSec ?? progress.videoPositionSec,
          isTextCompleted: partial.isTextCompleted ?? progress.isTextCompleted,
        },
      };
      writeStore(next);
      return next;
    });
  };

  const setAudioPosition = (seconds: number) => update({ audioPositionSec: clamp(seconds, 0, 3600) });
  const setVideoPosition = (seconds: number) => update({ videoPositionSec: clamp(seconds, 0, 7200) });
  const markTextCompleted = () => update({ isTextCompleted: true });

  return {
    progress,
    update,
    setAudioPosition,
    setVideoPosition,
    markTextCompleted,
  };
}
