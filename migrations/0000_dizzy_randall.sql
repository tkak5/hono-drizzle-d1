CREATE TABLE `posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`context` text,
	`authorId` text NOT NULL,
	`updated_at` integer,
	`created_at` integer,
	FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`hashPassword` text NOT NULL,
	`updated_at` integer,
	`created_at` integer
);
