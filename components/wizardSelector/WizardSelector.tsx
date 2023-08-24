"use client";

import { Button } from "@/components/ui";

import { WizardData } from "@/types";
import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";

type WizardSelectorProps = {
  initialWizards: Awaited<ReturnType<(typeof serverClient)["getWizards"]>>,
  initialActiveWizard: Awaited<ReturnType<(typeof serverClient)["getActiveWizard"]>>,
  wizard: WizardData,
};

export const WizardSelector = ({ initialWizards, initialActiveWizard, wizard }: WizardSelectorProps) => {
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

  const addWizard = trpc.addWizard.useMutation({
    onSettled: () => {
      getWizards.refetch();
      getActiveWizard.refetch();
    }
  });

  // const deleteWizard = trpc.deleteWizard.useMutation({
  //   onSettled: () => getWizards.refetch()
  // });

  const handleAddWizard = () => {
    const name = Date.now().toString();
    addWizard.mutate({ name, createdBy: 'Eli', wizard: JSON.stringify(wizard) });
  };

  return <div>
    <Button text="Add Wizard" onClick={handleAddWizard} />
    {/* <Button text="Delete Last Todo" onClick={() => deleteTodo.mutate(1)} /> */}
    <br />
    Active Wizard:
    <pre>
      {JSON.stringify(getActiveWizard.data, null, 2)}
    </pre>
    Wizards:
    <pre>
      {JSON.stringify(getWizards.data, null, 2)}
    </pre>
  </div>;
}
