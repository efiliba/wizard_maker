import type { ActionsStep } from "@/types";
import { Checkbox } from "@/components/ui";
import { EditActionsAndTriggers } from "./EditActionsAndTriggers";

type Props = {
  editable?: boolean,
  data: ActionsStep,
  onUpdate: (data: ActionsStep) => void,
};

export const Actions = ({ editable, data, onUpdate }: Props) =>
  <div className="grid grid-cols-[1fr_max-content] gap-x-2">
    <ul className="border">
      {data.actions.map((action, index) =>
        <li key={index} className="pl-2 pt-2 grid grid-cols-[max-content_1fr] items-center">
          <Checkbox id={`step${index}`} />
          <label htmlFor={`step${index}`} className="pl-2 font-semibold">
            {action}
          </label>
        </li>
      )}
    </ul>
    {editable && <EditActionsAndTriggers data={data} onUpdate={onUpdate} />}
  </div>;
