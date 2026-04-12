import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CategoryFormDialog({ open, onClose, name }: { open: boolean; onClose: () => void; name?: string }) {
  const [value, setValue] = useState(name ?? "");

  useEffect(() => {
    if (!open) return;
    setValue(name ?? "");
  }, [open, name]);

  return (
    <Dialog open={open} onClose={onClose} className="max-w-lg">
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">カテゴリを追加</h3>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
        </div>
        <div className="space-y-2">
          <Label>カテゴリ名</Label>
          <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="例: マネジメント" />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>キャンセル</Button>
          <Button onClick={onClose}>保存</Button>
        </div>
      </div>
    </Dialog>
  );
}
