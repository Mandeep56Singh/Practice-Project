import { LogOut, Moon, SunMoon } from "lucide-react";
import { Button } from "repo-uikit/components/ui/button";
import useLogOut from "../hooks/useLogOut";
import useTheme from "../hooks/useTheme";
import Logo from "./ui/Logo";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { logOutMutate, logOutPending } = useLogOut();

  return (
    <div className="flex justify-between">
      <div>
        <Logo></Logo>
      </div>
      <div>
        <Button variant={"ghost"} size={"icon"} onClick={toggleTheme}>
          {theme == "light" ? <Moon></Moon> : <SunMoon></SunMoon>}
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => logOutMutate()}
          disabled={logOutPending}
        >
          <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default Header;
