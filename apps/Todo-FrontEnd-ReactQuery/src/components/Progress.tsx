import { useEffect, useState } from "react";
import { Progress } from "repo-uikit/components/ui/progress";
import useFetchAll from "../hooks/useFecthAll";

const ProgressBar = () => {
  const { todoData } = useFetchAll();
  const total = todoData?.length ?? 0;
  const completed = todoData?.filter((todo) => todo.completed).length ?? 0;
  const pending = total - completed;
  const progressPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const [progress, setProgress] = useState(progressPercentage);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(progressPercentage), 500);
    return () => clearTimeout(timer);
  });
  return (
    <div className="sm:w-[425px] w-full mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 sm:justify-between ">
        <div className="border-2 rounded-md p-2 w-full sm:w-[120px] flex flex-col items-center border-primary">
          <h1>Completed</h1>
          <div className="font-semibold">{completed} Task</div>
        </div>
        <div className="border-2 rounded-md p-2 w-full sm:w-[120px] flex flex-col items-center border-primary">
          <h1>Pending</h1>
          <div className="font-semibold">{pending} Task</div>
        </div>
        <div className="border-2 rounded-md p-2 w-full sm:w-[120px] flex flex-col items-center border-primary">
          <h1>Progress</h1>
          <div className="relative w-full h-8">
            <Progress value={progress} className="h-full" />
            <h1 className="absolute inset-0 flex items-center justify-center font-semibold ">
              {progressPercentage}%
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
