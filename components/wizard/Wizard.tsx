import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";
import { Question, Actions, NextQuestionOrActions, DeleteStep } from "@/components";
import { QuestionStep, ActionsStep, WizardStep } from "@/types";

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

export type WizardProps = {
  className?: string,
  editable?: boolean,
  step: QuestionStep,
  path?: number[],
  onAddNextQuestion: (path: number[]) => () => Promise<void>,
  onAddActions: (path: number[]) => () => Promise<void>,
  onUpdateQuestion: (path: number[]) => (question: string) => Promise<void>,
  onUpdateActions: (path: number[]) => (data: ActionsStep) => void,
  onDeleteStep: (path: number[]) => () => void,
};

type AnswerProps = WizardProps & { step: WizardStep };

const isActionsStep = (step: WizardStep): step is ActionsStep => "actions" in step;
const isQuestionStep = (step: WizardStep): step is QuestionStep => "question" in step;

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
  <div className={`p-2 border ${className}`}>
    <Question editMode={editable} question={question!} onSave={onUpdateQuestion(path)} />
    <Accordion type={editable ? 'multiple' : 'single'} collapsible={!editable}>
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
            <DeleteStep onDelete={onDeleteStep(path.concat(index))} />
          </AccordionItem>
        )
      }
    </Accordion>
  </div>;
