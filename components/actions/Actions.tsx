"use client";

import { useState } from "react";

import { Checkbox, Button } from "@/components/ui";
// import { EditActionsAndTriggers } from "@/components";

type EditActionsAndTriggersProps = {
  show: boolean,
  onUpdate: () => void,
};

// Unable to extract this component
// It is not allowed to define inline "use server" annotated Server Actions in Client Components.
const EditActionsAndTriggers = ({ show, onUpdate }: EditActionsAndTriggersProps) =>
  <div>
    Edit Actions And Triggers {show.toString()}
    <Button text="Update" onClick={onUpdate} />
  </div>;

type Props = {
  editable?: boolean,
  actions: string[],
  onUpdateActions: () => void,
};

export const Actions = ({ editable, actions, onUpdateActions }: Props) => {
  const [show, setShow] = useState(false);

  const handleEditActions = () => setShow(state => !state);

  const handleUpdateActions = () => onUpdateActions();

  return (
    <div className="relative">
      <ul className="border">
        {actions.map((action, index) =>
          <li key={index} className="pl-2 pt-2 grid grid-cols-[max-content_1fr] items-center">
            <Checkbox id={`step${index}`} />
            <label htmlFor={`step${index}`} className="pl-2 font-semibold">
              {action}
            </label>
          </li>
        )}
      </ul>
      {editable && <Button className="absolute top-0 right-0" text="Edit" onClick={handleEditActions} />}
      <EditActionsAndTriggers show={show} onUpdate={handleUpdateActions} />
    </div>
  );
};
