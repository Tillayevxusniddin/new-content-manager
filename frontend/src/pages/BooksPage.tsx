import { useMemo, useState } from "react";
import { BookFilterBar } from "@/components/book/BookFilterBar";
import { BookGrid } from "@/components/book/BookGrid";
import { books } from "@/lib/mock-data";

export function BooksPage() {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  const filtered = useMemo(() => {
    return books
      .filter((book) => {
        const matchesQuery = book.title.toLowerCase().includes(query.toLowerCase()) || book.description.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = categoryId === "all" || book.categoryId === categoryId;
        return matchesQuery && matchesCategory;
      })
      .sort((a, b) => (sortOrder === "asc" ? a.updatedAt.localeCompare(b.updatedAt) : b.updatedAt.localeCompare(a.updatedAt)));
  }, [categoryId, query, sortOrder]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6 md:py-8">
      <div>
        <h1 className="text-2xl font-black text-foreground">書籍一覧</h1>
        <p className="text-sm text-muted-foreground">検索、カテゴリフィルター、ソートを使って探せます。</p>
      </div>
      <BookFilterBar
        query={query}
        onQueryChange={setQuery}
        categoryId={categoryId}
        onCategoryIdChange={setCategoryId}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />
      <BookGrid books={filtered} />
    </div>
  );
}
