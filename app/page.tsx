import { WizardMaker } from "@/components";

export default function Page({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  return (
    <main>
      <WizardMaker editMode={searchParams?.edit === 'true'}/>
    </main>
  );
}