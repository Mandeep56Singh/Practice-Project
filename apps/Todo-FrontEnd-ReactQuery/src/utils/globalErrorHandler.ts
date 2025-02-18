import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const globalErrorHandler = (error: unknown): void => {
  let message = "unknown error occured";

  if (error instanceof AxiosError) {
    message = error.response?.data.message || "Api Error";
  } else if (error instanceof Error) {
    message = error.message;
  }
  toast.error(message);
  console.error(message);
};
