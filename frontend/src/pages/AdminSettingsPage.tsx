export function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground">設定</h1>
        <p className="text-sm text-muted-foreground">モックの設定画面です。</p>
      </div>
      <div className="rounded-[2rem] border border-glass-border bg-card/70 p-6 backdrop-blur-xl">
        <div className="text-sm text-muted-foreground">
          ここに認証、通知、表示設定などを追加できます。
        </div>
      </div>
    </div>
  );
}
