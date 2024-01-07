import z from "zod";

const actionsStep = z.object({
  actions: z.string().array(),
  triggers: z.string().array().optional(),
});

export type ActionsStep = z.infer<typeof actionsStep>;

export type WizardData = {
  question?: string,
  answers?: WizardStep[],
};

const wizardData: z.ZodType<WizardData> = z.lazy(() => z.object({
  question: z.string().optional(),
  answers: wizardStep.array().optional(),
}));

export const wizardStep = actionsStep.or(wizardData);

export type WizardStep = z.infer<typeof wizardStep>;
