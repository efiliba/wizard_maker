export type WizardStep = {
  actions: string[],
  triggers?: string[],
} | {
  question: string;
  answer: {
    yes: WizardStep,
    no: WizardStep,
  }
};

type Props = {
  step: WizardStep,
};

const Answer = ({ step }: Props) => {
  if (step.actions) {
    return (
      <ul>
        {step.actions.map((action, index) =>
          <li key={index}>{action}</li>
        )}
      </ul>
    );
  }

  return <Wizard step={step} />
}

export const Wizard = ({ step: { question, answer }}: Props) =>
  <div>
    {question}
    <div>
      Yes:
      <Answer step={answer.yes} />
    </div>
    <div>
      No:
      <Answer step={answer.no} />
    </div>
  </div>;
