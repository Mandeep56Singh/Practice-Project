import prisma from "../config/prisma.js";
import { todoIdType } from "../validators/todo.schema.js";

export const deleteTodoHandler = async (
  todoId: todoIdType["params"]["id"]
): Promise<void> => {
  await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });
};
