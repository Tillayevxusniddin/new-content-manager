# 03 データベース設計

**最終更新日：** 2026-04-06

---

## 1. 基本情報

| 項目 | 詳細 |
|------|------|
| DBMS | MySQL 8.0 |
| インフラ | AWS RDS |
| データベース名 | `booksummary_db` |
| 文字コード | utf8mb4 |
| 照合順序 | utf8mb4_unicode_ci |
| ORM | Prisma 5.x |

---

## 2. ER 図

```
┌─────────────────┐
│      users      │
├─────────────────┤
│ id (PK)         │
│ email (UNIQUE)  │
│ password_hash   │
│ role            │
│ created_at      │
│ updated_at      │
└────────┬────────┘
         │ 1
         │
         │ N
┌────────▼────────────────────────────────────────────┐
│                   user_progress                      │
├──────────────────────────────────────────────────────┤
│ id (PK)                                              │
│ user_id (FK -> users.id)                             │
│ book_id (FK -> book_summaries.id)                    │
│ is_text_completed                                    │
│ audio_position_sec                                   │
│ video_position_sec                                   │
│ updated_at                                           │
└──────────────────────────┬───────────────────────────┘
                           │ N
                           │ 1
┌──────────────────────────▼───────────────────────────┐
│                   book_summaries                      │
├──────────────────────────────────────────────────────┤
│ id (PK)                                              │
│ title                                                │
│ description                                          │
│ category_id (FK -> categories.id)                    │
│ cover_url                                            │
│ text_content                                         │
│ audio_url                                            │
│ video_url                                            │
│ created_at                                           │
│ updated_at                                           │
└──────────────────────────┬───────────────────────────┘
                           │ N
                           │ 1
                ┌──────────▼──────────┐
                │      categories     │
                ├─────────────────────┤
                │ id (PK)             │
                │ name (UNIQUE)       │
                │ created_at          │
                │ updated_at          │
                └─────────────────────┘
```

---

## 3. テーブル定義

### 3.1 users（ユーザー）

| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|-----|------|-----------|------|
| `id` | VARCHAR(36) | NOT NULL | UUID | 主キー |
| `email` | VARCHAR(255) | NOT NULL | - | メールアドレス（ユニーク） |
| `password_hash` | VARCHAR(255) | NULL | NULL | bcrypt ハッシュ（SSO ユーザーは null の場合あり） |
| `role` | ENUM('ADMIN','USER') | NOT NULL | 'USER' | ユーザーロール |
| `created_at` | DATETIME(3) | NOT NULL | NOW() | 作成日時 |
| `updated_at` | DATETIME(3) | NOT NULL | NOW() | 更新日時 |

**インデックス**
- PRIMARY KEY: `id`
- UNIQUE INDEX: `email`

---

### 3.2 categories（カテゴリ）

| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|-----|------|-----------|------|
| `id` | VARCHAR(36) | NOT NULL | UUID | 主キー |
| `name` | VARCHAR(100) | NOT NULL | - | カテゴリ名（例: 「マネジメント」） |
| `created_at` | DATETIME(3) | NOT NULL | NOW() | 作成日時 |
| `updated_at` | DATETIME(3) | NOT NULL | NOW() | 更新日時 |

**インデックス**
- PRIMARY KEY: `id`
- UNIQUE INDEX: `name`

---

### 3.3 book_summaries（書籍要約）

| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|-----|------|-----------|------|
| `id` | VARCHAR(36) | NOT NULL | UUID | 主キー |
| `title` | VARCHAR(200) | NOT NULL | - | 書籍タイトル |
| `description` | TEXT | NULL | NULL | 概要説明 |
| `category_id` | VARCHAR(36) | NOT NULL | - | カテゴリ ID（FK） |
| `cover_url` | TEXT | NULL | NULL | S3 カバー画像 URL |
| `text_content` | LONGTEXT | NULL | NULL | テキスト要約（Markdown） |
| `audio_url` | TEXT | NULL | NULL | S3 音声ファイル URL またはキー |
| `video_url` | TEXT | NULL | NULL | S3 動画ファイル URL またはキー |
| `created_at` | DATETIME(3) | NOT NULL | NOW() | 作成日時 |
| `updated_at` | DATETIME(3) | NOT NULL | NOW() | 更新日時 |

**インデックス**
- PRIMARY KEY: `id`
- INDEX: `category_id`
- INDEX: `created_at`（新着順ソート用）

**外部キー**
- `category_id` -> `categories.id`（ON DELETE RESTRICT）

---

### 3.4 user_progress（ユーザー進捗）

| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|-----|------|-----------|------|
| `id` | VARCHAR(36) | NOT NULL | UUID | 主キー |
| `user_id` | VARCHAR(36) | NOT NULL | - | ユーザー ID（FK） |
| `book_id` | VARCHAR(36) | NOT NULL | - | 書籍 ID（FK） |
| `is_text_completed` | TINYINT(1) | NOT NULL | 0 | テキスト読了フラグ |
| `audio_position_sec` | INT | NOT NULL | 0 | 音声再生位置（秒） |
| `video_position_sec` | INT | NOT NULL | 0 | 動画視聴位置（秒） |
| `updated_at` | DATETIME(3) | NOT NULL | NOW() | 最終更新日時 |

**インデックス**
- PRIMARY KEY: `id`
- UNIQUE INDEX: `(user_id, book_id)` — ユーザー/書籍ペアごとに 1 レコード
- INDEX: `book_id`

**外部キー**
- `user_id` -> `users.id`（ON DELETE CASCADE）
- `book_id` -> `book_summaries.id`（ON DELETE CASCADE）

---

## 4. Prisma スキーマ

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  USER
}

model User {
  id           String         @id @default(uuid())
  email        String         @unique @db.VarChar(255)
  passwordHash String?        @map("password_hash") @db.VarChar(255)
  role         Role           @default(USER)
  createdAt    DateTime       @default(now()) @map("created_at")
  updatedAt    DateTime       @updatedAt @map("updated_at")
  progress     UserProgress[]

  @@map("users")
}

model Category {
  id           String        @id @default(uuid())
  name         String        @unique @db.VarChar(100)
  createdAt    DateTime      @default(now()) @map("created_at")
  updatedAt    DateTime      @updatedAt @map("updated_at")
  books        BookSummary[]

  @@map("categories")
}

model BookSummary {
  id          String         @id @default(uuid())
  title       String         @db.VarChar(200)
  description String?        @db.Text
  categoryId  String         @map("category_id")
  coverUrl    String?        @db.Text @map("cover_url")
  textContent String?        @db.LongText @map("text_content")
  audioUrl    String?        @db.Text @map("audio_url")
  videoUrl    String?        @db.Text @map("video_url")
  createdAt   DateTime       @default(now()) @map("created_at")
  updatedAt   DateTime       @updatedAt @map("updated_at")
  category    Category       @relation(fields: [categoryId], references: [id])
  progress    UserProgress[]

  @@index([categoryId])
  @@index([createdAt])
  @@map("book_summaries")
}

model UserProgress {
  id                String      @id @default(uuid())
  userId            String      @map("user_id")
  bookId            String      @map("book_id")
  isTextCompleted   Boolean     @default(false) @map("is_text_completed")
  audioPositionSec  Int         @default(0) @map("audio_position_sec")
  videoPositionSec  Int         @default(0) @map("video_position_sec")
  updatedAt         DateTime    @updatedAt @map("updated_at")
  user              User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  book              BookSummary @relation(fields: [bookId], references: [id], onDelete: Cascade)

  @@unique([userId, bookId])
  @@index([bookId])
  @@map("user_progress")
}
```

---

## 5. マイグレーションと初期データ

### 5.1 実行手順

```bash
# マイグレーション実行
npx prisma migrate deploy

# 初期データ投入
npx prisma db seed
```

### 5.2 シーダー内容（prisma/seed.ts）

| データ | 件数 | 説明 |
|--------|------|------|
| Category | 5 件 | マネジメント・自己啓発・ファイナンス・マーケティング・テクノロジー |
| User (ADMIN) | 1 件 | システム管理者 |
| User (USER) | 3 件 | サンプル社員 |
| BookSummary | 10 件 | 各カテゴリ 2 冊のサンプル書籍 |

---

## 6. RDS 設定推奨値

| パラメータ | 開発環境 | 本番環境 |
|-----------|---------|---------|
| インスタンスクラス | db.t3.micro | db.t3.small |
| ストレージ容量 | 20GB (gp2) | 20GB (gp3)、自動拡張有効 |
| バックアップ保持期間 | 1 日 | 7 日 |
| Multi-AZ | 無効 | 有効（推奨） |
| 暗号化 | 有効 | 有効 |
| character_set_server | utf8mb4 | utf8mb4 |
| collation_server | utf8mb4_unicode_ci | utf8mb4_unicode_ci |
