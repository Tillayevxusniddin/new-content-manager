import type { User } from "@/lib/types";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export function getAuthToken() {
  try {
    const raw = localStorage.getItem("new-content-manager-auth");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { token?: string };
    return parsed.token ?? null;
  } catch {
    return null;
  }
}

export function withLatency<T>(data: T, message = "OK", delayMs = 120): Promise<ApiResponse<T>> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve({ success: true, message, data }), delayMs);
  });
}

export function buildUnauthorizedResponse<T>(data: T): ApiResponse<T> {
  return {
    success: false,
    message: "Unauthorized",
    data,
  };
}

export function isAdmin(user: User | null) {
  return user?.role === "ADMIN";
}
