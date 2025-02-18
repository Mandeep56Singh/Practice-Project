import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "repo-uikit/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "repo-uikit/components/ui/dialog";
import { Input } from "repo-uikit/components/ui/input";
import { Label } from "repo-uikit/components/ui/label";
import useEdit from "../../hooks/useEdit";
import { TodoDataType, todoSchema } from "../../schema/todo.schema";
import Priority from "./Priority";
type TaskEditorProps = TodoDataType & {
  id: string;
  onOpen: (state: boolean) => void;
};
const TaskEditor: React.FC<TaskEditorProps> = ({
  id,
  priority,
  text,
  onOpen,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,

    formState: { errors },
  } = useForm<TodoDataType>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      text: text,
      priority: priority,
    },
  });

  const { editMutate } = useEdit();
  console.log(errors, "errors");
  const onSubmit = async (data: TodoDataType) => {
    try {
      const updatedTodo = {
        id: id,
        ...data,
      };
      reset();
      await editMutate(updatedTodo);
      onOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };
  return (
    <DialogContent className="sm:max-w-[425px] max-w-[320px]">
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription>
          Make new Task to our list. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input id="title" className="col-span-3" {...register("text")} />
          {errors.text && (
            <p className="text-red-500 text-sm col-span-4">
              {errors.text.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Priority
          </Label>
          <Priority priority={priority} onChange={(value) => setValue("priority", value)} />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default TaskEditor;
