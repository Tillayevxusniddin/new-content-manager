import { useEffect, useMemo, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/lib/mock-data";
import type { BookSummary } from "@/lib/types";

interface Props {
  book?: BookSummary | null;
  open: boolean;
  onClose: () => void;
}

export function BookFormDialog({ book, open, onClose }: Props) {
  const [title, setTitle] = useState(book?.title ?? "");
  const [author, setAuthor] = useState(book?.author ?? "");
  const [categoryId, setCategoryId] = useState(book?.categoryId ?? categories[0]?.id ?? "");
  const [description, setDescription] = useState(book?.description ?? "");

  const heading = useMemo(() => (book ? "書籍要約を編集" : "新しい書籍要約を追加"), [book]);

  useEffect(() => {
    if (!open) return;
    setTitle(book?.title ?? "");
    setAuthor(book?.author ?? "");
    setCategoryId(book?.categoryId ?? categories[0]?.id ?? "");
    setDescription(book?.description ?? "");
  }, [open, book]);

  return (
    <Dialog open={open} onClose={onClose} className="max-w-2xl">
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">{heading}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>タイトル</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="書籍タイトル" />
          </div>
          <div className="space-y-2">
            <Label>著者</Label>
            <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="著者名" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>カテゴリ</Label>
            <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>説明</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="書籍の説明..." />
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            "カバー画像",
            "音声ファイル",
            "動画ファイル",
          ].map((label) => (
            <button key={label} className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-glass-border bg-white/5 px-4 py-5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
              <Upload className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-glass-border bg-white/5 p-4">
          <div className="mb-2 text-sm font-medium text-muted-foreground">テキスト要約</div>
          <Textarea defaultValue={book?.textContent ?? ""} placeholder="Markdown 対応のテキスト要約を入力" className="min-h-40" />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>キャンセル</Button>
          <Button onClick={onClose}>保存</Button>
        </div>
      </div>
    </Dialog>
  );
}
