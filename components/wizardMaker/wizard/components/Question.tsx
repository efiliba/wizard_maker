"use client";

import { ChangeEvent, useState, useTransition } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/ui";

type Props = {
  editMode?: false,
  question: string,
  onSave?: (text: string) => Promise<void>,
} | {
  editMode: true,
  question?: string,
  onSave: (text: string) => Promise<void>,
};

export const Question = ({ editMode, question = '', onSave = () => Promise.resolve() }: Props) => {
  const [text, setQuestion] = useState(question);

  const [dirty, setDirty] = useState(false);

  const [pending, startTransition] = useTransition();

  const handleUpdateQuestion = (input: ChangeEvent<HTMLInputElement>) => {
    setQuestion(input.target.value);
    setDirty(true);
  };

  const handleSaveQuestion = () => {
    if (dirty) {
      startTransition(() => onSave(text));
      setDirty(false);
    }
  };

  return (
    <div className="grid grid-cols-[1fr_max-content] items-center">
      <Input
        className={`${editMode ? '' : 'font-bold'}`}
        type="text"
        disabled={pending}
        readOnly={!editMode}
        placeholder="Enter question"
        value={text}
        onChange={handleUpdateQuestion}
        onBlur={handleSaveQuestion}
      />
      {pending && <ReloadIcon className="mx-2 h-4 w-4 animate-spin" />}
    </div>
  );
};
