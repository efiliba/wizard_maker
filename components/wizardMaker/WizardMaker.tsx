import { revalidatePath } from "next/cache";
import { set } from "lodash";

import { WizardData, ActionsStep } from "@/types";
import { serverClient } from "@/app/_trpc/serverClient";
import { WizardSelector } from "@/components";
import { Wizard } from "./wizard";

// let wizard: WizardData = {
//   question: 'Was there a fall?',
//   answers: [
//     {
//       actions: [
//         'Call an ambulace.',
//         'File incident report on VWorker within 24 hours.'
//       ]
//     },
//     {
//       question: 'Was there a medication error?',
//       answers: [
//         {
//           question: 'Was it the wrong medication?',
//           answers: [
//             {
//               actions: [
//                 'Run'
//               ],
//               triggers: [
//                 'CallPolice'
//               ]
//             },
//             {
//               actions: [
//                 'Be careful next time'
//               ],
//             }
//           ]
//         },
//         {
//           actions: [
//             'File incident report on VWorker.'
//           ]
//         }
//       ]
//     }
//   ],
// };

// wizard = {}; // CHANGE THIS

let activeWizard: WizardData = {};

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
  const initialActiveWizard = await serverClient.getActiveWizard();

  const handleActiveWizardChange = async (wizard: WizardData) => {
    "use server";

    activeWizard = {
      ...wizard
    };

    // revalidatePath('/');
  };
  
  const handleAddNextQuestion = (path: number[]) => async () => {
    "use server";
  
    // await new Promise(resolve => setTimeout(resolve, 500));

    mutateAnswerAtPath(activeWizard, path, { question: '' });

    revalidatePath('/');
  };
  
  const handleAddActions = (path: number[]) => async () => {
    "use server";
  
    mutateAnswerAtPath(activeWizard, path, { actions: ['Some action'] });

    revalidatePath('/');
  };

  const handleUpdateQuestion = (path: number[]) => async (question: string) => {
    "use server";

    mutateQuestionAtPath(activeWizard, path, question);
    
    revalidatePath('/');
  };

  const handleUpdateActions = (path: number[]) => async (data: ActionsStep) => {
    "use server";

    mutateAnswerAtPath(activeWizard, path, data);

    revalidatePath('/');
  };

  const handleDeleteStep = (path: number[]) => async () => {
    "use server";

    mutateAnswerAtPath(activeWizard, path, {});

    revalidatePath('/');
  };

  return (
    <>
      <Wizard
        className="p-10"
        editable
        step={activeWizard}
        onAddNextQuestion={handleAddNextQuestion}
        onAddActions={handleAddActions}
        onUpdateQuestion={handleUpdateQuestion}
        onUpdateActions={handleUpdateActions}
        onDeleteStep={handleDeleteStep}
      />
      Server state:
      <pre>
        {JSON.stringify(activeWizard, null, 2)}
      </pre>
      <WizardSelector
        initialWizards={wizards}
        initialActiveWizard={initialActiveWizard}
        wizard={activeWizard}
        onActiveWizardChange={handleActiveWizardChange}
      />
    </>
  );
};
