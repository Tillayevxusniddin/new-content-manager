import { books } from "@/lib/mock-data";
import { withLatency } from "@/lib/api/client";

export async function getBooksApi() {
  return withLatency(books, "書籍一覧を取得しました");
}

export async function getBookByIdApi(bookId: string) {
  const book = books.find((entry) => entry.id === bookId) ?? null;
  return withLatency(book, book ? "書籍詳細を取得しました" : "書籍が見つかりません");
}

export async function getAdminBooksApi() {
  return withLatency(books, "管理者向け書籍一覧を取得しました");
}
