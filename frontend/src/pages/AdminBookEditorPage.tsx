import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MediaUploader } from "@/components/upload/MediaUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { books, categories } from "@/lib/mock-data";

export function AdminBookEditorPage({ mode }: { mode: "create" | "edit" }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const book = useMemo(() => books.find((entry) => entry.id === id), [id]);
  const [title, setTitle] = useState(book?.title ?? "");
  const [author, setAuthor] = useState(book?.author ?? "");
  const [categoryId, setCategoryId] = useState(book?.categoryId ?? categories[0]?.id ?? "");
  const [description, setDescription] = useState(book?.description ?? "");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground">{mode === "create" ? "新規書籍要約" : "書籍要約を編集"}</h1>
        <p className="text-sm text-muted-foreground">S3 直接アップロードを想定したフォーム構成です。</p>
      </div>

      <div className="grid gap-4 rounded-[2rem] border border-glass-border bg-card/70 p-6 backdrop-blur-xl lg:grid-cols-2">
        <div className="space-y-2"><Label>タイトル</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
        <div className="space-y-2"><Label>著者</Label><Input value={author} onChange={(e) => setAuthor(e.target.value)} /></div>
        <div className="space-y-2 lg:col-span-2"><Label>カテゴリ</Label><Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</Select></div>
        <div className="space-y-2 lg:col-span-2"><Label>説明</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} /></div>
      </div>

      <div className="space-y-3 rounded-[2rem] border border-glass-border bg-card/70 p-6 backdrop-blur-xl">
        <div className="text-sm font-semibold text-foreground">メディアアップロード</div>
        <MediaUploader />
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigate(-1)}>キャンセル</Button>
        <Button onClick={() => navigate("/admin/books")}>保存</Button>
      </div>
    </div>
  );
}
