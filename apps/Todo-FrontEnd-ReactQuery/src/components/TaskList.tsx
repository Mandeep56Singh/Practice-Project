import useFetchAll from "../hooks/useFecthAll";
import { SortBy } from "./SortBy";
import Task from "./Task";
import NoTodoFallBack from "./ui/NoTodoFallBack";
import TaskAdder from "./ui/TaskAdder";

const TaskList = () => {
  const {  todos } = useFetchAll();


  console.log(todos, "data");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold ">All Todos</h1>
        </div>
        <div className="flex gap-4">
          <SortBy></SortBy>
          <TaskAdder></TaskAdder>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {todos.length ? (
          todos.map((item, i) => (
            <div
              key={item.id}
              className={`${i < todos.length - 1 && "border-b"}  py-3`}
            >
              <Task
                id={item.id}
                text={item.text}
                completed={item.completed}
                priority={item.priority}
              ></Task>
            </div>
          ))
        ) : (
          <NoTodoFallBack></NoTodoFallBack>
        )}
      </div>
    </div>
  );
};

export default TaskList;
