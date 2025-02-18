import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logOut from "../api/logOut";
import useAuth from "./useAuth";

const useLogOut = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { isPending: logOutPending, mutate: logOutMutate } = useMutation({
    mutationFn: logOut,
    onMutate: () => {
         return toast.loading("Loggin in...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Logged Out successful!");
      setIsLoggedIn(false);
      navigate("/login");
    },
    onError: (err: unknown) => {
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message);
        console.error("Axios Error", err.response);
      }
      toast.error("Unknown Error");
    },
  });
  return { logOutMutate, logOutPending };
};
export default useLogOut;
