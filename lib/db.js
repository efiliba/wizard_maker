import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";

import { wizards } from "@/db/schema";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL);

const db = drizzle(sql);

// getWizards: publicProcedure.query(() => db.select().from(wizards)),
export async function addWizard() {
  const newWizard = {
    name: 'First',
    createdBy: 'Eli',
    wizard: { question: 'Hello Question' },
  };
  return await db.insert(wizards).values(newWizard).returning();
}

export async function getWizards() {
  // getWizards: publicProcedure.query(() => db.select().from(wizards)),
  return await db.select().from(wizards);
}
