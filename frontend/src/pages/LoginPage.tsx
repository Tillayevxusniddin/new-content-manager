import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/hooks/useAuth";
import { DEMO_ACCOUNTS } from "../lib/auth-context";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, user, isAuthenticated, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated || !user) return;

    navigate(user.role === "admin" ? "/admin" : "/", { replace: true });
  }, [isLoading, isAuthenticated, user, navigate]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const result = await login(email, password);

      const ok =
        typeof result === "boolean"
          ? result
          : typeof result === "object" && result !== null && "ok" in result
          ? Boolean(result.ok)
          : false;

      if (!ok) {
        const msg =
          typeof result === "object" && result !== null && "error" in result
            ? String(result.error || "Invalid credentials")
            : "Invalid credentials";
        setError(msg);
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return null;

  return (
    <div className="relative mx-auto flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(59,130,246,0.2),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.15),transparent_35%)]" />
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-5 rounded-3xl border border-glass-border/80 bg-card/75 p-7 shadow-2xl backdrop-blur-xl md:p-8">
        <div>
          <p className="text-xs tracking-[0.2em] text-muted-foreground">BOOK SUMMARY PLATFORM</p>
          <h1 className="mt-2 text-2xl font-black text-foreground">ログイン</h1>
          <p className="mt-1 text-sm text-muted-foreground">権限に応じて UI が自動的に切り替わります。</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground/90">
            メール
          </label>
          <input
            id="email"
            type="text"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-glass-border bg-background/80 px-3 py-2.5 text-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground/90">
            パスワード
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-glass-border bg-background/80 px-3 py-2.5 text-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>

        <div className="rounded-2xl border border-glass-border/80 bg-background/45 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Mock Accounts</p>
          <div className="mt-2 space-y-2 text-xs text-foreground/90">
            {DEMO_ACCOUNTS.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => {
                  setEmail(account.email);
                  setPassword(account.password);
                }}
                className="w-full rounded-lg border border-glass-border/80 bg-card/70 px-2.5 py-2 text-left transition hover:border-primary/30 hover:bg-surface-hover"
              >
                <span className="font-semibold text-foreground">{account.label}</span>
                <span className="ml-2 text-muted-foreground">({account.role})</span>
                <div className="mt-1 text-muted-foreground">email: {account.email}</div>
                <div className="text-muted-foreground">password: {account.password}</div>
              </button>
            ))}
          </div>
        </div>

        {error ? <p className="text-sm text-red-400">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-95 disabled:opacity-60"
        >
          {submitting ? "ログイン中..." : "ログイン"}
        </button>
      </form>
    </div>
  );
}