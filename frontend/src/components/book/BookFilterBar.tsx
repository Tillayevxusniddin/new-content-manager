import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { categories } from "@/lib/mock-data";

interface Props {
  query: string;
  onQueryChange: (value: string) => void;
  categoryId: string;
  onCategoryIdChange: (value: string) => void;
  sortOrder: string;
  onSortOrderChange: (value: string) => void;
}

export function BookFilterBar({ query, onQueryChange, categoryId, onCategoryIdChange, sortOrder, onSortOrderChange }: Props) {
  return (
    <div className="grid gap-3 rounded-3xl border border-glass-border bg-card/70 p-4 backdrop-blur-xl lg:grid-cols-[1fr_220px_180px]">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="書籍を検索..." className="pl-10" />
      </div>
      <Select value={categoryId} onChange={(event) => onCategoryIdChange(event.target.value)}>
        <option value="all">すべてのカテゴリ</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </Select>
      <Select value={sortOrder} onChange={(event) => onSortOrderChange(event.target.value)}>
        <option value="desc">新しい順</option>
        <option value="asc">古い順</option>
      </Select>
    </div>
  );
}
