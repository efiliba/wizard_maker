import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
// import { migrate  } from "drizzle-orm/better-sqlite3/migrator";
// import DataBase from "better-sqlite3";
import z from "zod";

import { publicProcedure, router } from "./trpc";
import { WizardsTable, ActiveWizardTable } from "@/db/schema";
import { WizardData, WizardStep, wizardStep } from "@/types";

neonConfig.fetchConnectionCache = true;

// const sqlite = new DataBase("sqlite.db");
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// migrate(db, { migrationsFolder: 'drizzle' });

const isWizardData = (wizard: WizardStep): wizard is WizardData => 'question' in wizard;

export const appRouter = router({
  getWizards: publicProcedure
    .query(() => db.select().from(WizardsTable)
    .where(eq(WizardsTable.deleteFlag, false))
  ),
  addWizard: publicProcedure
    .input(z.object({
      name: z.string(),
      createdBy: z.string(),
      wizard: wizardStep
    }))
    .mutation(async ({ input: { name, createdBy, wizard } }) => {
      if (isWizardData(wizard)) {
        await db.insert(WizardsTable).values({ name, createdBy, wizard });
        
        const result = await db.update(ActiveWizardTable).set({ active: name });
        if (result.rowCount === 0) {
          await db.insert(ActiveWizardTable).values({ active: name });
        }

        return true;
      }
    }),
  getActiveWizard: publicProcedure.query(async () =>
    (await db
      .select({ wizard: WizardsTable.wizard })
      .from(WizardsTable)
      .rightJoin(ActiveWizardTable, eq(WizardsTable.name, ActiveWizardTable.active))
      .limit(1))[0]
  ),
  setActiveWizard: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await db.update(ActiveWizardTable).set({ active: input });
      return true;
    }),
  deleteWizard: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await db.update(WizardsTable).set({ deleteFlag: true }).where(eq(WizardsTable.name, input));
      return true;
    }),
});

export type AppRouter = typeof appRouter;
