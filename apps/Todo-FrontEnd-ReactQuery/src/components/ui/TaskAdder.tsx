import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "repo-uikit/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "repo-uikit/components/ui/dialog";
import { Input } from "repo-uikit/components/ui/input";
import { Label } from "repo-uikit/components/ui/label";
import useCreate from "../../hooks/useCreate";
import { TodoDataType, todoSchema } from "../../schema/todo.schema";
import Priority from "./Priority";

const TaskAdder: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TodoDataType>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      priority: "LOW",
    },
  });

  const { createMutate } = useCreate();
  const onSubmit = (data: TodoDataType) => {
    console.log(data, "Form data");
    reset();
    const todo = createMutate(data);
    console.log(todo, "todo created");
    setIsOpen(false);
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(state) => {
        setIsOpen(state);
        if (!state) reset(); // ✅ Reset form when closing (including cross icon)
      }}
    >
      <DialogTrigger asChild>
        <Button>+ Add </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[320px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Make new Task to our list. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              placeholder="your title"
              {...register("text")}
            />
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
            <Priority onChange={(value) => setValue("priority", value)} />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskAdder;
