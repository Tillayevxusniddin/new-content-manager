import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { BookFormDialog } from "@/components/book/BookFormDialog";
import { BookListTable } from "@/components/book/BookListTable";
import { books, categories } from "@/lib/mock-data";

export function AdminBooksPage() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");

  const filtered = useMemo(() => books.filter((book) => {
    const matchesQuery = book.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryId === "all" || book.categoryId === categoryId;
    return matchesQuery && matchesCategory;
  }), [categoryId, query]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground">書籍管理</h1>
          <p className="text-sm text-muted-foreground">作成・編集・削除を行います。</p>
        </div>
        <Button onClick={() => setOpen(true)}>新規追加</Button>
      </div>
      <div className="grid gap-3 md:grid-cols-[1fr_220px]">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="書籍を検索..." />
        <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="all">すべてのカテゴリ</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </Select>
      </div>
      <BookListTable books={filtered} onDelete={() => undefined} />
      <BookFormDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
