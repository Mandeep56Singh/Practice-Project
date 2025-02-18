import { ScaleLoader } from "react-spinners";
import useTheme from "../../hooks/useTheme";

function Loader() {
  const { theme } = useTheme();

  return (
    <div className="items-center h-[100vh]  flex flex-col justify-center overflow-hidden  mx-auto my-auto gap-2 ">
      <ScaleLoader
        color={
          theme === "dark" ? "hsl(142.1 70.6% 45.3%)" : "hsl(142.1 76.2% 36.3%)"
        }
        height={50}
        width={2}
        radius={2}
        className="scale-x-[2]"
      ></ScaleLoader>
    </div>
  );
}

export default Loader;
