"use client";

import { ChangeEvent, useState, useTransition } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';

import { Input, Button } from '@/components/ui';

type Props = {
  initialQuestion?: string,
  onUpdateQuestion: (question: string) => Promise<void>,
};

export const EditQuestion = ({ initialQuestion = '', onUpdateQuestion }: Props) => {
  const [question, setQuestion] = useState(initialQuestion);

  const [pending, startTransition] = useTransition();

  const handleUpdateQuestion = (input: ChangeEvent<HTMLInputElement>) => setQuestion(input.target.value);

  const handleSaveQuestion = () => startTransition(() => onUpdateQuestion(question));

  return (
    <div className="grid grid-cols-[1fr_max-content]">
      <Input type="text" placeholder="Enter question" value={question} onChange={handleUpdateQuestion} />
      <Button disabled={pending} onClick={handleSaveQuestion}>
        {pending
          ? <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Saving
            </>
          : <>Save</>
        }
      </Button>
    </div>
  );
};
