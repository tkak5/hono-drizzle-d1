import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "../columnHelper";

export const users = sqliteTable("users", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	hashPassword: text("hashPassword").notNull(),
	...timestamps,
});
