import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";

import { Question, Actions, NextQuestionOrActions } from '@/components';

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
  onAddNextQuestion: (path: number[]) => Promise<void>,
  onAddActions: (path: number[]) => Promise<void>,
  onSaveQuestion: (path: number[]) => (question: string) => Promise<void>,
  onEditActions: (path: number[]) => () => void,
};

const Answer = ({ editable, step, path, onAddNextQuestion, onAddActions, onSaveQuestion, onEditActions }: Props) => {  
  if (step.actions) {
    return <Actions editable={editable} actions={step.actions} onEditActions={onEditActions(path)} />
  }

  if (step.question !== undefined) {
    return <Wizard
      editable={editable}
      step={step}
      path={path}
      onAddNextQuestion={onAddNextQuestion}
      onAddActions={onAddActions}
      onSaveQuestion={onSaveQuestion}
      onEditActions={onEditActions}
    />;
  }

  return <NextQuestionOrActions path={path} onAddNextQuestion={onAddNextQuestion} onAddActions={onAddActions} />;
};

export const Wizard = ({
  className,
  editable,
  step: { question, answers = [] },
  path = [],
  onAddNextQuestion,
  onAddActions,
  onSaveQuestion,
  onEditActions,
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
                onAddNextQuestion={onAddNextQuestion}
                onAddActions={onAddActions}
                onSaveQuestion={onSaveQuestion}
                onEditActions={onEditActions}
              />
            </AccordionContent>
          </AccordionItem>
        )
      }
    </Accordion>
  </div>;
