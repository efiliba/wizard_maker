import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate  } from "drizzle-orm/better-sqlite3/migrator";
import DataBase from "better-sqlite3";
import z from "zod";

import { publicProcedure, router } from "./trpc";
import { wizards, activeWizard } from "@/db/schema";

import { WizardData } from '@/types';

const sqlite = new DataBase("sqlite.db");
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: 'drizzle' });

export const appRouter = router({
  getWizards: publicProcedure.query(() => db.select().from(wizards)),
  addWizard: publicProcedure
    .input(z.object({
      name: z.string(),
      createdBy: z.string(),
      wizard: z.any(),
    }))
    .mutation(async (opts) => {
      await db.insert(wizards).values({
        name: opts.input.name,
        createdBy: opts.input.createdBy,
        wizard: opts.input.wizard,
      });
      
      const { changes } = await db.update(activeWizard).set({ active: opts.input.name });
      if (changes === 0) {
        await db.insert(activeWizard).values({ active: opts.input.name });
      }

      return true;
    }),
  getActiveWizard: publicProcedure.query( () =>
     db
      .select({ wizard: wizards.wizard })
      .from(wizards)
      .rightJoin(activeWizard, eq(wizards.name, activeWizard.active))
  ),
  setActiveWizard: publicProcedure
    .input(z.string())
    .mutation(async (opts) => {
      await db.update(activeWizard).set({ active: opts.input }).run();
      return true;
    }),
  // deleteWizard: publicProcedure.input(z.number()).mutation(async (opts) => {
  //   await db.update(wizards).set({ done: opts.input }).where(eq(wizards.id, 1)).run();
  //   return true;
  // }),
});

export type AppRouter = typeof appRouter;
