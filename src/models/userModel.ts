import { drizzle } from "drizzle-orm/d1";
import { users } from "../db/schema/users";
import { createInsertSchema } from "drizzle-zod";

export const userInsertSchema = createInsertSchema(users);

export const create = async (
	DB: D1Database,
	id: string,
	name: string,
	password: string,
) => {
	const db = drizzle(DB);
	const user = await db.insert(users).values({
		id,
		name,
		hashPassword: password,
	});
	return user;
};
