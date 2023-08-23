"use client";

import { trpc } from "../_trpc/client";

export const TodoList = () => {
  const getTodos = trpc.getTodos.useQuery();

  return <div>{JSON.stringify(getTodos, null, 2)}</div>;
}
