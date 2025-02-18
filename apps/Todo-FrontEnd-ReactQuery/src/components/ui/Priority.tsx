import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "repo-uikit/components/ui/select";

type PriorityProps = {
  onChange: (value: "LOW" | "MEDIUM" | "HIGH") => void;
  priority?: "LOW" | "MEDIUM" | "HIGH";
};

const Priority: React.FC<PriorityProps> = ({ onChange, priority }) => {
  return (
    <Select
      defaultValue={priority || "LOW"}
      onValueChange={(value) => onChange(value as "LOW" | "MEDIUM" | "HIGH")}
    >
      <SelectTrigger className="w-[100px]   text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Priority</SelectLabel>
          <SelectItem value="LOW">LOW</SelectItem>
          <SelectItem value="MEDIUM">MEDIUM</SelectItem>
          <SelectItem value="HIGH">HIGH</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Priority;
