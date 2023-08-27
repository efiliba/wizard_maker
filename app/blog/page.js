import { addWizard, getWizards } from "@/lib/db";

export default async function BlogPage() {
  // const response = await addWizard();
  const response = await getWizards();

  return <main>
    <h1>Blog Page {Date.now()}</h1>
    <pre>{JSON.stringify(response, null, 2)}</pre>
  </main>
}

export const runtime = 'edge';
export const preferredRegion = 'sin1';
