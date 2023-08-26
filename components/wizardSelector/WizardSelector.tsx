"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";

import { cn } from "@/lib/utils";
import { WizardData } from "@/types";
import { LoadWizard, SaveWizard } from "./components";

type WizardSelectorProps = {
  className?: string,
  initialWizards: Awaited<ReturnType<(typeof serverClient)["getWizards"]>>,
  initialActiveWizard: Awaited<ReturnType<(typeof serverClient)["getActiveWizard"]>>,
  wizard: WizardData,
  onActiveWizardChange: (wizard: WizardData, refresh?: boolean) => void,
};

export const WizardSelector = ({
  className,
  initialWizards,
  initialActiveWizard,
  wizard,
  onActiveWizardChange
}: WizardSelectorProps) => {
  useEffect(() => {
    onActiveWizardChange(initialActiveWizard[0]?.wizard!);
  }, [initialActiveWizard, onActiveWizardChange]);

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

  console.log("Selector getActiveWizard", JSON.stringify(getActiveWizard.data[0]?.wizard, null, 2));
  
  const setActiveWizard = trpc.setActiveWizard.useMutation({
    onSettled: async () => {
      console.log("Selector re-fetching getActiveWizard");
      await getActiveWizard.refetch();
    }
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
    setActiveWizard.mutate(name);

    onActiveWizardChange(getWizards.data.find(w => w.name === name)!.wizard, true);
  };

  const handleSaveWizard = (name: string) => {    
    saveWizard.mutate({ name, createdBy: 'Eli', wizard });
  };

  return (
    <>
      <div className={cn('sticky top-0 z-10 grid grid-flow-col justify-end gap-x-2 bg-black', className)}>
        <LoadWizard wizards={getWizards.data} onLoad={handleLoadWizard} />
        <SaveWizard onSave={handleSaveWizard} />
      </div>
      <br />
       Active Wizard:
       <pre>
         {JSON.stringify(getActiveWizard.data[0]?.wizard, null, 2)}
       </pre>
       Wizards:
       <pre>
         {JSON.stringify(getWizards.data, null, 2)}
       </pre>
    </>
  );
};
