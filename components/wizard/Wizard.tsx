import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Checkbox } from "@/components/ui";

import { Question } from '@/components';

const mapQuestionByIndex = (index: number) => {
  switch (index) {
    case 0: return { questionText: 'Yes', backgroundColor: 'bg-primary' };
    case 1: return { questionText: 'No', backgroundColor: 'bg-secondary' };
  }
};

const addQuestionTextAndStyles = (type: string) => (answer: object, index: number) => ({
  ...answer,
  ...mapQuestionByIndex(index),
});

export type WizardStep = {
  actions: string[],
  triggers?: string[],
} | {
  question: string;
  answers: WizardStep[],
};

type Props = {
  className?: string,
  step: WizardStep,
  path?: number[],
  onSaveQuestion: (path: number[]) => (question: string) => Promise<void>,
};

const Answer = ({ step, path, onSaveQuestion }: Props) => {
  if (step.actions) {
    return (
      <ul className="border">
        {step.actions.map((action, index) =>
          <li key={index} className="pl-2 pt-2 grid grid-cols-[max-content_1fr] items-center">
            <Checkbox id={`step${index}`} />
            <label htmlFor={`step${index}`} className="pl-2 font-semibold">
              {action}
            </label>
          </li>
        )}
      </ul>
    );
  }

  return <Wizard step={step} path={path} onSaveQuestion={onSaveQuestion} />;
};

export const Wizard = ({ className, step: { question, answers }, path = [], onSaveQuestion}: Props) =>
  <div className={`p-2 border ${className}`}>
    <Question editMode question={question} onSave={onSaveQuestion(path)} />
    <Accordion type="single" collapsible>
      {answers
        .map(addQuestionTextAndStyles('boolean'))
        .map((answer, index) =>
          <AccordionItem key={index} value={`item${index}`}>
            <AccordionTrigger className={`p-4 border ${answer.backgroundColor}`}>{answer.questionText}</AccordionTrigger>
            <AccordionContent>
              <Answer step={answer} path={path.concat(index)} onSaveQuestion={onSaveQuestion} />
            </AccordionContent>
          </AccordionItem>
        )
      }
    </Accordion>
  </div>;
