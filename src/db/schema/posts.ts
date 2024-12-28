import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { timestamps } from "../columnHelper";

export const posts = sqliteTable("posts", {
	id: integer("id").primaryKey().notNull(),
	title: text("title").notNull(),
	context: text("context"),
	authorId: text("authorId")
		.notNull()
		.references(() => users.id),
	...timestamps,
});
