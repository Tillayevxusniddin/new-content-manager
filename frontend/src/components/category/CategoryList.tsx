import { FolderOpen } from "lucide-react";
import { categories } from "@/lib/mock-data";

export function CategoryList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <div key={category.id} className="rounded-3xl border border-glass-border bg-card/70 p-5 backdrop-blur-xl">
          <div className={`inline-flex rounded-2xl bg-gradient-to-br px-3 py-2 ${category.accent}`}>
            <FolderOpen className="h-5 w-5" />
          </div>
          <div className="mt-4 text-lg font-semibold text-foreground">{category.name}</div>
          <div className="text-sm text-muted-foreground">{category.count} 件の要約</div>
        </div>
      ))}
    </div>
  );
}
