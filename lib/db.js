import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function helloWorld() {
  const start = Date.now();
  const [dbResponse] = await sql`SELECT NOW();`;
  const end = Date.now();
  return {data: dbResponse.now, latency: end - start};
}