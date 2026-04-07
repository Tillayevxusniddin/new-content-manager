import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { adminUser, currentUser } from "@/lib/mock-data";
import type { Role, User } from "@/lib/types";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; message: string }>;
  ssoLogin: (ssoToken: string) => Promise<{ ok: boolean; message: string }>;
  logout: () => void;
  switchRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "new-content-manager-auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as { user: User; token: string };
      setUser(parsed.user);
      setToken(parsed.token);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const persist = (nextUser: User | null, nextToken: string | null) => {
    setUser(nextUser);
    setToken(nextToken);
    if (nextUser && nextToken) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: nextUser, token: nextToken }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    isAuthenticated: Boolean(user && token),
    async login(email: string, password: string) {
      if (!email || !password) {
        return { ok: false, message: "メールアドレスとパスワードを入力してください" };
      }

      const isAdmin = email.toLowerCase().includes("admin");
      persist(isAdmin ? adminUser : currentUser, `token-${Date.now()}`);
      return { ok: true, message: "ログインしました" };
    },
    async ssoLogin(ssoToken: string) {
      if (!ssoToken) {
        return { ok: false, message: "SSO トークンが必要です" };
      }

      persist(currentUser, `sso-${Date.now()}`);
      return { ok: true, message: "SSO ログインしました" };
    },
    logout() {
      persist(null, null);
    },
    switchRole(role: Role) {
      persist(role === "ADMIN" ? adminUser : currentUser, `token-${Date.now()}`);
    },
  }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
