export type QuestionStep = {
  question?: string,
  answers?: WizardStep[],
};

export type ActionsStep = {
  actions: string[],
  triggers?: string[],
};

export type WizardStep = QuestionStep | ActionsStep;
