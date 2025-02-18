import { FileQuestion } from "lucide-react";
const NoTodoFallBack = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-20">
      <FileQuestion className="size-40 text-muted-foreground " />
      <h1 className=" text-muted-foreground text-center">
        No Todos Found <br /> Please Create New Task
      </h1>
    </div>
  );
};

export default NoTodoFallBack;
