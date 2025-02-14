import prisma from "../config/prisma.js";
import { deleteTodoParmamType } from "../validators/todo.schema.js";

export const deleteTodoHandler = async (
  todoId: deleteTodoParmamType["params"]["id"]
): Promise<void> => {
  await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });
};
