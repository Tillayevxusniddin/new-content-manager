# 02 詳細設計

**最終更新日：** 2026-04-14

---

## 1. アーキテクチャ概要

本システムは **フロントエンド（Next.js）** と **バックエンド（Express API）** を分離して構成します。

```
┌──────────────────────────────────────────────────────────────────┐
│  フロントエンド（Next.js / App Router + FSD）                    │
│                                                                  │
│  app（ルーティング・ページ合成）                                   │
│   ├─ (auth)/login                                                 │
│   └─ (dashboard)/, /books, /admin                                 │
│                                                                  │
│  widgets（ページ単位の複合 UI）                                    │
│   ├─ header / sidebar / books-table / books-media                │
│                                                                  │
│  features（ユーザー操作単位）                                      │
│   ├─ form-login / dialog-create-book / dialog-create-category    │
│   └─ theme-toggle                                                  │
│                                                                  │
│  entities（ドメイン表現）                                          │
│   ├─ hero / carousel-categories / navlink                        │
│                                                                  │
│  shared（再利用基盤）                                              │
│   ├─ ui / hooks / lib / providers / types                        │
│   └─ ky API client + React Query + 認証コンテキスト                │
└──────────────────────────────────────────────────────────────────┘
                              │ HTTP/HTTPS
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│  バックエンド（Express API）                                        │
│                                                                    │
│  ┌───────────┐  ┌────────────┐  ┌───────────┐  ┌─────────────┐  │
│  │  Router   │→ │ Middleware │→ │Controller │→ │  Service    │  │
│  │  /auth    │  │ authJWT    │  │ auth      │  │  auth       │  │
│  │  /books   │  │ adminCheck │  │ book      │  │  book       │  │
│  │/categories│  │ validation │  │ category  │  │  category   │  │
│  │  /progress│  │errorHandler│  │ progress  │  │  progress   │  │
│  │  /admin   │  └────────────┘  │ admin     │  │  admin      │  │
│  │  /upload  │                  └───────────┘  └─────────────┘  │
│  └───────────┘                                                    │
│                              │                                    │
│  ┌───────────────────────────▼──────────────────────────────┐    │
│  │  Prisma ORM                                               │    │
│  └──────────────────────────┬───────────────────────────────┘    │
└─────────────────────────────┼────────────────────────────────────┘
                              │                     ┌──────────────┐
                              ▼                     │   AWS S3     │
                   ┌─────────────────┐              │（メディア保存）│
                   │  RDS MySQL 8.0  │              └──────────────┘
                   └─────────────────┘
```

---

## 2. フロントエンド詳細設計

### 2.1 UI/UX コンセプト

PM の要望と添付イメージを踏まえ、フロントエンドは「静的な管理画面」ではなく「読みたくなる・触りたくなる体験」を優先する。

#### 共通デザイン方針

- **Dark premium / glassmorphism 基調**: 黒ベースに、柔らかいグラデーションと半透明カードを重ねる
- **大型カバー主導**: 文字より先に表紙・サムネイルが目に入る構成
- **強い余白と大胆な比率**: Kindle のような一覧の見やすさと、Spotify のような没入感を両立
- **動きは控えめに高級感を出す**: hover、fade、scroll reveal、sticky header を中心に設計
- **モバイル優先**: 片手操作で理解できる情報密度、下方向スクロールで詳細が自然に展開される構成

#### 画面別コンセプト

| 画面 | UI イメージ | 主要表現 |
|------|------------|----------|
| 書籍一覧 | Kindle 風のストア UI | 大きいサムネイル、表紙中心のカード、カテゴリ棚、Continue Reading、検索バーの固定表示 |
| 書籍詳細 | Spotify 風の没入 UI | 画面上部に強いヒーロー、オーディオを主軸に据えたプレイヤー、下スクロールでテキスト/動画を展開 |
| 初回ログイン注意事項確認 | 最小限の集中 UI | 1 枚のカードに要点、チェックボックス、強い CTA、余計な操作を置かない |

#### 書籍一覧の見せ方

- Kindle のように「本を選ぶ」体験を優先し、**表紙画像を最大の入口**にする
- 一覧は一覧表ではなく、**読みたくなるカードグリッド**にする
- カテゴリは棚やチップとして見せ、書籍の並びにリズムを作る
- 「新着」「続きから」「おすすめ」など、目的別の導線を上部に置く
- ホバー時は軽い浮遊感と発光を付け、表紙を押したくなる演出にする

#### 書籍詳細の見せ方

- Spotify のように、**音声プレイヤーを主役**として上部に配置する
- ヒーロー領域は書籍カバーとグラデーション背景で構成し、没入感を出す
- メディア切り替えはタブではなく、**スクロールで自然に見える構成**を優先する
- 音声 → テキスト → 動画の順で閲覧できるようにし、下へ進むほど情報が深くなる
- テキストは読みやすい縦組みの余白感を意識し、動画は補助コンテンツとして扱う

#### 初回ログイン注意事項確認画面

- ログイン後にのみ表示する **オンボーディング/注意事項確認画面** を追加する
- 本文は後日差し替えられる前提で、今回は **画面レイアウトのみ** を先行実装する
- 推奨レイアウトは以下
       - 上部: 簡潔な見出し
       - 中央: 注意事項の本文エリア（仮テキスト可）
       - 下部: チェックボックス + 同意して続行ボタン
- スクロールの少ない 1 画面完結型にし、初回だけの儀式感を出す

#### 参考イメージの反映

- Spotify 画像のような **黒基調 + グラデーション + 大きいカード** を基礎にする
- Kindle 画像のような **サムネイル優先・棚感・読み物らしい配置** を一覧に取り込む
- そのうえで、本プロジェクト向けに「要約を短時間で選び、すぐ再生・読書できる」UI に最適化する

### 2.2 ディレクトリ構成

```
frontend/
└── src/
       ├── app/
       │   ├── layout.tsx                      # ルートレイアウト
       │   ├── globals.css
       │   ├── (auth)/
       │   │   ├── login/page.tsx              # ログインページ
       │   │   └── first-login/page.tsx        # 初回ログイン注意事項確認画面
       │   └── (dashboard)/
       │       ├── layout.tsx                  # ダッシュボード共通レイアウト
       │       ├── page.tsx                    # ホーム
       │       ├── books/
       │       │   ├── page.tsx
       │       │   └── [bookId]/
       │       │       ├── page.tsx
       │       │       └── not-found.tsx
       │       └── admin/
       │           ├── page.tsx
       │           ├── books/
       │           │   ├── page.tsx
       │           │   └── [bookId]/page.tsx
       │           ├── categories/page.tsx
       │           └── settings/page.tsx
       ├── widgets/
       │   ├── header/
       │   ├── sidebar/
       │   ├── books-table/
       │   └── books-media/
       ├── features/
       │   ├── form-login/
       │   ├── dialog-create-book/
       │   ├── dialog-create-category/
       │   └── theme-toggle/
       ├── entities/
       │   ├── hero/
       │   ├── carousel-categories/
       │   └── navlink.tsx
       ├── shared/
       │   ├── ui/                             # shadcn/ui ベース
       │   ├── hooks/                          # auth/use-progress/use-media-player
       │   ├── lib/                            # ky-init, query-client, utils, mock-data
       │   ├── providers/                      # Theme + QueryClient
       │   └── types/
       └── proxy.ts
```

### 2.3 認証フロー（フロントエンド）

```
【ログインページ】
       │ メール/パスワード または SSO ボタン
       ▼
【features/form-login + shared/hooks/auth-context.tsx】
       │ POST /api/auth/login  または  POST /api/auth/sso
       ▼
【API レスポンス】
   ├─ 成功: JWT トークンを localStorage に保存 → ホームページへリダイレクト
   └─ 失敗: エラーメッセージ表示

【初回ログイン判定】
               │（初回利用フラグの確認）
               ▼
       ├─ 初回ログイン: /first-login へ遷移
       └─ 2回目以降: ホームページ / 管理者ページへ遷移

【各ページ】
       │ shared/hooks/use-auth.ts による認証チェック
       ▼
   ├─ 未認証: /login へリダイレクト
   ├─ 管理者ページ ＋ user ロール: 403 ページ
   └─ 認証済み: ページを表示

【API リクエスト】
       │ shared/lib/ky-init.ts（ky インスタンス）
       ▼
   認証情報を付与して Express API へリクエスト
```

### 2.4 SSO ログインフロー

```
【ログインページ】→【SSO ボタン押下】
       │
       ▼
【既存システムからトークン取得】
       │（WebView 経由のトークン受け渡し または リダイレクトフロー）
       ▼
【POST /api/auth/sso { ssoToken }】
       │
       ▼
【バックエンド: SSO トークン検証 → 新規 JWT 発行】
       │
       ▼
【localStorage.setItem('token', jwt) → ホームページへリダイレクト】
```

### 2.5 初回ログイン注意事項確認フロー

```
【ログイン成功後】
       │
       ▼
【/first-login 画面を表示】
       │
       ├─ 注意事項本文（後日共有）
       ├─ チェックボックス
       └─ 続行ボタン
       ▼
【チェック済みで続行】
       │
       ▼
【初回確認済みフラグを保存】
       │（frontend 側の既存セッション情報に保存）
       ▼
【ホームページ / 管理者ページへ遷移】
```

### 2.6 メディアアップロードフロー（S3 Presigned URL）

```
【管理者: メディアアップロード】
       │ ファイル選択（動画/音声/画像）
       ▼
【POST /api/admin/upload/presigned-url { fileType, contentType }】
       │
       ▼
【バックエンド: S3 Presigned URL 生成】
       │ { uploadUrl, fileKey } を返却
       ▼
【フロントエンド: S3 へ直接 PUT リクエスト】
       │（大容量ファイルがバックエンドを経由しない）
       ▼
【アップロード完了後: fileKey を書籍フォームに保存】
       │
       ▼
【POST/PUT /api/admin/books { ..., audioUrl: fileKey, videoUrl: fileKey }】
```

### 2.7 状態管理

| 状態 | 管理方法 | 永続化 |
|------|---------|--------|
| 認証状態（ユーザー） | `shared/hooks/auth-context.tsx`（React Context） | localStorage |
| 検索/フィルター条件 | 各ページの useState | なし |
| メディアプレイヤー状態（位置・再生/停止） | `shared/hooks/use-media-player.ts` | なし（進捗 API に保存） |
| 進捗 | `shared/hooks/use-progress.ts` ＋ API | RDS DB |
| サーバー取得データ | React Query（`shared/providers/query-client-provider.tsx`） | メモリキャッシュ |

### 2.8 コンポーネント依存関係

```
app/layout.tsx
└── AuthProvider（shared/hooks/auth-context.tsx）
       └── Providers（Theme + QueryClient）
              └── app/(dashboard)/layout.tsx
                     └── Header（widgets/header）
                            └── 各ページ（app/*）
                                   ├── entities: Hero / CategoryCarousel
                                   ├── widgets: BookTable / Sidebar / BooksMedia
                                   ├── features: FormLogin / DialogCreateBook / DialogCreateCategory
                                   └── shared/ui: Button / Card / Dialog / Input ...
```

---

## 3. バックエンド詳細設計

### 3.1 ディレクトリ構成

```
backend/
├── src/
│   ├── index.ts                    # エントリーポイント
│   ├── app.ts                      # Express アプリ設定
│   ├── routes/
│   │   ├── auth.ts                 # 認証ルート
│   │   ├── books.ts                # 書籍ルート（ユーザー）
│   │   ├── categories.ts           # カテゴリルート
│   │   ├── progress.ts             # 進捗ルート
│   │   ├── admin/
│   │   │   ├── books.ts            # 管理者書籍管理
│   │   │   ├── categories.ts       # 管理者カテゴリ管理
│   │   │   ├── stats.ts            # ダッシュボード統計
│   │   │   └── upload.ts           # S3 Presigned URL
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── book.controller.ts
│   │   ├── category.controller.ts
│   │   ├── progress.controller.ts
│   │   └── admin/
│   │       ├── book.controller.ts
│   │       ├── category.controller.ts
│   │       ├── stats.controller.ts
│   │       └── upload.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── book.service.ts
│   │   ├── category.service.ts
│   │   ├── progress.service.ts
│   │   ├── upload.service.ts       # S3 Presigned URL ロジック
│   │   └── admin/
│   │       ├── book.service.ts
│   │       ├── category.service.ts
│   │       └── stats.service.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts      # JWT 検証
│   │   ├── admin.middleware.ts     # 管理者ロール検証
│   │   ├── validate.middleware.ts  # リクエストバリデーション
│   │   └── error.middleware.ts     # エラーハンドリング
│   ├── schemas/
│   │   ├── auth.schema.ts          # zod バリデーションスキーマ
│   │   ├── book.schema.ts
│   │   ├── category.schema.ts
│   │   └── progress.schema.ts
│   └── utils/
│       ├── jwt.ts                  # JWT ユーティリティ
│       ├── password.ts             # bcrypt ユーティリティ
│       ├── response.ts             # レスポンスフォーマット
│       └── s3.ts                   # AWS S3 クライアント
├── prisma/
│   ├── schema.prisma               # Prisma スキーマ
│   └── seed.ts                     # 初期データ
├── tests/
│   ├── unit/                       # ユニットテスト
│   ├── integration/                # 統合テスト
│   └── e2e/                        # E2E テスト（Playwright）
├── .env
├── .env.example
├── package.json
└── tsconfig.json
```

### 3.2 JWT 認証フロー

```
【クライアント】
       │ POST /api/auth/login { email, password }
       ▼
【auth.controller.ts】
       │ auth.service.loginUser(email, password)
       ▼
【auth.service.ts】
       │ DB からメールでユーザー取得
       │ bcrypt.compare(password, hashedPassword)
       ├─ 失敗: 401 Unauthorized
       └─ 成功: jwt.sign({ userId, role }, SECRET, { expiresIn: '24h' })
                → { token, user } を返却

【クライアント】
       │ localStorage.setItem('token', token)
       │ 以降のリクエスト: Authorization: Bearer <token>
       ▼
【auth.middleware.ts】
       │ jwt.verify(token, SECRET)
       ├─ 失敗: 401 Unauthorized
       └─ 成功: req.user = { userId, role }
                → 次の middleware/controller へ

【admin.middleware.ts】 ← 管理者ルートのみ
       │ req.user.role === 'ADMIN' チェック
       ├─ 失敗: 403 Forbidden
       └─ 成功: 次の処理へ
```

### 3.3 エラーハンドリング

すべての API は統一されたフォーマットでレスポンスを返します。

**成功レスポンス**
```json
{
  "success": true,
  "data": { "..." : "..." }
}
```

**ページネーション付き一覧取得**
```json
{
  "success": true,
  "data": ["..."],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

**エラーレスポンス**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "バリデーションエラーが発生しました",
    "details": [
      { "field": "title", "message": "タイトルは必須です" }
    ]
  }
}
```

**HTTP ステータスコード**

| コード | 説明 |
|--------|------|
| 200 | 成功（取得/更新） |
| 201 | 成功（作成） |
| 400 | バリデーションエラー |
| 401 | 認証エラー（トークンなし or 無効） |
| 403 | 権限エラー（権限不足） |
| 404 | リソース未検出 |
| 409 | 競合エラー（重複） |
| 500 | サーバー内部エラー |

---

## 4. セキュリティ設計

### 4.1 認証・認可

| 対策 | 実装方法 |
|------|---------|
| パスワードハッシュ | bcrypt（salt rounds: 12） |
| JWT 署名 | HS256、有効期限 24 時間 |
| HTTPS | EC2 ＋ SSL 証明書（Let's Encrypt または ACM） |
| CORS | Express cors ミドルウェア（フロントエンド origin のみ許可） |
| SSO トークン | 既存システムトークンを検証し、新規 JWT を発行 |

### 4.2 アクセス制御

| エンドポイント | 認証 | ロール |
|--------------|------|--------|
| POST /auth/login | 不要 | - |
| POST /auth/sso | 不要 | - |
| GET /categories | 必要 | user / admin |
| GET /books | 必要 | user / admin |
| GET /books/:id | 必要 | user / admin |
| GET /progress/:bookId | 必要 | user / admin |
| POST /progress/:bookId | 必要 | user / admin |
| GET /admin/stats | 必要 | admin のみ |
| POST /admin/books | 必要 | admin のみ |
| PUT /admin/books/:id | 必要 | admin のみ |
| DELETE /admin/books/:id | 必要 | admin のみ |
| POST /admin/upload/presigned-url | 必要 | admin のみ |

### 4.3 S3 セキュリティ

- メディアファイルへの直接アクセスを防ぐため、S3 バケットはプライベートモードで設定
- ファイル閲覧にはバックエンド経由の署名付き一時 URL または CloudFront を利用
- アップロードには Presigned URL のみ使用（有効期限：5 分）

---

## 5. テスト設計

### 5.1 テスト戦略（テストピラミッド）

```
           /\
          /E2E\        ← Playwright: ブラウザ操作テスト（少数・重要フロー）
         /──────\
        /   IT   \     ← Supertest: API 統合テスト（中程度）
       /──────────\
      /     UT     \   ← Jest: ユニットテスト（多数・ビジネスロジック）
     /──────────────\
```

### 5.2 ユニットテスト（UT）対象

| 対象 | テスト内容 |
|------|-----------|
| `auth.service.ts` | ログイン成功/失敗、JWT 生成 |
| `book.service.ts` | CRUD 操作、フィルタリング、ページネーション |
| `category.service.ts` | カテゴリ CRUD |
| `progress.service.ts` | 進捗の保存・取得 |
| `upload.service.ts` | Presigned URL 生成 |
| `jwt.ts` | トークン生成/検証/有効期限 |
| `password.ts` | ハッシュ化/比較 |

### 5.3 統合テスト（IT）対象

| 対象 | テスト内容 |
|------|-----------|
| `POST /auth/login` | 正常ログイン・誤パスワード・存在しないユーザー |
| `POST /auth/sso` | 正常 SSO トークン・無効トークン |
| `GET /books` | 一覧取得・フィルタリング・ページネーション |
| `GET /books/:id` | 詳細取得・存在しない ID |
| `POST /admin/books` | 作成・バリデーションエラー・認証エラー |
| `PUT /admin/books/:id` | 更新・存在しない ID |
| `POST /progress/:bookId` | 進捗保存 |
| `GET /progress/:bookId` | 進捗取得 |

### 5.4 E2E テスト（Playwright）対象

| シナリオ | テスト内容 |
|---------|-----------|
| ログインフロー | メール/パスワードログイン・SSO ログイン・エラー表示 |
| ホームページ | カテゴリ表示・おすすめ書籍 |
| 書籍一覧 | 表示・検索・カテゴリフィルター |
| 書籍詳細 | 動画タブ・音声タブ・テキストタブ |
| メディアプレイヤー | 動画視聴・音声再生・進捗保存 |
| 管理者: 書籍作成 | フォーム入力・メディアアップロード・送信 |
| 管理者: コンテンツ管理 | 編集・削除 |
| ロール制御 | 一般ユーザーによる管理者ページへのアクセス拒否 |

---

## 6. 環境設計

### 6.1 環境一覧

| 環境 | 目的 | インフラ |
|------|------|---------|
| ローカル（local） | 開発者の個人環境 | ローカル PC |
| 本番（production） | サービス提供環境 | EC2（t3.small 以上） |

### 6.2 環境変数

```env
# backend/.env

# サーバー設定
NODE_ENV=production
PORT=4000

# データベース
DATABASE_URL="mysql://user:password@rds-endpoint:3306/booksummary_db"

# JWT
JWT_SECRET=your-very-secure-secret-key
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=https://your-frontend-domain.com

# AWS S3
AWS_REGION=ap-northeast-1
AWS_S3_BUCKET_NAME=booksummary-media
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# Presigned URL 有効期限（秒）
S3_PRESIGNED_URL_EXPIRES=300
```

```env
# frontend/.env.local

NEXT_PUBLIC_API_URL=http://localhost:4000/api
```
