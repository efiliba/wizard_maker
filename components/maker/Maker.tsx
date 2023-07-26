import { revalidatePath } from 'next/cache';

import { Wizard, WizardStep, Question } from '@/components';

const serverState: WizardStep = {
  question: 'Was there a fall?',
  answer: {
    yes: {
      actions: [
        'Call an ambulace.',
        'File incident report on VWorker within 24 hours.'
      ]
    },
    no: {
      question: 'Was there a medication error?',
      answer: {
        yes: {
          question: 'Was it the wrong medication?',
          answer: {
            yes: {
              actions: [
                'Run'
              ],
              triggers: [
                'CallPolice'
              ]
            },
            no: {
              actions: [
                'Be careful next time'
              ],
            }
          }
        },
        no: {
          actions: [
            'File incident report on VWorker.'
          ]
        }
      }
    }
  },
};

export const Maker = () => {
  const handleSaveQuestion = async (question: string) => {
    "use server";

    await new Promise(resolve => setTimeout(resolve, 500));

    serverState.question = question;
    
    revalidatePath('/');
  };

  return (
    <div className="p-10">
      <Wizard step={serverState} />
      {/* <Question editMode question={serverState.question} onSave={handleSaveQuestion} /> */}
    </div>
  );
};
