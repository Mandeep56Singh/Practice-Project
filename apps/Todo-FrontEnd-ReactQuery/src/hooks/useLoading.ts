import { useEffect } from "react";
import toast from "react-hot-toast";

const useLoading = (loading: boolean) => {

      useEffect(() => {
        let toastId = "";
        if (loading) {
          toastId = toast.loading("Getting your data");
        }
        if (!loading) {
          toast.dismiss(toastId);
        }
    
        return () => toast.dismiss(toastId);
      }, [loading]);
}
export default useLoading