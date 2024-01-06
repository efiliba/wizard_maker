import { revalidatePath } from "next/cache";
import { set } from "lodash";

import type { WizardData, ActionsStep } from "@/types";
import { serverClient } from "@/app/_trpc/serverClient";
import { WizardSelector } from "@/components";
import { Wizard } from "./wizard";

let activeWizard: WizardData = {};

const mutateQuestionAtPath = async (state: WizardData, path: number[], question: string) => {
  const buildPath = path.map(p => `answers[${p}]`).concat('question').join('.');
  set(state, buildPath, question);
};

const mutateAnswerAtPath = async (state: WizardData, path: number[], answer: object) => {
  const buildPath = path.map(p => `answers[${p}]`).join('.');
  set(state, buildPath, answer);
};

export const WizardMaker = async ({ editMode }: { editMode: boolean }) => {
  const initialWizards = await serverClient.getWizards();
  const initialActiveWizard = await serverClient.getActiveWizard();

  const handleActiveWizardChange = async (wizard: WizardData) => {
    "use server";

    if (JSON.stringify(wizard) !== JSON.stringify(activeWizard)) {
      activeWizard = {
        ...wizard
      };

      revalidatePath('/');
    }
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
      <WizardSelector
        className="p-2"
        editMode={editMode}
        initialWizards={initialWizards}
        selectedWizard={initialActiveWizard}
        wizard={activeWizard}
        onActiveWizardChange={handleActiveWizardChange}
      />
      <Wizard
        className="p-2 border-l-0"
        editable={editMode}
        step={activeWizard}
        onAddNextQuestion={handleAddNextQuestion}
        onAddActions={handleAddActions}
        onUpdateQuestion={handleUpdateQuestion}
        onUpdateActions={handleUpdateActions}
        onDeleteStep={handleDeleteStep}
      />
    </>
  );
};
