"use client";

import { Checkbox, Button } from "@/components/ui";

type Props = {
  editable?: boolean,
  actions: string[],
  onEditActions: () => void,
};

export const Actions = ({ editable, actions, onEditActions }: Props) => {
  const handleEditActions = () => onEditActions();

  return (
    <>
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
      {editable && <Button text="Edit" onClick={handleEditActions} />}
    </>
  );
};