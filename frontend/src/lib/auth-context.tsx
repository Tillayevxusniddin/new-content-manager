/* eslint-disable react-refresh/only-export-components */
// filepath: /home/xusniddin/Development/new-content-manager/frontend/src/lib/auth-context.tsx
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Role = "admin" | "user";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

type LoginResult = { ok: true } | { ok: false; error: string };

type AuthContextValue = {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
  hasRole: (roles: Role | Role[]) => boolean;
};

export const DEMO_ACCOUNTS = [
  { role: "admin" as const, email: "admin@example.com", password: "admin123", label: "管理者アカウント" },
  { role: "user" as const, email: "user@example.com", password: "user123", label: "一般ユーザー" },
] as const;

const SESSION_KEY = "ncm.session.v1";
const LEGACY_KEYS = [
  "role",
  "userRole",
  "uiMode",
  "viewMode",
  "isAdminView",
  "adminView",
  "auth",
  "session",
  "token",
];

const FRONTEND_USERS: Array<SessionUser & { password: string; aliases?: string[] }> = [
  {
    id: "u-admin-1",
    name: "Admin",
    email: DEMO_ACCOUNTS[0].email,
    password: DEMO_ACCOUNTS[0].password,
    role: "admin",
    aliases: ["admin", "admin@local"],
  },
  {
    id: "u-user-1",
    name: "User",
    email: DEMO_ACCOUNTS[1].email,
    password: DEMO_ACCOUNTS[1].password,
    role: "user",
    aliases: ["user", "user@local"],
  },
];

const AuthContext = createContext<AuthContextValue | null>(null);

function clearLegacyStorage() {
  LEGACY_KEYS.forEach((k) => {
    localStorage.removeItem(k);
    sessionStorage.removeItem(k);
  });
}

function saveSession(user: SessionUser | null) {
  if (!user) {
    localStorage.removeItem(SESSION_KEY);
    return;
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ user }));
}

function readSession(): SessionUser | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { user?: SessionUser };
    if (!parsed?.user?.role) return null;
    return parsed.user;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    clearLegacyStorage();
    const restored = readSession();
    setUser(restored);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    const normalized = email.trim().toLowerCase();

    const found = FRONTEND_USERS.find((u) => {
      const emails = [u.email.toLowerCase(), ...(u.aliases ?? []).map((a) => a.toLowerCase())];
      return emails.includes(normalized) && u.password === password;
    });

    if (!found) return { ok: false, error: "Invalid credentials" };

    const sessionUser: SessionUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
    };

    clearLegacyStorage();
    setUser(sessionUser);
    saveSession(sessionUser);

    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    saveSession(null);
    clearLegacyStorage();
    sessionStorage.clear();
  }, []);

  const hasRole = useCallback(
    (roles: Role | Role[]) => {
      if (!user) return false;
      const arr = Array.isArray(roles) ? roles : [roles];
      return arr.includes(user.role);
    },
    [user]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      hasRole,
    }),
    [user, isLoading, login, logout, hasRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
  return ctx;
}