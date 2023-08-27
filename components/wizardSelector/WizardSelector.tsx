"use client";

import { useEffect } from "react";
import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";

import { cn } from "@/lib/utils";
import { WizardData } from "@/types";
import { LoadWizard, SaveWizard } from "./components";

type WizardSelectorProps = {
  className?: string,
  initialWizards: Awaited<ReturnType<(typeof serverClient)["getWizards"]>>,
  selectedWizard: Awaited<ReturnType<(typeof serverClient)["getActiveWizard"]>>,
  wizard: WizardData,
  onActiveWizardChange: (wizard: WizardData) => void,
};

export const WizardSelector = ({
  className,
  initialWizards,
  selectedWizard,
  wizard,
  onActiveWizardChange
}: WizardSelectorProps) => {
  useEffect(() => {
    onActiveWizardChange(selectedWizard[0]?.wizard!);
  }, []);

  const getWizards = trpc.getWizards.useQuery(undefined, {
     initialData: initialWizards,
     refetchOnMount: false,
     refetchOnReconnect: false,
  });
  
  const setActiveWizard = trpc.setActiveWizard.useMutation();

  const saveWizard = trpc.addWizard.useMutation({
    onSettled: () => getWizards.refetch()
  });

  const handleLoadWizard = (name: string) => {
    setActiveWizard.mutate(name);

    // @ts-ignore
    onActiveWizardChange(getWizards.data.find(w => w.name === name)!.wizard);
  };

  const handleSaveWizard = (name: string) => {    
    saveWizard.mutate({ name, createdBy: 'Eli', wizard });
  };

  return (
    <div className={cn('sticky top-0 z-10 grid grid-flow-col justify-end gap-x-2 bg-black', className)}>
      <LoadWizard wizards={getWizards.data} onLoad={handleLoadWizard} />
      <SaveWizard onSave={handleSaveWizard} />
    </div>
  );
};
