// PrivateRoute.js
import React from "react";
import useAuthContext from "../hooks/useAuthContext";
import LoginSignupPage from "../pages/Login/LoginSignupPage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuthContext();

  return <>{!isAuth ? <LoginSignupPage /> : <>{children}</>}</>;
};

export default ProtectedRoute;
