import { revalidatePath } from 'next/cache';
import { set } from 'lodash';

import { Wizard, WizardStep, Question } from '@/components';

let serverState: WizardStep = {
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

// serverState = {
//   question: 'Some question',
//   answers: [{
//     question: 'Nested question',
//   // }, {
//   //   actions: ['Some action']
//   }]
// };

const mutateQuestionAtPath = async (state: WizardStep, path: number[], question: string) => {
  const buildPath = path.map(p => `answers[${p}]`).concat('question').join('.');
  set(state, buildPath, question);
};

const mutateAnswerAtPath = async (state: WizardStep, path: number[], answer: object) => {
  const buildPath = path.map(p => `answers[${p}]`).join('.');
  set(state, buildPath, answer);
};

export const Maker = () => {
  const handleNextQuestion = async (path: number[]) => {
    "use server";
  
    // await new Promise(resolve => setTimeout(resolve, 500));

    mutateAnswerAtPath(serverState, path, { question: null });

    revalidatePath('/');
  };
  
  const handleActions = async (path: number[]) => {
    "use server";
  
    console.log('handleActions', path);
  };

  const handleSaveQuestion = (path: number[]) => async (question: string) => {
    "use server";

    await new Promise(resolve => setTimeout(resolve, 500));

    mutateQuestionAtPath(serverState, path, question);

    // console.log("--------------------");
    // console.log('UPDATED', JSON.stringify(serverState, null, 2));
    
    revalidatePath('/');
  };

  return (
    <Wizard
      className="p-10"
      editable
      step={serverState}
      onNextQuestion={handleNextQuestion}
      onActions={handleActions}
      onSaveQuestion={handleSaveQuestion}
    />
  );
};
