"use client";

import { Button } from '@/components/ui';

type Props = {
  path: number[],
  onNextQuestion: (path: number[]) => Promise<void>,
  onActions: (path: number[]) => Promise<void>,
};

export const NextQuestionOrActions = ({ path, onNextQuestion, onActions }: Props) => {
  const handleNextQuestion = () => onNextQuestion(path);
  const handleActions = () => onActions(path);

  return (
    <div className="font-bold">
      Are there more questions or actions to perform?
      <Button text="Next question" onClick={handleNextQuestion} />
      <Button text="Actions" onClick={handleActions} />
    </div>
  );
};
