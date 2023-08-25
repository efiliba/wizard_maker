 import { sql } from "drizzle-orm";
 import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const wizards = sqliteTable('wizards', {
  name: text('name').primaryKey(),
  date: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  createdBy: text('created_by'),
  wizard: text('wizard'),
  deleteFlag: integer('delete_flag').default(0),
});

export type WizardRecord = typeof wizards.$inferSelect; // return type when queried

export const activeWizard = sqliteTable('active_wizard', {
  active: text('active').references(() => wizards.name),  // inline foreign key
});
