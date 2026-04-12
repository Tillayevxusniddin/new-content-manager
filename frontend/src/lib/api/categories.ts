import { categories } from "@/lib/mock-data";
import { withLatency } from "@/lib/api/client";

export async function getCategoriesApi() {
  return withLatency(categories, "カテゴリ一覧を取得しました");
}

export async function getAdminCategoriesApi() {
  return withLatency(categories, "管理者向けカテゴリ一覧を取得しました");
}
