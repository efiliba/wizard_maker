import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate  } from "drizzle-orm/better-sqlite3/migrator";
import DataBase from "better-sqlite3";
import z from "zod";

import { publicProcedure, router } from "./trpc";
import { wizards, activeWizard } from "@/db/schema";

const sqlite = new DataBase("sqlite.db");
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: 'drizzle' });

export const appRouter = router({
  getWizards: publicProcedure.query(async () => {
    return await db.select().from(wizards).all();
  }),
  addWizard: publicProcedure
    .input(z.object({
      name: z.string(),
      createdBy: z.string(),
      wizard: z.string(),
    }))
    .mutation(async (opts) => {
      await db.insert(wizards).values({
        name: opts.input.name,
        createdBy: opts.input.createdBy,
        wizard: opts.input.wizard,
      }).run();
      
      const { changes } = await db.update(activeWizard).set({ active: opts.input.name }).run();
      if (changes === 0) {
        await db.insert(activeWizard).values({ active: opts.input.name }).run();
      }

      return true;
    }),
  getActiveWizard: publicProcedure.query(async () => {
    return await db.select().from(activeWizard).all();
  }),
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
