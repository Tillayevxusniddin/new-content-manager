import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpenText, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, ssoLogin } = useAuth();
  const [email, setEmail] = useState("admin@company.com");
  const [password, setPassword] = useState("password123");
  const [message, setMessage] = useState<string | null>(null);

  const submit = async () => {
    const result = await login(email, password);
    setMessage(result.message);
    if (result.ok) navigate("/");
  };

  const submitSso = async () => {
    const result = await ssoLogin("dummy-sso-token");
    setMessage(result.message);
    if (result.ok) navigate("/");
  };

  return (
    <div className="min-h-screen mesh-gradient px-4 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            社内向けセキュアログイン
          </div>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">Book Summary Platform</h1>
          <p className="max-w-xl text-sm leading-7 text-white/70 md:text-base">
            書籍の要約コンテンツをテキスト・音声・動画で一元管理し、社員がいつでもアクセスできるようにします。
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "JWT ベアラートークン",
              "SSO ログイン対応",
              "レスポンシブ UI",
              "進捗のローカル保存",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 backdrop-blur">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-glass-border bg-card/85 p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary glow-soft">
              <BookOpenText className="h-6 w-6" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">サインイン</div>
              <div className="text-sm text-muted-foreground">ダミーデータで即ログインできます</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>メールアドレス</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>パスワード</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button className="w-full" onClick={submit}>メールでログイン</Button>
            <Button variant="outline" className="w-full" onClick={submitSso}>
              <Sparkles className="h-4 w-4" />
              SSO でログイン
            </Button>
            {message && <div className="rounded-2xl border border-glass-border bg-white/5 px-4 py-3 text-sm text-muted-foreground">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
