import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import login from "../api/login";
import useAuth from "./useAuth";

const useLogin = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const {
    mutate: loginMutate,
    isPending: loginPending,
    isError: loginError,
  } = useMutation({
    mutationFn: login,
    onMutate: () => {
      return toast.loading("Loggin in...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Login successful!");
      setIsLoggedIn(true);
      navigate("/");
    },
    onError: (err: unknown) => {
      toast.dismiss();
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message || "Login Failed");
      } else {
        toast.error("An unexpected error occured");
      }
    },
  });
  return { loginMutate, loginPending, loginError };
};
export default useLogin;
