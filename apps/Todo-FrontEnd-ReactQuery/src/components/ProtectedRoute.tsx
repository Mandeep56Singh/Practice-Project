import { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "./ui/Loader";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <Loader></Loader>;
  }

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};
export default ProtectedRoute;
