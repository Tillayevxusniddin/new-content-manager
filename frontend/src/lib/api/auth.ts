import { currentUser, demoAccounts } from "@/lib/mock-data";
import { withLatency } from "@/lib/api/client";

export async function loginApi(email: string, password: string) {
  if (!email || !password) {
    return withLatency({ token: "", user: null }, "メールアドレスとパスワードを入力してください");
  }

  const account = demoAccounts.find(
    (entry) => entry.email.toLowerCase() === email.trim().toLowerCase() && entry.password === password,
  );

  if (!account) {
    return withLatency({ token: "", user: null }, "認証に失敗しました。ダミーアカウント情報を確認してください");
  }

  return withLatency(
    {
      token: `mock-token-${Date.now()}`,
      user: account.user,
    },
    "ログインしました",
  );
}

export async function ssoLoginApi(ssoToken: string) {
  if (!ssoToken) {
    return withLatency({ token: "", user: null }, "SSO トークンが必要です");
  }

  return withLatency(
    {
      token: `mock-sso-token-${Date.now()}`,
      user: currentUser,
    },
    "SSO ログインしました",
  );
}

export async function meApi() {
  return withLatency({ user: currentUser }, "現在ユーザーを取得しました");
}
