import { LoginType } from "../schema/auth.schema";
import apiClient from "./apiClient";

const login = async (credentials: LoginType) => {
  const response = await apiClient.post("/auth/login", {
    ...credentials,
  });
  return response;
};

export default login;
