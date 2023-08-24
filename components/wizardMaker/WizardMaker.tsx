import { revalidatePath } from "next/cache";
import { set } from "lodash";

import { serverClient } from "@/app/_trpc/serverClient";
import { WizardSelector } from "@/components";
import { Wizard, WizardProps } from "./wizard";
import { ActionsStep } from "@/types";

let serverState: WizardProps["step"] = {
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

serverState = {}; // CHANGE THIS

const mutateQuestionAtPath = async (state: WizardProps["step"], path: number[], question: string) => {
  const buildPath = path.map(p => `answers[${p}]`).concat('question').join('.');
  set(state, buildPath, question);
};

const mutateAnswerAtPath = async (state: WizardProps["step"], path: number[], answer: object) => {
  const buildPath = path.map(p => `answers[${p}]`).join('.');
  set(state, buildPath, answer);
};

export const WizardMaker = async () => {
  const wizards = await serverClient.getWizards();
  const activeWizard = await serverClient.getActiveWizard();

  const handleAddNextQuestion = (path: number[]) => async () => {
    "use server";
  
    // await new Promise(resolve => setTimeout(resolve, 500));

    mutateAnswerAtPath(serverState, path, { question: '' });

    revalidatePath('/');
  };
  
  const handleAddActions = (path: number[]) => async () => {
    "use server";
  
    mutateAnswerAtPath(serverState, path, { actions: ['Some action'] });

    revalidatePath('/');
  };

  const handleUpdateQuestion = (path: number[]) => async (question: string) => {
    "use server";

    // await new Promise(resolve => setTimeout(resolve, 500));

    mutateQuestionAtPath(serverState, path, question);

    // console.log("--------------------");
    // console.log('UPDATED', JSON.stringify(serverState, null, 2));
    
    revalidatePath('/');
  };

  const handleUpdateActions = (path: number[]) => async (data: ActionsStep) => {
    "use server";

    mutateAnswerAtPath(serverState, path, data);

    revalidatePath('/');
  };

  const handleDeleteStep = (path: number[]) => async () => {
    "use server";

    mutateAnswerAtPath(serverState, path, {});

    revalidatePath('/');
  };

  return (
    <>
      <Wizard
        className="p-10"
        editable
        step={serverState}
        onAddNextQuestion={handleAddNextQuestion}
        onAddActions={handleAddActions}
        onUpdateQuestion={handleUpdateQuestion}
        onUpdateActions={handleUpdateActions}
        onDeleteStep={handleDeleteStep}
      />
      <WizardSelector initialWizards={wizards} initialActiveWizard={activeWizard} />

    </>
  );
};
