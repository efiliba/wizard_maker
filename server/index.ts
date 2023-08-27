import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
// import { migrate  } from "drizzle-orm/better-sqlite3/migrator";
// import DataBase from "better-sqlite3";
import z from "zod";

import { publicProcedure, router } from "./trpc";
import { WizardsTable, ActiveWizardTable } from "@/db/schema";
import { WizardData } from '@/types';

neonConfig.fetchConnectionCache = true;

// const sqlite = new DataBase("sqlite.db");
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// migrate(db, { migrationsFolder: 'drizzle' });

export const appRouter = router({
  getWizards: publicProcedure.query(() => db.select().from(WizardsTable)),
  addWizard: publicProcedure
    .input(z.object({
      name: z.string(),
      createdBy: z.string(),
      wizard: z.any(),
    }))
    .mutation(async (opts) => {
      await db.insert(WizardsTable).values({
        name: opts.input.name,
        createdBy: opts.input.createdBy,
        wizard: opts.input.wizard,
      });
      
      const result = await db.update(ActiveWizardTable).set({ active: opts.input.name });
      console.log("Check result to determine if any records where added - upsert", JSON.stringify(result));
      
      if (result.rowCount === 0) {
        await db.insert(ActiveWizardTable).values({ active: opts.input.name });
      }

      return true;
    }),
  getActiveWizard: publicProcedure.query(() =>
     db
      .select({ wizard: WizardsTable.wizard })
      .from(WizardsTable)
      .rightJoin(ActiveWizardTable, eq(WizardsTable.name, ActiveWizardTable.active))
  ),
  setActiveWizard: publicProcedure
    .input(z.string())
    .mutation(async (opts) => {
      await db.update(ActiveWizardTable).set({ active: opts.input });
      return true;
    }),
  // deleteWizard: publicProcedure.input(z.number()).mutation(async (opts) => {
  //   await db.update(WizardsTable).set({ done: opts.input }).where(eq(WizardsTable.id, 1)).run();
  //   return true;
  // }),
});

export type AppRouter = typeof appRouter;
