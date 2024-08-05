// PrivateRoute.js
import React from "react";
import useAuthContext from "../hooks/useAuthContext";
import LoginSignupContainer from "./LoginSignUp/LoginSignupContainer";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuthContext();

  return <>{!isAuth ? <LoginSignupContainer /> : <>{children}</>}</>;
};

export default ProtectedRoute;
