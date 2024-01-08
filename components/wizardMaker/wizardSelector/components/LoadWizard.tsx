"use client";

import { useState } from "react";

import type { WizardRecord } from "@/types";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";

type Props = {
  editMode: boolean,
  wizards: WizardRecord[],
  onLoad: (name: string) => void,
  onDelete: (name: string) => void,
};

export const LoadWizard = ({ editMode, wizards, onLoad, onDelete }: Props) => {
  const [selectedWizard, setSelectedWizard] = useState<string>();

  const handleChange = (name: string) => setSelectedWizard(name);

  const handleLoad = (name?: string) => () => {
    onLoad(name!);
    setSelectedWizard(undefined);
  };
  
  const handleDelete = (name?: string) => () => {
    onDelete(name!);
    setSelectedWizard(undefined);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Load Wizard</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Load Wizard</DialogTitle>
          <DialogDescription>
            <TooltipProvider delayDuration={0}>
              <Select onValueChange={handleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a wizard to load:" />
                </SelectTrigger>
                <SelectContent>
                  {wizards.map(({ name, wizard }) =>
                    <SelectItem key={name} value={name}>
                      <Tooltip >
                        <TooltipTrigger>{name}</TooltipTrigger>
                        <TooltipContent side="right">
                          <pre>{wizard.question}</pre>
                        </TooltipContent>
                      </Tooltip>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </TooltipProvider>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-y-2">
          {editMode &&
            <Button variant="destructive" disabled={!selectedWizard} onClick={handleDelete(selectedWizard)}>
              Delete
            </Button>
          }
          <DialogClose asChild>
            <Button disabled={!selectedWizard} onClick={handleLoad(selectedWizard)}>Load</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
