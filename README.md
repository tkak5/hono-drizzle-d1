# hono + drizzle + D1
```
pnpm i
pnpm run dev
```

```
pnpm run deploy
```
## セットアップ手順
1. 必要パッケージの追加
   dotenvは-D、もしくは不要かもしれない。
   ```
   pnpm add drizzle-orm dotenv
   pnpm add -D drizzle-kit
   ```
2. wrangler.tomlの追記
   ```
   [[ d1_databases ]]
   binding = "DB"
   database_name = "YOUR DB NAME"
   database_id = "YOUR DB ID"
   migrations_dir = "migrations"
   ```
3. drizzle.config.tsの作成
   ```
   import { defineConfig } from 'drizzle-kit';

   export default defineConfig({
     schema: './drizzle/schema.ts',
     out: './migrations',
     dialect: 'sqlite',
     driver: 'd1-http',
     dbCredentials: {
       accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
       databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
       token: process.env.CLOUDFLARE_D1_TOKEN!,
     },
   });
   ```
4. .envファイルの作成
   ```
   CLOUDFLARE_ACCOUNT_ID=
   CLOUDFLARE_DATABASE_ID=
   CLOUDFLARE_D1_TOKEN=
   ```
5. drizzle/schema.tsの作成
   - 場所は`drizzle.config.ts`のschemaと一致していればどこでもいい。
   - sqliteのスキーマで作成する。
   ```
   import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

   export const users = sqliteTable('users', {
     id: integer('id').primaryKey().notNull(),
     name: text('name').notNull(),
   });
   ```
6. マイグレーションファイルの作成
   ```
   npx drizzle-kit generate
   ```
7. マイグレーションの実行
   - ローカル
     ```
     npx wrangler d1 migrations apply hono-drizzle --local
     ```
   - リモート
     ```
     npx wrangler d1 migrations apply hono-drizzle --remote
     ```
## API中のクエリの実行

## tips
### ローカルのd１を削除する
`.wrangler/state/d1/miniflare-D1DatabaseObject`内のファイルを全て削除する。
