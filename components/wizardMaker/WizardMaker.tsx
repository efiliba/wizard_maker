import { revalidatePath } from "next/cache";

import type { WizardData, ActionsStep } from "@/types";
import { serverClient } from "@/app/_trpc/serverClient";
import { WizardSelector } from "./wizardSelector";
import { Wizard } from "./wizard";
import { mutateQuestionAtPath, mutateAnswerAtPath } from "../utils";

let activeWizard: WizardData = {};

export const WizardMaker = async ({ editMode }: { editMode: boolean }) => {
  const initialWizards = await serverClient.getWizards();
  const initialActiveWizard = await serverClient.getActiveWizard();

  const handleActiveWizardChange = async (wizard: WizardData) => {
    "use server";

    activeWizard = { ...wizard };

    revalidatePath('/');
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
