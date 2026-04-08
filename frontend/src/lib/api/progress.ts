import { withLatency } from "@/lib/api/client";
import type { UserProgress } from "@/lib/types";

export async function getProgressApi(bookId: string) {
  const key = `progress-${bookId}`;
  const raw = localStorage.getItem(key);

  const fallback: UserProgress = {
    bookId,
    isTextCompleted: false,
    audioPositionSec: 0,
    videoPositionSec: 0,
  };

  if (!raw) return withLatency(fallback, "進捗を取得しました");

  try {
    const parsed = JSON.parse(raw) as UserProgress;
    return withLatency(parsed, "進捗を取得しました");
  } catch {
    return withLatency(fallback, "進捗を初期化しました");
  }
}

export async function saveProgressApi(bookId: string, payload: Partial<UserProgress>) {
  const current = await getProgressApi(bookId);
  const merged: UserProgress = {
    ...current.data,
    ...payload,
    bookId,
  };
  localStorage.setItem(`progress-${bookId}`, JSON.stringify(merged));
  return withLatency(merged, "進捗を保存しました");
}
