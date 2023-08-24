import { revalidatePath } from "next/cache";
import { set } from "lodash";

import { WizardData, ActionsStep } from "@/types";
import { serverClient } from "@/app/_trpc/serverClient";
import { WizardSelector } from "@/components";
import { Wizard } from "./wizard";

let wizard: WizardData = {
  question: 'Was there a fall?',
  answers: [
    {
      actions: [
        'Call an ambulace.',
        'File incident report on VWorker within 24 hours.'
      ]
    },
    {
      question: 'Was there a medication error?',
      answers: [
        {
          question: 'Was it the wrong medication?',
          answers: [
            {
              actions: [
                'Run'
              ],
              triggers: [
                'CallPolice'
              ]
            },
            {
              actions: [
                'Be careful next time'
              ],
            }
          ]
        },
        {
          actions: [
            'File incident report on VWorker.'
          ]
        }
      ]
    }
  ],
};

wizard = {}; // CHANGE THIS

const mutateQuestionAtPath = async (state: WizardData, path: number[], question: string) => {
  const buildPath = path.map(p => `answers[${p}]`).concat('question').join('.');
  set(state, buildPath, question);
};

const mutateAnswerAtPath = async (state: WizardData, path: number[], answer: object) => {
  const buildPath = path.map(p => `answers[${p}]`).join('.');
  set(state, buildPath, answer);
};

export const WizardMaker = async () => {
  const wizards = await serverClient.getWizards();
  const activeWizard = await serverClient.getActiveWizard();

  const handleAddNextQuestion = (path: number[]) => async () => {
    "use server";
  
    // await new Promise(resolve => setTimeout(resolve, 500));

    mutateAnswerAtPath(wizard, path, { question: '' });

    revalidatePath('/');
  };
  
  const handleAddActions = (path: number[]) => async () => {
    "use server";
  
    mutateAnswerAtPath(wizard, path, { actions: ['Some action'] });

    revalidatePath('/');
  };

  const handleUpdateQuestion = (path: number[]) => async (question: string) => {
    "use server";

    // await new Promise(resolve => setTimeout(resolve, 500));

    mutateQuestionAtPath(wizard, path, question);

    // console.log("--------------------");
    // console.log('UPDATED', JSON.stringify(wizard, null, 2));
    
    revalidatePath('/');
  };

  const handleUpdateActions = (path: number[]) => async (data: ActionsStep) => {
    "use server";

    mutateAnswerAtPath(wizard, path, data);

    revalidatePath('/');
  };

  const handleDeleteStep = (path: number[]) => async () => {
    "use server";

    mutateAnswerAtPath(wizard, path, {});

    revalidatePath('/');
  };

  return (
    <>
      <Wizard
        className="p-10"
        editable
        step={wizard}
        onAddNextQuestion={handleAddNextQuestion}
        onAddActions={handleAddActions}
        onUpdateQuestion={handleUpdateQuestion}
        onUpdateActions={handleUpdateActions}
        onDeleteStep={handleDeleteStep}
      />
      <WizardSelector initialWizards={wizards} initialActiveWizard={activeWizard} wizard={wizard} />
    </>
  );
};
