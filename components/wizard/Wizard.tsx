import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Checkbox } from "@/components/ui";

import { Question, NextQuestionOrActions } from '@/components';

const mapQuestionByIndex = (index: number) => {
  switch (index) {
    case 0: return { questionText: 'Yes', backgroundColor: 'bg-primary' };
    case 1: return { questionText: 'No', backgroundColor: 'bg-secondary' };
  }
};

const addQuestionTextAndStylesReducer = (type: string) => (paddedAnswers: object[], answer: object, index: number) => {
  paddedAnswers[index] = {
    ...paddedAnswers[index],
    ...answer,
  };
  return paddedAnswers;
};

export type WizardStep = {
} | {
  actions: string[],
  triggers?: string[],
} | {
  question: string;
  answers: WizardStep[],
};

type Props = {
  className?: string,
  editable?: boolean,
  step: WizardStep,
  path?: number[],
  onNextQuestion: (path: number[]) => Promise<void>,
  onActions: (path: number[]) => Promise<void>,
  onSaveQuestion: (path: number[]) => (question: string) => Promise<void>,
};

const Answer = ({ editable, step, path, onNextQuestion, onActions, onSaveQuestion }: Props) => {  
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

  if (step.question !== undefined) {
    return <Wizard
      editable={editable}
      step={step}
      path={path}
      onNextQuestion={onNextQuestion}
      onActions={onActions}
      onSaveQuestion={onSaveQuestion}
    />;
  }

  return <NextQuestionOrActions path={path} onNextQuestion={onNextQuestion} onActions={onActions} />;
};

export const Wizard = ({
  className,
  editable,
  step: { question, answers = [] },
  path = [],
  onNextQuestion,
  onActions,
  onSaveQuestion
}: Props) =>
  <div className={`p-2 border ${className}`}>
    <Question editMode={editable} question={question} onSave={onSaveQuestion(path)} />
    <Accordion type={editable ? 'multiple' : 'single'} collapsible={!editable}>
      {answers
        .reduce(addQuestionTextAndStylesReducer('boolean'), [mapQuestionByIndex(0), mapQuestionByIndex(1)])
        .map((answer, index) =>
          <AccordionItem key={index} value={`item${index}`}>
            <AccordionTrigger className={`p-4 border ${answer.backgroundColor}`}>
              {answer.questionText}
            </AccordionTrigger>
            <AccordionContent>
              <Answer
                editable={editable}
                step={answer}
                path={path.concat(index)}
                onNextQuestion={onNextQuestion}
                onActions={onActions}
                onSaveQuestion={onSaveQuestion}
              />
            </AccordionContent>
          </AccordionItem>
        )
      }
    </Accordion>
  </div>;
