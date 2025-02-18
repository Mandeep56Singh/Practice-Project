import { ArrowDownUp } from "lucide-react";
import { useRef, useState } from "react";
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
import { Label } from "repo-uikit/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "repo-uikit/components/ui/select";
import useStore, { SortState } from "../store/store";
export function SortBy() {
  const { sortBy, order, sortTodos } = useStore();

  const [sortVal, setSortVal] = useState<SortState["sortBy"]>(sortBy);
  const [orderVal, setOrderVal] = useState<SortState["order"]>(order);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //  prev values
  const prevValues = useRef({ sortBy, order });

  const handleSave = () => {
    const hasChanged =
      prevValues.current.sortBy !== sortVal ||
      prevValues.current.order !== orderVal;

    if (!hasChanged) {
      console.log("No changes, function will not run");
      setIsOpen(false);
      return;
    }
    sortTodos(sortVal, orderVal);

    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          <ArrowDownUp />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sort Tasks</DialogTitle>
          <DialogDescription>
            Select the Sorting and click on Save
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Sort By
            </Label>
            <Select
              value={sortVal}
              onValueChange={(val) => setSortVal(val as SortState["sortBy"])}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue>{sortVal || "Select an option"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort By</SelectLabel>
                  <SelectItem value="Priority">Priority</SelectItem>
                  <SelectItem value="Date">Date</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right whitespace-nowrap">
              Order
            </Label>
            <Select
              value={orderVal}
              onValueChange={(val) => setOrderVal(val as SortState["order"])}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue>{orderVal || "Select an optioin"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort Order</SelectLabel>
                  <SelectItem value="ASC">ASC</SelectItem>
                  <SelectItem value="DSC">DSC</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
