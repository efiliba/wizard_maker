"use client";

import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";

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
} from "@/components/ui";
import type { ActionsStep } from "@/types";
import { nextTick } from "process";

type Props = {
  data: ActionsStep,
  onUpdate: (data: ActionsStep) => void,
};

export const EditActionsAndTriggers = ({ data, onUpdate }: Props) => {
  const lastActionRef = useRef<HTMLInputElement>(null);

  const [actions, setActions] = useState(data.actions);

  const handleActionChange = (index: number) => ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setActions(a => [
      ...a.slice(0, index),
      value,
      ...a.slice(index + 1)
    ]);
  };

  const handleAddNewAction = () => {
    setActions(a => a.concat(''));
    nextTick(() => lastActionRef.current?.focus());
  };
  
  const handleUpdate = () => onUpdate({ actions: actions.filter(Boolean) });

  const handleAddNewTrigger = () => {
    console.log('handleAddNewTrigger');
  };

  const handleKeyPress = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      handleAddNewAction();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Update the actions and triggers.</DialogTitle>
          <DialogDescription>
            <span>Actions:</span>
            {actions.map((action, index) =>
              <Input
                ref={lastActionRef}
                key={index}
                type="text"
                value={action}
                onChange={handleActionChange(index)}
                onKeyUp={handleKeyPress}
              />
            )}
            <Button
              className="mt-2 w-full sm:w-auto"
              variant="secondary"
              size="sm"
              onClick={handleAddNewAction}
            >
              Add new row
            </Button>
            {/* <div>Triggers:</div>
            {data.triggers?.map((trigger, index) =>
              <Input key={index} type="text" defaultValue={trigger} />
            )}
            <Button text="Add new row" size="sm" onClick={handleAddNewTrigger} /> */}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
