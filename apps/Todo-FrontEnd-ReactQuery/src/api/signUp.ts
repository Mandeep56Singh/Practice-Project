import { SignUpType } from "../schema/auth.schema";
import apiClient from "../utils/apiClient";

const signUp = async (data: SignUpType) => {
  const response = await apiClient.post("/auth/register", {
    ...data,
  });
  return response;
};
export default signUp;
