"use client";

import { useState } from "react";

import { WizardRecord } from "@/types";
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
  wizards: WizardRecord[],
  onLoad: (name: string) => void,
};

export const LoadWizard = ({ wizards, onLoad }: Props) => {
  const [selectedWizard, setSelectedWizard] = useState<string>();

  const handleChange = (name: string) => setSelectedWizard(name);

  const handleLoad = () => {
    onLoad(selectedWizard!);
    setSelectedWizard(undefined);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button text="Load Wizard" variant="secondary" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Load Wizard</DialogTitle>
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
        <DialogFooter>
          <DialogClose asChild>
            <Button text="Load" disabled={!selectedWizard} onClick={handleLoad} />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
