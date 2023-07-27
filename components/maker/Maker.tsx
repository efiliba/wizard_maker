import { revalidatePath } from 'next/cache';
import { set } from 'lodash';

import { Wizard, WizardStep, Question } from '@/components';

const serverState: WizardStep = {
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

const mutateStateAtPath = async (state, path, value) => {
  "use server";

  console.log("--------------------");
  console.log("Check if serverState is being mutated correctly", state);
  
  const buildPath = path.map(p => `answers[${p}]`).join('.')
  set(state, `${buildPath}.question`, value);
};

export const Maker = () => {
  const handleSaveQuestion = (path: number[]) => async (question: string) => {
    "use server";

    await new Promise(resolve => setTimeout(resolve, 500));

    mutateStateAtPath(serverState, path, question);

    console.log(JSON.stringify(serverState, null, 2));
    
    revalidatePath('/');
  };

  return (
    <Wizard className="p-10" step={serverState} onSaveQuestion={handleSaveQuestion} />
  );
};
