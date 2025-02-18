import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Progress from "../components/Progress";
import TaskList from "../components/TaskList";
import TodoLoader from "../components/ui/TodoLoader";
import useFetchAll from "../hooks/useFecthAll";

function HomePage() {
  const { isFetching } = useFetchAll();

  if (isFetching) {
    return <TodoLoader></TodoLoader>;
  }
  return (
    <div className="max-w-[680px] p-4 m-2 md:border-2 rounded-md flex flex-col mx-auto gap-8 ">
      <Toaster></Toaster>
      <Header></Header>
      <Progress></Progress>
      <TaskList></TaskList>
    </div>
  );
}

export default HomePage;
