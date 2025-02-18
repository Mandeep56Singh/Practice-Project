import { CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

const CustomToaster = (message: string, type = "default") => {
  let bgColor;
  let textColor;
  let Icon;

  // Determine styles and icon based on toast type
  switch (type) {
    case "success":
      bgColor = "bg-primary";
      textColor = "text-primary-foreground";
      Icon = CheckCircle;
      break;
    case "error":
      bgColor = "bg-destructive";
      textColor = "text-destructive-foreground";
      Icon = XCircle;
      break;
    default:
      bgColor = "bg-card";
      textColor = "text-card-foreground";
      Icon = null;
  }

  // Display the custom toast
  toast.custom((t) => (
    <div
      className={`transition-opacity duration-300 ${
        t.visible ? "opacity-100" : "opacity-0"
      } ${bgColor} ${textColor} p-4 rounded-[var(--radius)] shadow-lg flex items-center max-w-xs`}
      {...t.ariaProps}
    >
      {Icon && <Icon className="mr-2 h-5 w-5" />}
      {message}
    </div>
  ));
};

export default CustomToaster;
