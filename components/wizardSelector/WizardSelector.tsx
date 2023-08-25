"use client";

import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";

import { WizardData } from "@/types";
import { LoadWizard, SaveWizard } from "./components";

type WizardSelectorProps = {
  initialWizards: Awaited<ReturnType<(typeof serverClient)["getWizards"]>>,
  initialActiveWizard: Awaited<ReturnType<(typeof serverClient)["getActiveWizard"]>>,
  wizard: WizardData,
  onActiveWizardChange: (wizard: string) => void,
};

export const WizardSelector = ({ initialWizards, initialActiveWizard, wizard, onActiveWizardChange }: WizardSelectorProps) => {
  const getWizards = trpc.getWizards.useQuery(undefined, {
     initialData: initialWizards,
     refetchOnMount: false,
     refetchOnReconnect: false,
  });

  const getActiveWizard = trpc.getActiveWizard.useQuery(undefined, {
    initialData: initialActiveWizard,
    refetchOnMount: false,
    refetchOnReconnect: false,
 });

  const setActiveWizard = trpc.setActiveWizard.useMutation({
    onSettled: () => getActiveWizard.refetch()
  });

  const saveWizard = trpc.addWizard.useMutation({
    onSettled: () => {
      getWizards.refetch();
      getActiveWizard.refetch();
      // const { data: [{ wizard }] = [] } = await getActiveWizard.refetch();

      // onActiveWizardChange(wizard || '{}');
    }
  });

  // const deleteWizard = trpc.deleteWizard.useMutation({
  //   onSettled: () => getWizards.refetch()
  // });

  const handleLoadWizard = (name: string) => {    
    saveWizard.mutate({ name, createdBy: 'Eli', wizard: JSON.stringify(wizard) });
  };

  const handleSaveWizard = (name: string) => {    
    saveWizard.mutate({ name, createdBy: 'Eli', wizard: JSON.stringify(wizard) });
  };

  return <div>
    <LoadWizard wizards={getWizards.data} onLoad={handleLoadWizard} />
    <SaveWizard onSave={handleSaveWizard} />
    {/* <Button text="Delete Last Todo" onClick={() => deleteTodo.mutate(1)} /> */}
    <br />
    Client Active Wizard:
    <pre>
      {JSON.stringify(getActiveWizard.data, null, 2)}
    </pre>
    Wizards:
    <pre>
      {JSON.stringify(getWizards.data, null, 2)}
    </pre>
  </div>;
}