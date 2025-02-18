import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { Button } from "repo-uikit/components/ui/button";
import { Dialog, DialogTrigger } from "repo-uikit/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "repo-uikit/components/ui/dropdown-menu";
import { TodoType } from "../../types/todo.type";
import TaskEditor from "./TaskEditor";

export type OptionsProps = Pick<TodoType, "id" | "priority" | "text"> & {
  onDelete: (id: string) => void;
  isDeleting: boolean;
};

const Options: React.FC<OptionsProps> = ({
  id,
  onDelete,
  isDeleting,
  text,
  priority,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <Ellipsis></Ellipsis>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" mr-2">
        <Dialog open={isOpen} onOpenChange={() => setIsOpen((state) => !state)}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e: Event) => e.preventDefault()}>
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <TaskEditor
            id={id}
            priority={priority}
            text={text}
            onOpen={setIsOpen}
          ></TaskEditor>
        </Dialog>
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => onDelete(id)}
          disabled={!isDeleting}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Options;
