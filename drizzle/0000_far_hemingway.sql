CREATE TABLE `beta_requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`organization` text DEFAULT '' NOT NULL,
	`role` text DEFAULT '' NOT NULL,
	`use_case` text DEFAULT '' NOT NULL,
	`consent` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `beta_requests_email_unique` ON `beta_requests` (`email`);