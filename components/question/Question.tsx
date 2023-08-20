import { EditQuestion } from './EditQuestion';

type Props = {
  editMode?: false,
  question: string,
  onSave?: (question: string) => Promise<void>,
} | {
  editMode: true,
  question?: string,
  onSave: (question: string) => Promise<void>,
};

export const Question = ({ editMode, question, onSave = () => Promise.resolve() }: Props) => {
  return (
    <div className="font-bold">
      {editMode
        ? <EditQuestion initialQuestion={question} onUpdateQuestion={onSave}/>
        : question
      }
    </div>
  );
};
