CREATE TABLE `active_wizard` (
	`active` text,
	FOREIGN KEY (`active`) REFERENCES `wizards`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `wizards` (
	`name` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`created_by` text,
	`wizard` text,
	`delete_flag` integer DEFAULT 0
);
