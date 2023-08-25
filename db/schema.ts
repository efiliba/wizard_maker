 import { sql } from "drizzle-orm";
 import { sqliteTable, integer, text, blob } from "drizzle-orm/sqlite-core";

 import { WizardData } from '@/types';

export const wizards = sqliteTable('wizards', {
  name: text('name').notNull().primaryKey(),
  date: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  createdBy: text('created_by').notNull(),
  wizard: blob('wizard', { mode: 'json' }).notNull().$type<WizardData>(),
  deleteFlag: integer('delete_flag', { mode: 'boolean' }).notNull().default(false),
});

export type WizardRecord = typeof wizards.$inferSelect; // return type when queried

export const activeWizard = sqliteTable('active_wizard', {
  active: text('active').notNull().references(() => wizards.name),  // inline foreign key
});
