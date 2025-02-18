import React from "react";
import toast from "react-hot-toast";
import { Badge } from "repo-uikit/components/ui/badge";
import { Checkbox } from "repo-uikit/components/ui/checkbox";
import { Label } from "repo-uikit/components/ui/label";
import useDelete from "../hooks/useDelete";
import useToggleCompletion from "../hooks/useToggleCompletion";
import { TodoType } from "../types/todo.type";
import Options from "./ui/Options";

const Task: React.FC<TodoType> = ({ id, text, completed, priority }) => {
  let bg = "";
  switch (priority) {
    case "MEDIUM":
      bg =
        "bg-yellow-500 dark:bg-yellow-600/20 dark:text-yellow-400 dark:border-yellow-400 hover:bg-yellow-500/80 dark:hover:bg-yellow-600/40";
      break;
    case "HIGH":
      bg =
        "bg-red-500 dark:bg-red-600/20 hover:bg-red-600/80 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-600/40";
      break;
    default:
      bg =
        "bg-green-500 dark:bg-green-600/20 hover:bg-green-600/80 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-600/40";
      break;
  }

  const { isPending, mutate: toggleMutate } = useToggleCompletion();

  const toggleComplete = (id: string) => {
    if (!navigator.onLine) {
      toast.error("You are offline!");
      return;
    }
    toggleMutate(id);
  };
  const { isDeleting, deleteMutate } = useDelete();
  return (
    <div className="flex items-center gap-2  justify-between">
      <div className="flex items-center gap-2">
        <Checkbox
          id={id}
          checked={completed}
          onClick={() => toggleComplete(id)}
          disabled={isPending}
        ></Checkbox>
        <Label htmlFor={id} className=" text-base">
          {text}
        </Label>
      </div>
      <div className="flex gap-2 ">
        <Badge className={bg}>{priority}</Badge>
        <Options
          id={id}
          priority={priority}
          text={text}
          onDelete={deleteMutate}
          isDeleting={!isDeleting}
        ></Options>
      </div>
    </div>
  );
};

export default Task;
