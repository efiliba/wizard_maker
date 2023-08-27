import { helloWorld } from "@/lib/db";

export default async function BlogPage() {
  const { data, latency } = await helloWorld();

  return <main>
    <h1>New Blog Page {Date.now()}</h1>
    <pre>{JSON.stringify({ data, latency }, null, 2)}</pre>
  </main>
}

export const runtime = 'edge';
export const preferredRegion = 'sin1';
