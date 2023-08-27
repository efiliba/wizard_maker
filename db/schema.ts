// @ts-nocheck
import { pgTable, text, timestamp, boolean, json } from "drizzle-orm/pg-core";

import { WizardData } from '@/types';

export const WizardsTable = pgTable('wizards', {
  name: text('name').primaryKey().notNull(),
  date: timestamp('created_at').defaultNow(),
  createdBy: text('created_by').notNull(),
  wizard: json('wizard').$type<WizardData>().notNull(),
  deleteFlag: boolean('delete_flag').default(false).notNull(),
});

export type WizardRecord = typeof WizardsTable.$inferSelect; // return type when queried

export const ActiveWizardTable = pgTable('active_wizard', {
  active: text('active').notNull().references(() => WizardsTable.name),  // inline foreign key
});
