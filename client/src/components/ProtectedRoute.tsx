// PrivateRoute.js
import React, { useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import LoginSignupContainer from "./LoginSignUp/LoginSignupContainer";
import { useAuth, SignedIn } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuthContext();

  const { userId, isLoaded } = useAuth();

  const isAuthenticated = isAuth || userId;

  useEffect(() => {
    console.log("isAuth", isAuth);
    if (userId) {
      console.log("get user profile");
    }
  }, [isLoaded]);

  if (!isLoaded) return "Loading...";

  return (
    <>
      {!isAuthenticated ? (
        <LoginSignupContainer />
      ) : (
        <>
          {children}
          {/*
          <SignedOut></SignedOut>
          <SignInButton></SignInButton>
          <UserButton></UserButton> */}
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
