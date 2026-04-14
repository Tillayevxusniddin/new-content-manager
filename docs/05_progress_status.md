# 05 プロジェクト進捗状況と開発計画

**最終更新日：** 2026-04-14

---

## 1. フェーズ全体概要

| フェーズ | 内容 | ステータス | 進捗 |
|---------|------|-----------|------|
| Phase 1 | フロントエンド基本ページ・コンポーネント | **未着手** | 0% |
| Phase 2 | バックエンド（Express ＋ RDS） | **未着手** | 0% |
| Phase 3 | フロントエンド API 接続 | **未着手** | 0% |
| Phase 4 | S3 メディア統合 | **未着手** | 0% |
| Phase 5 | テスト（UT / IT / E2E） | **未着手** | 0% |
| Phase 6 | インフラ・デプロイ（EC2 / RDS / S3） | **未着手** | 0% |

---

## 2. Phase 1: フロントエンド実装

### 2.1 ページ

| # | 機能 | ファイル | ステータス |
|---|------|---------|-----------|
| 1 | ログインページ | `frontend/src/app/(auth)/login/page.tsx` | ⬜ 未着手 |
| 2 | ホームページ（カテゴリ ＋ おすすめ） | `frontend/src/app/(dashboard)/page.tsx` | ⬜ 未着手 |
| 3 | 書籍一覧 | `frontend/src/app/(dashboard)/books/page.tsx` | ⬜ 未着手 |
| 4 | 書籍詳細 | `frontend/src/app/(dashboard)/books/[bookId]/page.tsx` | ⬜ 未着手 |
| 5 | 管理者: ダッシュボード | `frontend/src/app/(dashboard)/admin/page.tsx` | ⬜ 未着手 |
| 6 | 管理者: 書籍一覧 | `frontend/src/app/(dashboard)/admin/books/page.tsx` | ⬜ 未着手 |
| 7 | 管理者: 書籍作成/編集 | `frontend/src/app/(dashboard)/admin/books/[bookId]/page.tsx` | ⬜ 未着手 |
| 8 | 管理者: カテゴリ管理 | `frontend/src/app/(dashboard)/admin/categories/page.tsx` | ⬜ 未着手 |
| 9 | 初回ログイン注意事項確認画面 | `frontend/src/app/(auth)/first-login/page.tsx` | ⬜ 未着手 |

### 2.2 コンポーネント（FSD レイヤー）

| # | コンポーネント | ファイル | ステータス |
|---|--------------|---------|-----------|
| 1 | ヘッダー（Widget） | `frontend/src/widgets/header/ui/header.tsx` | ⬜ 未着手 |
| 2 | サイドバー（Widget） | `frontend/src/widgets/sidebar/ui/sidebar.tsx` | ⬜ 未着手 |
| 3 | 書籍テーブル（Widget） | `frontend/src/widgets/books-table/ui/table.tsx` | ⬜ 未着手 |
| 4 | 書籍フィルター（Widget） | `frontend/src/widgets/books-table/ui/filter.tsx` | ⬜ 未着手 |
| 5 | ログインフォーム（Feature） | `frontend/src/features/form-login/ui/form.tsx` | ⬜ 未着手 |
| 6 | 書籍作成ダイアログ（Feature） | `frontend/src/features/dialog-create-book/ui/dialog-create-book.tsx` | ⬜ 未着手 |
| 7 | カテゴリ作成ダイアログ（Feature） | `frontend/src/features/dialog-create-category/ui/dialog.tsx` | ⬜ 未着手 |
| 8 | テーマトグル（Feature） | `frontend/src/features/theme-toggle/ui/toggle.tsx` | ⬜ 未着手 |
| 9 | ヒーローセクション（Entity） | `frontend/src/entities/hero/ui/hero.tsx` | ⬜ 未着手 |
| 10 | カテゴリカルーセル（Entity） | `frontend/src/entities/carousel-categories/ui/carousel.tsx` | ⬜ 未着手 |
| 11 | ナビゲーションリンク（Entity） | `frontend/src/entities/navlink.tsx` | ⬜ 未着手 |
| 12 | 共通UIコンポーネント（Shared） | `frontend/src/shared/ui/*.tsx` | ⬜ 未着手 |

### 2.3 状態・ユーティリティ

| # | 機能 | ファイル | ステータス | 備考 |
|---|------|---------|-----------|------|
| 1 | 型定義 | `frontend/src/shared/types/types.ts` | ⬜ 未着手 | |
| 2 | 認証コンテキスト | `frontend/src/shared/hooks/auth-context.tsx` | ⬜ 未着手 | 初期はモックを使用 |
| 3 | useAuth Hook | `frontend/src/shared/hooks/use-auth.ts` | ⬜ 未着手 | |
| 4 | useProgress Hook | `frontend/src/shared/hooks/use-progress.ts` | ⬜ 未着手 | |
| 5 | useMediaPlayer Hook | `frontend/src/shared/hooks/use-media-player.ts` | ⬜ 未着手 | |
| 6 | ユーティリティ関数 | `frontend/src/shared/lib/utils.ts` | ⬜ 未着手 | |
| 7 | モック書籍データ | `frontend/src/shared/lib/mock-data.ts` | ⬜ 未着手 | API 接続後に削除 |

---

## 3. Phase 2: バックエンド実装

### 3.1 プロジェクトセットアップ

| # | タスク | ステータス | 担当 |
|---|--------|-----------|------|
| 1 | `backend/` フォルダと `package.json` 作成 | ⬜ 未着手 | - |
| 2 | TypeScript ＋ Express 環境構築 | ⬜ 未着手 | - |
| 3 | Prisma セットアップと `schema.prisma` 作成 | ⬜ 未着手 | - |
| 4 | 環境変数設定（`.env`） | ⬜ 未着手 | - |
| 5 | ESLint / Prettier 設定 | ⬜ 未着手 | - |
| 6 | AWS S3 SDK 設定 | ⬜ 未着手 | - |

### 3.2 データベース

| # | タスク | ステータス | 担当 |
|---|--------|-----------|------|
| 7 | Prisma マイグレーション実行 | ⬜ 未着手 | - |
| 8 | シーダー実装（初期データ） | ⬜ 未着手 | - |

### 3.3 ミドルウェア

| # | タスク | ステータス | 担当 |
|---|--------|-----------|------|
| 9 | JWT 認証ミドルウェア（`auth.middleware.ts`） | ⬜ 未着手 | - |
| 10 | 管理者チェックミドルウェア（`admin.middleware.ts`） | ⬜ 未着手 | - |
| 11 | バリデーションミドルウェア（`validate.middleware.ts`） | ⬜ 未着手 | - |
| 12 | エラーハンドリングミドルウェア（`error.middleware.ts`） | ⬜ 未着手 | - |

### 3.4 API 実装

| # | エンドポイント | タスク | ステータス | 担当 |
|---|--------------|--------|-----------|------|
| 13 | POST /auth/login | ログイン API | ⬜ 未着手 | - |
| 14 | POST /auth/sso | SSO ログイン API | ⬜ 未着手 | - |
| 15 | GET /auth/me | 現在のユーザー API | ⬜ 未着手 | - |
| 16 | GET /categories | カテゴリ一覧 API | ⬜ 未着手 | - |
| 17 | GET /books | 書籍一覧 API | ⬜ 未着手 | - |
| 18 | GET /books/:id | 書籍詳細 API | ⬜ 未着手 | - |
| 19 | GET /progress/:bookId | 進捗取得 API | ⬜ 未着手 | - |
| 20 | POST /progress/:bookId | 進捗保存 API | ⬜ 未着手 | - |
| 21 | GET /admin/stats | ダッシュボード統計 API | ⬜ 未着手 | - |
| 22 | GET /admin/books | 管理者書籍一覧 API | ⬜ 未着手 | - |
| 23 | POST /admin/books | 書籍作成 API | ⬜ 未着手 | - |
| 24 | PUT /admin/books/:id | 書籍更新 API | ⬜ 未着手 | - |
| 25 | DELETE /admin/books/:id | 書籍削除 API | ⬜ 未着手 | - |
| 26 | GET /admin/categories | 管理者カテゴリ API | ⬜ 未着手 | - |
| 27 | POST /admin/categories | カテゴリ作成 API | ⬜ 未着手 | - |
| 28 | PUT /admin/categories/:id | カテゴリ更新 API | ⬜ 未着手 | - |
| 29 | DELETE /admin/categories/:id | カテゴリ削除 API | ⬜ 未着手 | - |
| 30 | POST /admin/upload/presigned-url | S3 Presigned URL API | ⬜ 未着手 | - |

---

## 4. Phase 3: フロントエンド API 接続

| # | タスク | ステータス | 担当 |
|---|--------|-----------|------|
| 1 | ky クライアント作成（`frontend/src/shared/lib/ky-init.ts`） | ⬜ 未着手 | - |
| 2 | 認証情報付与ロジック実装（ky hook） | ⬜ 未着手 | - |
| 3 | 認証 API 接続（`frontend/src/features/form-login/model.ts`） | ⬜ 未着手 | - |
| 4 | 書籍 API 接続（`frontend/src/widgets/books-table/model.ts`） | ⬜ 未着手 | - |
| 5 | カテゴリ API 接続（`frontend/src/features/dialog-create-category/model.ts`） | ⬜ 未着手 | - |
| 6 | 進捗 API 接続（`frontend/src/shared/hooks/use-progress.ts`） | ⬜ 未着手 | - |
| 7 | S3 アップロード API 接続（`frontend/src/features/dialog-create-book/ui/dialog-create-book.tsx`） | ⬜ 未着手 | - |
| 8 | `AuthContext` を API に接続（`frontend/src/shared/hooks/auth-context.tsx`） | ⬜ 未着手 | - |
| 9 | 各ページのモックデータを API 呼び出しに置き換え | ⬜ 未着手 | - |
| 10 | モックデータファイルの削除 | ⬜ 未着手 | - |

---

## 5. Phase 4: S3 メディア統合

| # | タスク | ステータス | 担当 |
|---|--------|-----------|------|
| 1 | AWS S3 バケット作成・設定（プライベート） | ⬜ 未着手 | - |
| 2 | S3 CORS 設定（フロントエンド経由のアップロード用） | ⬜ 未着手 | - |
| 3 | IAM ロール・権限設定 | ⬜ 未着手 | - |
| 4 | Presigned URL 生成ロジック実装 | ⬜ 未着手 | - |
| 5 | フロントエンドのメディアアップロードコンポーネント実装 | ⬜ 未着手 | - |
| 6 | 動画プレイヤー S3 URL 統合 | ⬜ 未着手 | - |
| 7 | 音声プレイヤー S3 URL 統合 | ⬜ 未着手 | - |

---

## 6. Phase 5: テスト構築

### 6.1 ユニットテスト（UT）— Jest

| # | テスト対象 | ステータス | 担当 |
|---|-----------|-----------|------|
| 1 | `auth.service.ts` — ログイン成功/失敗 | ⬜ 未着手 | - |
| 2 | `auth.service.ts` — JWT 生成/検証 | ⬜ 未着手 | - |
| 3 | `book.service.ts` — CRUD | ⬜ 未着手 | - |
| 4 | `book.service.ts` — フィルタリング・ページネーション | ⬜ 未着手 | - |
| 5 | `category.service.ts` — CRUD | ⬜ 未着手 | - |
| 6 | `progress.service.ts` — 保存/取得 | ⬜ 未着手 | - |
| 7 | `upload.service.ts` — Presigned URL | ⬜ 未着手 | - |
| 8 | `jwt.ts` — トークン生成/検証/有効期限 | ⬜ 未着手 | - |
| 9 | `password.ts` — ハッシュ化/比較 | ⬜ 未着手 | - |
| 10 | フロントエンド: `shared/hooks/auth-context.tsx` | ⬜ 未着手 | - |
| 11 | フロントエンド: `entities/hero/ui/hero.tsx` | ⬜ 未着手 | - |
| 12 | フロントエンド: `widgets/books-table/ui/table.tsx` | ⬜ 未着手 | - |
| 13 | フロントエンド: `features/form-login/ui/form.tsx` | ⬜ 未着手 | - |

### 6.2 統合テスト（IT）— Supertest

| # | テスト対象 | ステータス | 担当 |
|---|-----------|-----------|------|
| 1 | `POST /auth/login` — 正常ログイン | ⬜ 未着手 | - |
| 2 | `POST /auth/login` — 誤パスワード | ⬜ 未着手 | - |
| 3 | `POST /auth/sso` — 正常 SSO トークン | ⬜ 未着手 | - |
| 4 | `POST /auth/sso` — 無効トークン | ⬜ 未着手 | - |
| 5 | `GET /books` — 未認証時 401 | ⬜ 未着手 | - |
| 6 | `GET /books` — 一覧取得 ＋ ページネーション | ⬜ 未着手 | - |
| 7 | `GET /books` — カテゴリ・検索フィルター | ⬜ 未着手 | - |
| 8 | `GET /books/:id` — 詳細取得 | ⬜ 未着手 | - |
| 9 | `GET /books/:id` — 存在しない ID → 404 | ⬜ 未着手 | - |
| 10 | `POST /progress/:bookId` — 進捗保存 | ⬜ 未着手 | - |
| 11 | `GET /progress/:bookId` — 進捗取得 | ⬜ 未着手 | - |
| 12 | `POST /admin/books` — 作成成功 | ⬜ 未着手 | - |
| 13 | `POST /admin/books` — バリデーションエラー | ⬜ 未着手 | - |
| 14 | `POST /admin/books` — user ロールで 403 | ⬜ 未着手 | - |
| 15 | `DELETE /admin/books/:id` — 削除 | ⬜ 未着手 | - |
| 16 | `POST /admin/upload/presigned-url` — URL 取得 | ⬜ 未着手 | - |

### 6.3 E2E テスト（E2E）— Playwright

| # | シナリオ | ステータス | 担当 |
|---|---------|-----------|------|
| 1 | ログインフロー（メール/パスワード — 正常） | ⬜ 未着手 | - |
| 2 | ログインフロー（エラー表示） | ⬜ 未着手 | - |
| 3 | SSO ログインフロー | ⬜ 未着手 | - |
| 4 | ホームページ — カテゴリ・おすすめ書籍の表示 | ⬜ 未着手 | - |
| 5 | 書籍一覧 — 表示・検索・フィルター | ⬜ 未着手 | - |
| 6 | 書籍詳細 — テキスト・音声・動画タブ | ⬜ 未着手 | - |
| 7 | 動画視聴と進捗保存 | ⬜ 未着手 | - |
| 8 | 音声再生と位置保存 | ⬜ 未着手 | - |
| 9 | テキスト読了と完了フラグ | ⬜ 未着手 | - |
| 10 | 管理者: 書籍作成フロー（メディアアップロードあり） | ⬜ 未着手 | - |
| 11 | 管理者: 書籍編集 | ⬜ 未着手 | - |
| 12 | 管理者: 書籍削除 | ⬜ 未着手 | - |
| 13 | 管理者: カテゴリ管理 | ⬜ 未着手 | - |
| 14 | ロール制御: user ロールによる管理者ページへのアクセス拒否 | ⬜ 未着手 | - |

---

## 7. Phase 6: インフラ・デプロイ

| # | タスク | ステータス | 担当 |
|---|--------|-----------|------|
| 1 | AWS VPC・サブネット設計 | ⬜ 未着手 | - |
| 2 | EC2 インスタンス起動・設定 | ⬜ 未着手 | - |
| 3 | RDS（MySQL 8.0）作成・設定 | ⬜ 未着手 | - |
| 4 | S3 バケット作成・設定（CORS・IAM） | ⬜ 未着手 | - |
| 5 | セキュリティグループ設定 | ⬜ 未着手 | - |
| 6 | Node.js / PM2 インストール | ⬜ 未着手 | - |
| 7 | 本番環境変数設定 | ⬜ 未着手 | - |
| 8 | フロントエンドビルド・デプロイ | ⬜ 未着手 | - |
| 9 | バックエンドデプロイ・PM2 起動 | ⬜ 未着手 | - |
| 10 | HTTPS 設定（SSL 証明書） | ⬜ 未着手 | - |
| 11 | 動作確認・スモークテスト | ⬜ 未着手 | - |

---

## 8. 既知の技術課題と TODO

| # | 課題 | 優先度 | 備考 |
|---|------|--------|------|
| 1 | 動画・音声プレイヤーの進捗自動保存ロジック（デバウンス付き） | 高 | Phase 3 で対応 |
| 2 | S3 メディア URL — 直接 URL かバックエンド経由の一時 URL か（セキュリティ観点から要検討） | 高 | S3 バケットはプライベートのまま推奨 |
| 3 | SSO トークン受け取りメカニズムを既存システムと要確認（WebView トークン受け渡しプロトコル） | 高 | PM と要協議 |
| 4 | 動画/音声プレイヤーで大容量ファイルのストリーミング（Range Request）対応 | 中 | S3 は Range Request を標準サポート |
| 5 | 管理者パネルのページネーションはサーバーサイドで実装する必要あり | 中 | Phase 2 で対応 |
| 6 | エラーハンドリング — API 接続エラーの表示 | 中 | Phase 3 で対応 |
| 7 | ローディング状態の表示（スケルトン UI） | 低 | Phase 3 で対応 |
| 8 | テキストコンテンツ用 Markdown レンダリングライブラリの選定 | 低 | `react-markdown` または `@uiw/react-md-editor` を検討 |

---

## 9. ドキュメント管理

| ドキュメント | ファイル | 最終更新日 |
|-------------|---------|-----------|
| システム概要 | `docs/01_system_overview.md` | 2026-04-06 |
| 詳細設計 | `docs/02_detailed_design.md` | 2026-04-06 |
| データベース設計 | `docs/03_database_design.md` | 2026-04-06 |
| API 設計 | `docs/04_api_design.md` | 2026-04-06 |
| プロジェクト進捗 | `docs/05_progress_status.md` | 2026-04-06 |
