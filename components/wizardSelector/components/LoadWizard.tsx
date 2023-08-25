"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";

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
} from "@/components/ui";

type Props = {
  wizards: any,
  onLoad: (name: string) => void,
};

export const LoadWizard = ({ wizards, onLoad }: Props) => {
  const [open, setOpen] = useState(false);

  const [wizardName, setWizardName] = useState('');

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => setWizardName(target.value);

  const handleLoad = () => onLoad(wizardName.trim());

  const handleKeyPress = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter" && wizardName.trim().length > 0) {
      handleLoad();
      setOpen(false);
    }
  };

  const handleOpenChange = () => setOpen(toggle => !toggle);;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button text="Load Wizard" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Load Wizard</DialogTitle>
          <DialogDescription>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a wizard to load:" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <pre>
              {JSON.stringify(wizards, null, 2)}
            </pre>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button text="Load" disabled={wizardName.trim().length === 0} onClick={handleLoad} />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
