import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import signUp from "../api/signUp";

const useSignUp = () => {
  const navigate = useNavigate();

  const { mutate: signUpMutate, isPending: signUpPending } = useMutation({
    mutationFn: signUp,
    onMutate: () => {
      return toast.loading("Creating your account...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Account Created");
      navigate("/login");
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
  return { signUpMutate, signUpPending };
};
export default useSignUp;
