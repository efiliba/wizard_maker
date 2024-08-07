import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  // driver: "better-sqlite",
  // dbCredentials: {
  //   url: "sqlite.db",
  // },
} satisfies Config;
