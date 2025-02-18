import { isAxiosError } from "axios";
import React, { ReactNode, useEffect, useState } from "react";
import fetchAllTodos from "../../api/featchAllTodos";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: ReactNode;
};
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetchAllTodos();
        setIsLoggedIn(true);
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          console.error("Axios error", err.response?.data);
        } else if (err instanceof Error) {
          console.error("JS error", err.message);
        } else {
          console.error("Unexpected error:", err);
        }
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [setIsLoggedIn, setLoading]);
  
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
