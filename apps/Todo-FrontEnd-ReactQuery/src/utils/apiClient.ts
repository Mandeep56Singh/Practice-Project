import axios from "axios";
import { toast } from "react-hot-toast";

const apiClient = axios.create({
  baseURL: "https://todo-backend-mongo.onrender.com/api",
  withCredentials: true,
  
});

// Global request interceptor to check internet connectivity
apiClient.interceptors.request.use(
  (config) => {
    if (!navigator.onLine) {
      toast.error("You're offline! Please check your internet connection.");
      return Promise.reject(new Error("No internet connection"));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
