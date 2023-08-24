"use client";

import { Button } from "@/components/ui";

import { trpc } from "../_trpc/client";
import { serverClient } from "../_trpc/serverClient";

type WizardProps = {
  initialWizards: Awaited<ReturnType<(typeof serverClient)["getWizards"]>>
};

export const Wizards = ({ initialWizards }: WizardProps) => {
  const getWizards = trpc.getWizards.useQuery(undefined, {
     initialData: initialWizards,
     refetchOnMount: false,
     refetchOnReconnect: false,
  });

  const getActiveWizard = trpc.getActiveWizard.useQuery();

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
    addWizard.mutate({ name, createdBy: 'Eli', wizard: Date.now().toString() });
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
