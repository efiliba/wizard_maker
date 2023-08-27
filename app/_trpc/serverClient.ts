import { httpBatchLink } from "@trpc/client";

import { getDomain } from "@/lib/utils";
import { appRouter } from "@/server";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${getDomain()}/api/trpc`,
    }),
  ],
});
