"use client";

import { Button } from "@/components/ui";

import { trpc } from "../_trpc/client";
import { serverClient } from "../_trpc/serverClient";

export const TodoList = ({ initialTodos }: { initialTodos: Awaited<ReturnType<(typeof serverClient)["getTodos"]>>}) => {
  const addTodo = trpc.addTodo.useMutation({
     onSettled: () => {
      getTodos.refetch()
     },
  });

  const getTodos = trpc.getTodos.useQuery(undefined, {
     initialData: initialTodos,
     refetchOnMount: false,
     refetchOnReconnect: false,
  });

  return <div>
    <Button text="Add Todo" onClick={() => addTodo.mutate(Date.now().toString())} />
    <pre>
      {JSON.stringify(getTodos.data, null, 2)}
    </pre>
  </div>;
}
