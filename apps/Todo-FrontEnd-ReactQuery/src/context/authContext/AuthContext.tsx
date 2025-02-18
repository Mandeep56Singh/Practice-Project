import { createContext } from "react";

type AuthContextProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
};
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
