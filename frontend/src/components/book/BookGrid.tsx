import { BookCard } from "@/components/book/BookCard";
import type { BookSummary } from "@/lib/types";

export function BookGrid({ books }: { books: BookSummary[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {books.map((book, index) => (
        <BookCard key={book.id} book={book} variant={index === 0 ? "large" : "default"} />
      ))}
    </div>
  );
}
