import { cn } from "@/lib/utils";
import type { WizardData, ActionsStep, WizardStep } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";
import { Actions, DeleteStep, NextQuestionOrActions, Question } from "./components";

const mapQuestionByIndex = (index: number) => {
  switch (index) {
    case 0: return { questionText: 'Yes', backgroundColor: 'bg-primary' };
    case 1: return { questionText: 'No', backgroundColor: 'bg-secondary' };
    default: return {};
  }
};

const addQuestionTextAndStylesReducer = (type: string) =>
  <T,>(paddedAnswers: (T & WizardStep)[], answer: WizardStep, index: number) => {
    paddedAnswers[index] = {
      ...paddedAnswers[index],
      ...answer,
    };

    return paddedAnswers;
  };

type WizardProps = {
  className?: string,
  editable?: boolean,
  step: WizardData,
  path?: number[],
  onAddNextQuestion: (path: number[]) => () => Promise<void>,
  onAddActions: (path: number[]) => () => Promise<void>,
  onUpdateQuestion: (path: number[]) => (question: string) => Promise<void>,
  onUpdateActions: (path: number[]) => (data: ActionsStep) => void,
  onDeleteStep: (path: number[]) => () => void,
};

type AnswerProps = WizardProps & { step: WizardStep };

const isActionsStep = (step: WizardStep): step is ActionsStep => "actions" in step;
const isQuestionStep = (step: WizardStep): step is WizardData => "question" in step;

const Answer = ({
  editable,
  step,
  path,
  onAddNextQuestion,
  onAddActions,
  onUpdateQuestion,
  onUpdateActions,
  onDeleteStep,
}: AnswerProps) => {
  if (isActionsStep(step)) {
    return <Actions editable={editable} data={step} onUpdate={onUpdateActions(path!)} />;
  }

  if (isQuestionStep(step)) {
    return (
      <Wizard
        editable={editable}
        step={step}
        path={path}
        onAddNextQuestion={onAddNextQuestion}
        onAddActions={onAddActions}
        onUpdateQuestion={onUpdateQuestion}
        onUpdateActions={onUpdateActions}
        onDeleteStep={onDeleteStep}
      />
    );
  }

  if (!editable) {
    return <div>Unfinished path found in wizard!</div>
  }

  return <NextQuestionOrActions onAddNextQuestion={onAddNextQuestion(path!)} onAddActions={onAddActions(path!)} />;
};

export const Wizard = ({
  className,
  editable,
  step: { question, answers = [] },
  path = [],
  onAddNextQuestion,
  onAddActions,
  onUpdateQuestion,
  onUpdateActions,
  onDeleteStep,
}: WizardProps) =>
  <div className={cn(`pl-2 border-l-[.5px]${editable ? ' border-yellow-200' : ''}`, className)}>
    <Question editMode={editable} question={question!} onSave={onUpdateQuestion(path)} />
    <Accordion type={editable ? 'multiple' : 'single'}>
      {answers
        .reduce(addQuestionTextAndStylesReducer('boolean'), [mapQuestionByIndex(0), mapQuestionByIndex(1)])
        .map((answer, index) =>
          <AccordionItem className="relative" key={index} value={`item${index}`}>
            <AccordionTrigger className={`p-4 border ${answer.backgroundColor}`}>
              {answer.questionText}
            </AccordionTrigger>
            <AccordionContent>
              <Answer
                editable={editable}
                step={answer as WizardStep}
                path={path.concat(index)}
                onAddNextQuestion={onAddNextQuestion}
                onAddActions={onAddActions}
                onUpdateQuestion={onUpdateQuestion}
                onUpdateActions={onUpdateActions}
                onDeleteStep={onDeleteStep}
              />
            </AccordionContent>
            {editable && <DeleteStep onDelete={onDeleteStep(path.concat(index))} />}
          </AccordionItem>
        )
      }
    </Accordion>
  </div>;
