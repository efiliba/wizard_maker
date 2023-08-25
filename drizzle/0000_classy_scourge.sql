CREATE TABLE `active_wizard` (
	`active` text NOT NULL,
	FOREIGN KEY (`active`) REFERENCES `wizards`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `wizards` (
	`name` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_by` text NOT NULL,
	`wizard` blob NOT NULL,
	`delete_flag` integer DEFAULT false NOT NULL
);
