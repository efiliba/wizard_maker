import z from "zod";

export type WizardData = {
  question?: string,
  answers?: WizardStep[],
};

// export type ActionsStep = {
//   actions: string[],
//   triggers?: string[],
// };

const actionsStep = z.object({
  actions: z.string().array(),
  triggers: z.string().array().optional(),
});

export type ActionsStep = z.infer<typeof actionsStep>;

export type WizardStep = WizardData | ActionsStep;

// const baseCategorySchema = z.object({
//   name: z.string(),
// });

// type Category = z.infer<typeof baseCategorySchema> & {
//   subcategories: Category[];
// };

// const categorySchema: z.ZodType<Category> = baseCategorySchema.extend({
//   subcategories: z.lazy(() => categorySchema.array()),
// });

// categorySchema.parse({
//   name: "People",
//   subcategories: [
//     {
//       name: "Politicians",
//       subcategories: [
//         {
//           name: "Presidents",
//           subcategories: [],
//         },
//       ],
//     },
//   ],
// }); // passes
/*
const question = z.object({
  question: z.string().optional(),
});

type Question = z.infer<typeof question>;

type QuestionStep = z.infer<typeof question> & {
  answers?: WizardData[];
};

export type WizardData = QuestionStep | ActionsStep;

// const wizardData: z.ZodType<Answers> = question.extend({
//   answers: z.lazy(() => wizardData.array()),
// });

// export type WizardData = z.infer<typeof wizardData>;

*/
