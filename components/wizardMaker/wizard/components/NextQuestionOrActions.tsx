"use client";

import { Button } from "@/components/ui";

type Props = {
  onAddNextQuestion: () => Promise<void>,
  onAddActions: () => Promise<void>,
};

export const NextQuestionOrActions = ({ onAddNextQuestion, onAddActions }: Props) => {
  const handleAddNextQuestion = () => onAddNextQuestion();
  const handleAddActions = () => onAddActions();

  return (
    <div className="grid grid-flow-col items-center justify-start gap-x-2 font-bold">
      Are there more questions or actions to perform?
      <Button onClick={handleAddNextQuestion}>Next question</Button>
      <Button variant="secondary" onClick={handleAddActions}>Actions</Button>
    </div>
  );
};
