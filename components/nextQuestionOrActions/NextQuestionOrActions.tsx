"use client";

import { Button } from '@/components/ui';

type Props = {
  path: number[],
  onAddNextQuestion: (path: number[]) => Promise<void>,
  onAddActions: (path: number[]) => Promise<void>,
};

export const NextQuestionOrActions = ({ path, onAddNextQuestion, onAddActions }: Props) => {
  const handleAddNextQuestion = () => onAddNextQuestion(path);
  const handleAddActions = () => onAddActions(path);

  return (
    <div className="font-bold">
      Are there more questions or actions to perform?
      <Button text="Next question" onClick={handleAddNextQuestion} />
      <Button text="Actions" onClick={handleAddActions} />
    </div>
  );
};
