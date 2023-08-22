"use client";

import { Cross1Icon } from '@radix-ui/react-icons';

export const DeleteStep = ({ onDelete }: { onDelete: () => void }) => {
  const handleDelete = () => onDelete();
  
  return (
    <Cross1Icon
      className="absolute top-4 right-10 h-6 w-6 text-red-600 hover:text-white hover:cursor-pointer"
      onClick={handleDelete}
    />
  );
};
