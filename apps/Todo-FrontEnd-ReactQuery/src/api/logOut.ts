import apiClient from "./apiClient";

const logOut = async () => {
  const response = await apiClient.post("/auth/logOut");
  return response;
};

export default logOut;
