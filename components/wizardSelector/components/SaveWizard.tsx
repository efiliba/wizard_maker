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
  Input,
  Label,
} from "@/components/ui";

type Props = {
  onSave: (name: string) => void,
};

export const SaveWizard = ({ onSave }: Props) => {
  const [open, setOpen] = useState(false);

  const [wizardName, setWizardName] = useState('');

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => setWizardName(target.value);

  const handleSave = () => onSave(wizardName.trim());

  const handleKeyPress = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter" && wizardName.trim().length > 0) {
      handleSave();
      setOpen(false);
    }
  };

  const handleOpenChange = () => setOpen(toggle => !toggle);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button text="Save Wizard" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Wizard</DialogTitle>
          <DialogDescription>
            <Label htmlFor="name">Name:</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter a name for this wizard"
              value={wizardName}
              onChange={handleChange}
              onKeyUp={handleKeyPress}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button text="Save" disabled={wizardName.trim().length === 0} onClick={handleSave} />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
