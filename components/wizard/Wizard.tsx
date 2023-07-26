import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Checkbox } from "@/components/ui";

export type WizardStep = {
  actions: string[],
  triggers?: string[],
} | {
  question: string;
  answer: {
    yes: WizardStep,
    no: WizardStep,
  }
};

type Props = {
  step: WizardStep,
};

const Answer = ({ step }: Props) => {
  if (step.actions) {
    return (
      <ul className="border">
        {step.actions.map((action, index) =>
          <li key={index} className="pl-2 pt-2 grid grid-cols-[max-content_1fr] items-center">
            <Checkbox id={`step${index}`} />
            <label
              htmlFor={`step${index}`}
              className="pl-2 font-semibold"
            >
              {action}
            </label>
          </li>
        )}
      </ul>
    );
  }

  return <Wizard step={step} />
}

export const Wizard = ({ step: { question, answer }}: Props) =>
  <div className="p-2 border">
    <div className="font-bold">
      {question}
    </div>
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="p-4 border bg-primary">Yes</AccordionTrigger>
        <AccordionContent>
          <Answer step={answer.yes} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="p-4 border bg-secondary">No</AccordionTrigger>
        <AccordionContent>
          <Answer step={answer.no} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>;
