import { BookGrid } from "@/components/book/BookGrid";
import { CategoryRow } from "@/components/book/CategoryRow";
import { HeroSection } from "@/components/book/HeroSection";
import { books } from "@/lib/mock-data";

export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-6 md:px-6 md:py-8">
      <HeroSection />

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">カテゴリ</h2>
          <p className="text-sm text-muted-foreground">好みに合わせて要約を絞り込めます。</p>
        </div>
        <CategoryRow />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">おすすめの要約</h2>
          <p className="text-sm text-muted-foreground">関心の高いテーマを中心に選出しています。</p>
        </div>
        <BookGrid books={books} />
      </section>
    </div>
  );
}
