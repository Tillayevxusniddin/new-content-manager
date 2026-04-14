# 04 API 設計

**最終更新日：** 2026-04-06

---

## 変更履歴（2026-04-06）

| # | セクション | 変更内容 | 理由 |
|---|-----------|---------|------|
| 1 | 共通レスポンスフォーマット | `message` フィールドを追加 | ユーザーへの成功/エラーメッセージ表示のため |
| 2 | 基本仕様 | ファイルアップロードに関する注記を明確化 | ファイルは S3 Presigned URL 経由でアップロードし、`multipart/form-data` はバックエンドを**経由しない** |
| 3 | GET /api/admin/books | `sortBy` と `sortOrder` パラメータを追加 | 管理者パネルでの多様なソートニーズに対応 |
| 4 | POST /api/progress/:bookId | `audioPositionSec` と `videoPositionSec` がオプションであることを明確化 | 該当メディアタイプのみ位置情報を送信する |
| 5 | Progress API | デフォルト値とページ概念がないことを説明 | 本プロジェクトでは完全な書籍ではなく要約（text/audio/video）を提供するため、「ページ」の概念は存在しない |

---

## 1. 基本仕様

| 項目 | 詳細 |
|------|------|
| ベース URL | `http(s)://<host>/api` |
| プロトコル | HTTPS（本番） / HTTP（開発） |
| フォーマット | JSON |
| 認証 | JWT Bearer Token |
| 文字コード | UTF-8 |
| API バージョン | v1（将来的に `/api/v2` への移行も可能） |

> **ファイルアップロードについて：**
> 音声・動画・画像ファイルは**バックエンドを経由してアップロードしません**。
> 代わりに S3 Presigned URL の仕組みを使用します：
> フロントエンドは `POST /api/admin/upload/presigned-url` で一時 URL を取得し、ファイルを**直接 S3 へ** `PUT` リクエストでアップロードします。
> これは Node.js サーバーへの負荷を避け、大容量ファイルのトラフィックを節約するためです。
> そのため、`Content-Type: multipart/form-data` は**この API では使用しません**。

### 共通リクエストヘッダー

```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>   ← 認証が必要なエンドポイントのみ
```

### 共通レスポンスフォーマット

**成功（オブジェクト）**
```json
{
  "success": true,
  "message": "正常に完了しました",
  "data": { "..." : "..." }
}
```

**ページネーション付き一覧**
```json
{
  "success": true,
  "message": "成功",
  "data": ["..."],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

**エラー**
```json
{
  "success": false,
  "message": "エラーが発生しました",
  "error": {
    "code": "エラーコード",
    "message": "エラーメッセージ",
    "details": [
      { "field": "title", "message": "タイトルは必須です" }
    ]
  }
}
```

> **`message` フィールドについて：**
> すべてのレスポンスに `message` フィールドが含まれます。このフィールドはフロントエンドでユーザーに表示するメッセージとして使用されます（例: toast/snackbar 通知）。
> 成功時の例: `"書籍を保存しました"`、`"カテゴリを削除しました"` など。

### エラーコード一覧

| コード | HTTP ステータス | 説明 |
|--------|---------------|------|
| `VALIDATION_ERROR` | 400 | バリデーションエラー |
| `UNAUTHORIZED` | 401 | 未認証（トークンなし or 無効） |
| `FORBIDDEN` | 403 | 権限不足 |
| `NOT_FOUND` | 404 | リソース未検出 |
| `CONFLICT` | 409 | 重複エラー |
| `INTERNAL_ERROR` | 500 | サーバー内部エラー |

---

## 2. 認証 API

### POST /api/auth/login

メールとパスワードによるログイン、JWT トークン発行。

**認証不要**

**リクエスト**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**レスポンス 200**
```json
{
  "success": true,
  "message": "ログインに成功しました",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "admin@example.com",
      "role": "ADMIN"
    }
  }
}
```

**エラー 401**
```json
{
  "success": false,
  "message": "メールアドレスまたはパスワードが正しくありません",
  "error": {
    "code": "UNAUTHORIZED",
    "message": "メールアドレスまたはパスワードが正しくありません"
  }
}
```

---

### POST /api/auth/sso

既存システムから取得した SSO トークンによるログイン。

**認証不要**

**リクエスト**
```json
{
  "ssoToken": "既存システムから受け取ったトークン"
}
```

**レスポンス 200**
```json
{
  "success": true,
  "message": "SSO ログインに成功しました",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "USER"
    }
  }
}
```

**エラー 401**
```json
{
  "success": false,
  "message": "SSO トークンが無効または期限切れです",
  "error": {
    "code": "UNAUTHORIZED",
    "message": "SSO トークンが無効または期限切れです"
  }
}
```

---

### GET /api/auth/me

現在ログイン中のユーザー情報を取得。

**認証必要**

**レスポンス 200**
```json
{
  "success": true,
  "message": "成功",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "USER",
    "createdAt": "2026-01-15T09:00:00.000Z"
  }
}
```

---

## 3. カテゴリ API（ユーザー）

### GET /api/categories

全カテゴリを取得。

**認証必要**

**レスポンス 200**
```json
{
  "success": true,
  "message": "成功",
  "data": [
    {
      "id": "uuid",
      "name": "マネジメント",
      "bookCount": 5
    },
    {
      "id": "uuid",
      "name": "自己啓発",
      "bookCount": 8
    }
  ]
}
```

---

## 4. 書籍 API（ユーザー）

### GET /api/books

書籍一覧を取得。

**認証必要**

**クエリパラメータ**

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `page` | number | - | ページ番号（デフォルト: 1） |
| `limit` | number | - | 1 ページあたりの件数（デフォルト: 20、最大: 100） |
| `search` | string | - | タイトルの部分検索 |
| `categoryId` | string | - | カテゴリでフィルタリング |
| `sortBy` | string | - | ソートフィールド（`createdAt` / `title`） |
| `sortOrder` | string | - | ソート順（`asc` / `desc`、デフォルト: `desc`） |

**レスポンス 200**
```json
{
  "success": true,
  "message": "成功",
  "data": [
    {
      "id": "uuid",
      "title": "7つの習慣",
      "description": "成功する人の 7 つの習慣について...",
      "coverUrl": "https://s3.../cover.jpg",
      "category": {
        "id": "uuid",
        "name": "自己啓発"
      },
      "hasText": true,
      "hasAudio": true,
      "hasVideo": true,
      "createdAt": "2026-01-15T09:00:00.000Z"
    }
  ],
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 20,
    "totalPages": 2
  }
}
```

---

### GET /api/books/:id

書籍の詳細情報とメディア URL を取得。

**認証必要**

**レスポンス 200**
```json
{
  "success": true,
  "message": "成功",
  "data": {
    "id": "uuid",
    "title": "7つの習慣",
    "description": "成功する人の 7 つの習慣について...",
    "coverUrl": "https://s3.../cover.jpg",
    "textContent": "## はじめに\n\nこの本では...",
    "audioUrl": "https://s3.../audio.mp3",
    "videoUrl": "https://s3.../video.mp4",
    "category": {
      "id": "uuid",
      "name": "自己啓発"
    },
    "createdAt": "2026-01-15T09:00:00.000Z",
    "updatedAt": "2026-01-20T14:00:00.000Z"
  }
}
```

**エラー 404**
```json
{
  "success": false,
  "message": "書籍が見つかりません",
  "error": { "code": "NOT_FOUND", "message": "書籍が見つかりません" }
}
```

---

## 5. 進捗 API

> **進捗とは？**
> ユーザーが書籍要約をどの状態で中断したかを保存します：
> - テキスト要約を読み終えたか（`isTextCompleted`）
> - 音声要約を何秒で停止したか（`audioPositionSec`）
> - 動画要約を何秒で停止したか（`videoPositionSec`）
>
> **注意：** 本プロジェクトでは完全な書籍ではなく、要約コンテンツ（text/audio/video）を提供します。
> そのため「書籍のページ」という概念は存在せず、進捗はメディアの再生位置と読書状態のみで管理します。

### GET /api/progress/:bookId

ユーザーの特定書籍に対する進捗を取得。

**認証必要**

> レコードが存在しない場合（ユーザーがまだ開始していない）、デフォルト値を返します：
> `isTextCompleted: false`、`audioPositionSec: 0`、`videoPositionSec: 0`

**レスポンス 200**
```json
{
  "success": true,
  "message": "成功",
  "data": {
    "bookId": "uuid",
    "isTextCompleted": false,
    "audioPositionSec": 245,
    "videoPositionSec": 0,
    "updatedAt": "2026-03-01T10:00:00.000Z"
  }
}
```

---

### POST /api/progress/:bookId

ユーザーの進捗を保存または更新（upsert）。

**認証必要**

> **動作仕様：**
> リクエストには更新が必要なフィールドのみを送信します。
> 例: 音声位置のみが変わった場合、`audioPositionSec` のみを送信します。
> 送信されなかったフィールドは変更されません。

**リクエスト**（すべてのフィールドはオプション、ただし最低 1 つ必要）
```json
{
  "isTextCompleted": true,
  "audioPositionSec": 512,
  "videoPositionSec": 320
}
```

**バリデーション**

| フィールド | 必須 | ルール |
|-----------|------|--------|
| `isTextCompleted` | - | boolean |
| `audioPositionSec` | - | 0 以上の整数 |
| `videoPositionSec` | - | 0 以上の整数 |

> 少なくとも 1 つのフィールドが必須です。それ以外の場合は `VALIDATION_ERROR` が返されます。

**レスポンス 200**
```json
{
  "success": true,
  "message": "進捗を保存しました",
  "data": {
    "bookId": "uuid",
    "isTextCompleted": true,
    "audioPositionSec": 512,
    "videoPositionSec": 320,
    "updatedAt": "2026-03-15T14:30:00.000Z"
  }
}
```

---

## 6. 管理者 API

### GET /api/admin/stats

ダッシュボード統計情報。

**認証必要 / 管理者ロール必要**

**レスポンス 200**
```json
{
  "success": true,
  "message": "成功",
  "data": {
    "totalBooks": 25,
    "totalCategories": 5,
    "totalUsers": 48,
    "recentlyAdded": [
      {
        "id": "uuid",
        "title": "新着書籍",
        "createdAt": "2026-04-01T09:00:00.000Z"
      }
    ]
  }
}
```

---

### GET /api/admin/books

管理者向け書籍一覧（全フィールド含む）。

**認証必要 / 管理者ロール必要**

**クエリパラメータ**

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `page` | number | - | ページ番号（デフォルト: 1） |
| `limit` | number | - | 1 ページあたりの件数（デフォルト: 20） |
| `search` | string | - | タイトルの部分検索 |
| `categoryId` | string | - | カテゴリでフィルタリング |
| `sortBy` | string | - | ソートフィールド（`createdAt` / `title`、デフォルト: `createdAt`） |
| `sortOrder` | string | - | ソート順（`asc` / `desc`、デフォルト: `desc`） |

**レスポンス 200**
```json
{
  "success": true,
  "message": "成功",
  "data": [
    {
      "id": "uuid",
      "title": "7つの習慣",
      "description": "...",
      "category": { "id": "uuid", "name": "自己啓発" },
      "coverUrl": "https://...",
      "hasText": true,
      "hasAudio": true,
      "hasVideo": false,
      "createdAt": "2026-01-15T09:00:00.000Z",
      "updatedAt": "2026-01-20T14:00:00.000Z"
    }
  ],
  "meta": { "total": 25, "page": 1, "limit": 20, "totalPages": 2 }
}
```

---

### POST /api/admin/books

新規書籍要約を作成。

**認証必要 / 管理者ロール必要**

> **`audioUrl` / `videoUrl` / `coverUrl` について：**
> これらのフィールドは S3 上のファイルパスを保存します。
> 先に `POST /api/admin/upload/presigned-url` でファイルを S3 にアップロードし、
> 返却された `fileKey` をこのフィールドに設定します。

**リクエスト**
```json
{
  "title": "新しい書籍タイトル",
  "description": "書籍の概要説明",
  "categoryId": "uuid",
  "coverUrl": "image/uuid-cover.jpg",
  "textContent": "## はじめに\n\nテキスト要約...",
  "audioUrl": "audio/uuid-book-audio.mp3",
  "videoUrl": "video/uuid-book-video.mp4"
}
```

**バリデーション**

| フィールド | 必須 | ルール |
|-----------|------|--------|
| `title` | ✅ | 1〜200 文字 |
| `categoryId` | ✅ | 存在するカテゴリ ID であること |
| `description` | - | 500 文字以内 |
| `coverUrl` | - | S3 ファイルキーまたは URL |
| `textContent` | - | 長文テキスト（Markdown） |
| `audioUrl` | - | S3 ファイルキーまたは URL |
| `videoUrl` | - | S3 ファイルキーまたは URL |

**レスポンス 201**
```json
{
  "success": true,
  "message": "書籍を作成しました",
  "data": {
    "id": "uuid",
    "title": "新しい書籍タイトル",
    "..." : "..."
  }
}
```

---

### PUT /api/admin/books/:id

書籍情報を更新。

**認証必要 / 管理者ロール必要**

**リクエスト**（変更したいフィールドのみ）
```json
{
  "title": "更新されたタイトル",
  "audioUrl": "audio/new-uuid-audio.mp3"
}
```

**レスポンス 200**
```json
{
  "success": true,
  "message": "書籍を更新しました",
  "data": { "id": "uuid", "..." : "..." }
}
```

---

### DELETE /api/admin/books/:id

書籍を削除。

**認証必要 / 管理者ロール必要**

**レスポンス 200**
```json
{
  "success": true,
  "message": "書籍を削除しました",
  "data": null
}
```

---

### GET /api/admin/categories

全カテゴリを取得（管理者ビュー）。

**認証必要 / 管理者ロール必要**

**レスポンス 200**
```json
{
  "success": true,
  "message": "成功",
  "data": [
    {
      "id": "uuid",
      "name": "マネジメント",
      "bookCount": 5,
      "createdAt": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### POST /api/admin/categories

新規カテゴリを作成。

**認証必要 / 管理者ロール必要**

**リクエスト**
```json
{
  "name": "ファイナンス"
}
```

**バリデーション**

| フィールド | 必須 | ルール |
|-----------|------|--------|
| `name` | ✅ | 1〜100 文字、ユニーク |

**レスポンス 201**
```json
{
  "success": true,
  "message": "カテゴリを作成しました",
  "data": { "id": "uuid", "name": "ファイナンス" }
}
```

**エラー 409（重複）**
```json
{
  "success": false,
  "message": "同じ名前のカテゴリが既に存在します",
  "error": { "code": "CONFLICT", "message": "同じ名前のカテゴリが既に存在します" }
}
```

---

### PUT /api/admin/categories/:id

カテゴリを更新。

**認証必要 / 管理者ロール必要**

**リクエスト**
```json
{
  "name": "更新されたカテゴリ名"
}
```

**レスポンス 200**
```json
{
  "success": true,
  "message": "カテゴリを更新しました",
  "data": { "id": "uuid", "name": "更新されたカテゴリ名" }
}
```

---

### DELETE /api/admin/categories/:id

カテゴリを削除。カテゴリに紐づく書籍が存在する場合は削除不可。

**認証必要 / 管理者ロール必要**

**レスポンス 200**
```json
{
  "success": true,
  "message": "カテゴリを削除しました",
  "data": null
}
```

**エラー 409（紐づく書籍が存在する）**
```json
{
  "success": false,
  "message": "このカテゴリに紐づく書籍が存在します。先に書籍を別のカテゴリに移動してください。",
  "error": {
    "code": "CONFLICT",
    "message": "このカテゴリに紐づく書籍が存在します。先に書籍を別のカテゴリに移動してください。"
  }
}
```

---

### POST /api/admin/upload/presigned-url

S3 へのファイルアップロード用の署名付き一時 URL（Presigned URL）を取得。

> **なぜ必要か？**
> 大容量の音声/動画ファイルを Node.js サーバーを経由させないため。
> フロントエンドがファイルデータを直接 S3 へアップロードすることで、サーバー負荷を軽減し高速化します。

**認証必要 / 管理者ロール必要**

**リクエスト**
```json
{
  "fileType": "audio",
  "contentType": "audio/mpeg",
  "fileName": "book-summary-audio.mp3"
}
```

**バリデーション**

| フィールド | 必須 | ルール |
|-----------|------|--------|
| `fileType` | ✅ | `audio` / `video` / `image` |
| `contentType` | ✅ | MIME タイプ（例: `audio/mpeg`、`video/mp4`、`image/jpeg`） |
| `fileName` | ✅ | 元のファイル名（S3 キー生成に使用） |

**レスポンス 200**
```json
{
  "success": true,
  "message": "アップロード URL を生成しました",
  "data": {
    "uploadUrl": "https://booksummary-media.s3.ap-northeast-1.amazonaws.com/audio/uuid-book-summary-audio.mp3?X-Amz-Algorithm=...",
    "fileKey": "audio/uuid-book-summary-audio.mp3",
    "expiresIn": 300
  }
}
```

**利用手順（フロントエンド）：**
1. `POST /api/admin/upload/presigned-url` を呼び出し、`uploadUrl` と `fileKey` を取得
2. `uploadUrl` に直接 `PUT` リクエストを送信（バイナリデータ＋`Content-Type` ヘッダー付き）
3. アップロード成功後、`fileKey` を書籍フォームに保存
4. `POST/PUT /api/admin/books` にて `audioUrl`/`videoUrl`/`coverUrl` として `fileKey` を使用

---

## 7. エンドポイント一覧

| メソッド | パス | 説明 | 認証 | ロール |
|---------|------|------|------|--------|
| POST | `/api/auth/login` | メール/パスワードログイン | 不要 | - |
| POST | `/api/auth/sso` | SSO ログイン | 不要 | - |
| GET | `/api/auth/me` | 現在のユーザー情報 | 必要 | 全ロール |
| GET | `/api/categories` | カテゴリ一覧 | 必要 | 全ロール |
| GET | `/api/books` | 書籍一覧 | 必要 | 全ロール |
| GET | `/api/books/:id` | 書籍詳細 | 必要 | 全ロール |
| GET | `/api/progress/:bookId` | 進捗取得 | 必要 | 全ロール |
| POST | `/api/progress/:bookId` | 進捗保存 | 必要 | 全ロール |
| GET | `/api/admin/stats` | ダッシュボード統計 | 必要 | admin |
| GET | `/api/admin/books` | 管理者書籍一覧 | 必要 | admin |
| POST | `/api/admin/books` | 書籍作成 | 必要 | admin |
| PUT | `/api/admin/books/:id` | 書籍更新 | 必要 | admin |
| DELETE | `/api/admin/books/:id` | 書籍削除 | 必要 | admin |
| GET | `/api/admin/categories` | 管理者カテゴリ一覧 | 必要 | admin |
| POST | `/api/admin/categories` | カテゴリ作成 | 必要 | admin |
| PUT | `/api/admin/categories/:id` | カテゴリ更新 | 必要 | admin |
| DELETE | `/api/admin/categories/:id` | カテゴリ削除 | 必要 | admin |
| POST | `/api/admin/upload/presigned-url` | S3 アップロード URL | 必要 | admin |
