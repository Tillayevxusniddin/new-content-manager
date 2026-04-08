import type { BookSummary, Category, DashboardStat, User } from "@/lib/types";

export interface DemoAccount {
  label: string;
  role: "ADMIN" | "USER";
  email: string;
  password: string;
  user: User;
}

export const categories: Category[] = [
  { id: "cat-1", name: "リーダーシップ", icon: "Users", count: 21, accent: "from-cyan-500/20 to-cyan-400/5 text-cyan-300" },
  { id: "cat-2", name: "自己啓発", icon: "Sparkles", count: 18, accent: "from-emerald-500/20 to-emerald-400/5 text-emerald-300" },
  { id: "cat-3", name: "テクノロジー", icon: "Cpu", count: 15, accent: "from-violet-500/20 to-violet-400/5 text-violet-300" },
  { id: "cat-4", name: "心理学", icon: "Brain", count: 12, accent: "from-amber-500/20 to-amber-400/5 text-amber-300" },
  { id: "cat-5", name: "起業", icon: "Rocket", count: 9, accent: "from-rose-500/20 to-rose-400/5 text-rose-300" },
  { id: "cat-6", name: "マネジメント", icon: "Briefcase", count: 24, accent: "from-blue-500/20 to-blue-400/5 text-blue-300" },
  { id: "cat-7", name: "マーケティング", icon: "TrendingUp", count: 16, accent: "from-orange-500/20 to-orange-400/5 text-orange-300" },
];

export const books: BookSummary[] = [
  {
    id: "book-1",
    title: "The Art of Leadership",
    author: "Michael Porter",
    description: "リーダーシップの本質を探求し、チームを成功へ導くための実践的なフレームワークを提供します。",
    categoryId: "cat-1",
    categoryName: "リーダーシップ",
    coverTone: "from-[#08162d] via-[#0a1f3b] to-[#122d59]",
    coverAccent: "from-[#e7b455] to-[#f7d27c]",
    hasText: true,
    hasAudio: true,
    hasVideo: true,
    progress: 65,
    duration: "15分",
    featured: true,
    keyPoints: ["信頼関係の構築", "明確なコミュニケーション", "共感と傾聴", "権限移譲の実践"],
    textContent: `## 第1章：リーダーシップの本質\n\nリーダーシップとは、単に指示を出すことではありません。それは、**ビジョンを共有し、チームを鼓舞し、共に成長する**プロセスです。\n\n### 核心的な原則\n\n1. **信頼の構築** — チームメンバーとの信頼関係は、すべての成功の基盤です\n2. **明確なコミュニケーション** — ビジョンと目標を明確に伝える能力\n3. **共感と傾聴** — メンバーの声に耳を傾け、理解する姿勢\n\n> "最も偉大なリーダーは、フォロワーを生み出すのではなく、新しいリーダーを育てる。" — Tom Peters\n\n### 実践のフレームワーク\n\n効果的なリーダーシップを実践するためには、以下の4つのステップが重要です。`,
    updatedAt: "2026-04-01",
  },
  {
    id: "book-2",
    title: "Deep Work",
    author: "Cal Newport",
    description: "集中力を最大化し、生産性を飛躍的に向上させるための戦略。",
    categoryId: "cat-2",
    categoryName: "自己啓発",
    coverTone: "from-[#e7eef2] via-[#f9fbff] to-[#cfd7de]",
    coverAccent: "from-[#0f7a7d] to-[#0a494d]",
    hasText: true,
    hasAudio: true,
    hasVideo: false,
    progress: 45,
    duration: "12分",
    keyPoints: ["集中時間の確保", "深い作業の習慣化", "環境の最適化"],
    textContent: `## Deep Work の要点\n\n深い集中を実現するためには、通知を切り、作業ブロックを固定し、毎日のリズムを整えることが重要です。`,
    updatedAt: "2026-04-01",
  },
  {
    id: "book-3",
    title: "Atomic Habits",
    author: "James Clear",
    description: "小さな習慣の積み重ねが大きな変化を生む。",
    categoryId: "cat-2",
    categoryName: "自己啓発",
    coverTone: "from-[#151515] via-[#1d1d1d] to-[#2a2a2a]",
    coverAccent: "from-[#ff7a1a] to-[#ff9a3d]",
    hasText: true,
    hasAudio: true,
    hasVideo: true,
    progress: 30,
    duration: "18分",
    keyPoints: ["1%改善の積み重ね", "環境デザイン", "アイデンティティベースの習慣化"],
    textContent: `## Atomic Habits\n\n習慣は結果ではなく、システムです。毎日の小さな選択が未来を形づくります。`,
    updatedAt: "2026-04-01",
  },
  {
    id: "book-4",
    title: "Zero to One",
    author: "Peter Thiel",
    description: "ゼロから新しい価値を生み出すイノベーションの思考法。",
    categoryId: "cat-5",
    categoryName: "起業",
    coverTone: "from-[#0a0a0a] via-[#111111] to-[#1d1d1d]",
    coverAccent: "from-[#ffffff] to-[#c4c4c4]",
    hasText: true,
    hasAudio: false,
    hasVideo: true,
    progress: 0,
    duration: "14分",
    keyPoints: ["独自性の確立", "市場の再定義", "プロダクト優位性"],
    textContent: `## Zero to One\n\n競争ではなく、独自の市場をつくることが重要です。`,
    updatedAt: "2026-04-01",
  },
  {
    id: "book-5",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    description: "人間の思考プロセスを二つのシステムで解説。",
    categoryId: "cat-4",
    categoryName: "心理学",
    coverTone: "from-[#4b136a] via-[#5d1880] to-[#c5c4c4]",
    coverAccent: "from-[#f5f5f5] to-[#d7d7d7]",
    hasText: true,
    hasAudio: true,
    hasVideo: false,
    progress: 80,
    duration: "20分",
    keyPoints: ["直感と熟考", "認知バイアス", "意思決定の品質向上"],
    textContent: `## Thinking, Fast and Slow\n\n速い思考と遅い思考を使い分けることで、より良い判断を目指します。`,
    updatedAt: "2026-04-01",
  },
  {
    id: "book-6",
    title: "The Lean Startup",
    author: "Eric Ries",
    description: "リーンスタートアップの方法論を体系的に解説。",
    categoryId: "cat-5",
    categoryName: "起業",
    coverTone: "from-[#0f1811] via-[#161e17] to-[#232724]",
    coverAccent: "from-[#6ad14e] to-[#2fb54f]",
    hasText: true,
    hasAudio: true,
    hasVideo: true,
    progress: 15,
    duration: "16分",
    keyPoints: ["MVPの作成", "仮説検証", "ピボットの判断"],
    textContent: `## The Lean Startup\n\n学習しながら製品を作り、素早く検証することが重要です。`,
    updatedAt: "2026-04-01",
  },
];

export const currentUser: User = {
  id: "user-1",
  name: "Mina Sato",
  email: "mina.sato@company.com",
  role: "USER",
};

export const adminUser: User = {
  id: "admin-1",
  name: "Atsushi Tanaka",
  email: "admin@company.com",
  role: "ADMIN",
};

export const demoAccounts: DemoAccount[] = [
  {
    label: "Admin Demo",
    role: "ADMIN",
    email: "admin@company.com",
    password: "Admin123!",
    user: adminUser,
  },
  {
    label: "User Demo",
    role: "USER",
    email: "mina.sato@company.com",
    password: "User123!",
    user: currentUser,
  },
];

export const dashboardStats: DashboardStat[] = [
  { label: "書籍数", value: "128", change: "+12", color: "text-blue-300 bg-blue-500/10", icon: "BookMarked" },
  { label: "カテゴリ数", value: "7", change: "+1", color: "text-emerald-300 bg-emerald-500/10", icon: "FolderOpen" },
  { label: "アクティブユーザー", value: "1,247", change: "+89", color: "text-violet-300 bg-violet-500/10", icon: "Users" },
  { label: "今月のアップロード", value: "34", change: "+5", color: "text-amber-300 bg-amber-500/10", icon: "Clock" },
];

export const sampleUploadTargets = [
  { id: "cover", label: "カバー画像", accept: "image/*" },
  { id: "audio", label: "音声ファイル", accept: "audio/*" },
  { id: "video", label: "動画ファイル", accept: "video/*" },
];
