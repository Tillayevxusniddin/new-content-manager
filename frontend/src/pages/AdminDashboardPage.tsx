import { useMemo, useState } from "react";
import { BookOpen, Clock3, FolderOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { BookFormDialog } from "@/components/book/BookFormDialog";
import { BookListTable } from "@/components/book/BookListTable";
import { dashboardStats, books, categories } from "@/lib/mock-data";

const iconMap = { BookOpen, FolderOpen, Users, Clock3 };

export function AdminDashboardPage() {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = useMemo(() => books.filter((book) => {
    const matchesQuery = book.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryId === "all" || book.categoryId === categoryId;
    return matchesQuery && matchesCategory;
  }), [categoryId, query]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground">ダッシュボード</h1>
          <p className="text-sm text-muted-foreground">書籍要約コンテンツを管理</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>新規追加</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => {
          const Icon = iconMap[stat.icon as keyof typeof iconMap] ?? BookOpen;
          return (
            <div key={stat.label} className="rounded-3xl border border-glass-border bg-card/70 p-5 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-2xl bg-white/5 p-3 text-primary"><Icon className="h-5 w-5" /></div>
                <span className="text-xs font-semibold text-emerald-400">{stat.change}</span>
              </div>
              <div className="text-3xl font-black text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_220px]">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="書籍を検索..." />
        <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="all">すべて</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </Select>
      </div>

      <BookListTable books={filtered} onDelete={() => undefined} />
      <BookFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
