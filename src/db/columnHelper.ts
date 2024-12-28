// columns.helpers.ts
import { integer } from "drizzle-orm/sqlite-core";
export const timestamps = {
	updatedAt: integer("updated_at", { mode: "timestamp" }),
	createdAt: integer("created_at", { mode: "timestamp" }),
};
