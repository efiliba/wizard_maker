import { revalidatePath } from 'next/cache';

import { Question } from '@/components';

const serverState = {
  question: 'Initial custom question',
};

export const Maker = () => {
  const handleSaveQuestion = async (question: string) => {
    "use server";

    await new Promise(resolve => setTimeout(resolve, 500));

    serverState.question = question;
    
    revalidatePath('/');
  };

  return (
    <div className="">
      <Question editMode question={serverState.question} onSave={handleSaveQuestion} />
      <br />
      <Question question="Was there a fall?" />
    </div>
  );
};
