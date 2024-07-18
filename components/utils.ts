import { set } from "lodash";
import type { WizardData } from '@/types';

export const defaultYesNoQuestion = [
  { questionText: 'Yes', backgroundColor: 'bg-primary' },
  { questionText: 'No', backgroundColor: 'bg-secondary' }
];

// Add extra fields onto the input - return a reducer function
export const addFields_Reducer =
  (type: string) =>
  <T extends object, U extends object>(acc: T[], add: U, index: number) => {
    acc[index] = {
      ...acc[index],
      ...add,
    };

    return acc;
  };

export const mutateQuestionAtPath = async (state: WizardData, path: number[], question: string) => {
  const buildPath = path.map(p => `answers[${p}]`).concat('question').join('.');
  set(state, buildPath, question);
};


export const mutateAnswerAtPath = async (state: WizardData, path: number[], answer: object) => {
  console.log({ state: JSON.stringify(state), path, answer });
  const buildPath = path.map(p => `answers[${p}]`).join('.');
  set(state, buildPath, answer);
  console.log('result', JSON.stringify(state));
  
};
