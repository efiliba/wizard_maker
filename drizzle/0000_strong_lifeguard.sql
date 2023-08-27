CREATE TABLE IF NOT EXISTS "active_wizard" (
	"active" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wizards" (
	"name" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"wizard" json NOT NULL,
	"delete_flag" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "active_wizard" ADD CONSTRAINT "active_wizard_active_wizards_name_fk" FOREIGN KEY ("active") REFERENCES "wizards"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
