import { Maker } from "@/components";
import { Wizards } from "./_components/Wizards";
import { serverClient } from "./_trpc/serverClient";

export default async function Home() {
  const wizards = await  serverClient.getWizards();
 
  return (
    <main>
      <Maker />
      <Wizards initialWizards={wizards} />
    </main>
  );
}
