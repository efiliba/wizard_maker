"use client";

import { Button } from '@/components/ui';

type Props = {
  onAddNextQuestion: () => Promise<void>,
  onAddActions: () => Promise<void>,
};

export const NextQuestionOrActions = ({ onAddNextQuestion, onAddActions }: Props) => {
  const handleAddNextQuestion = () => onAddNextQuestion();
  const handleAddActions = () => onAddActions();

  return (
    <div className="font-bold">
      Are there more questions or actions to perform?
      <Button text="Next question" onClick={handleAddNextQuestion} />
      <Button text="Actions" onClick={handleAddActions} />
    </div>
  );
};
