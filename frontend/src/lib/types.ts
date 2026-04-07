export type Role = "ADMIN" | "USER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  accent: string;
}

export interface BookSummary {
  id: string;
  title: string;
  author: string;
  description: string;
  categoryId: string;
  categoryName: string;
  coverTone: string;
  coverAccent: string;
  hasText: boolean;
  hasAudio: boolean;
  hasVideo: boolean;
  progress: number;
  duration: string;
  featured?: boolean;
  keyPoints: string[];
  textContent: string;
  updatedAt: string;
}

export interface UserProgress {
  bookId: string;
  isTextCompleted: boolean;
  audioPositionSec: number;
  videoPositionSec: number;
}

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  color: string;
  icon: string;
}
