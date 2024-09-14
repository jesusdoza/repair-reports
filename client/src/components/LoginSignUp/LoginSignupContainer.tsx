import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "./LoginForm";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import SignupForm from "./SignupForm";
import ColabImage from "../../assets/Live collaboration-rafiki.svg";
import { Navigate, useNavigate } from "react-router-dom";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignIn,
  SignUp,
  useAuth,
} from "@clerk/clerk-react";
import ClerkSignIn from "./ClerkSignin";

export default function LoginSignupContainer(): React.ReactNode {
  const { login, signUp, isAuth } = useContext(AuthContext);
  const { userId } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [oldLogin, toggleOldLogin] = useState(false);

  if (isAuth || userId) {
    return (
      <Navigate
        to="/latest"
        replace={true}
      />
    );
  }

  return (
    <div className="flex flex-col w-full items-center bg-slate-50">
      <div
        className="btn bg-white btn-sm "
        onClick={() => {
          toggleOldLogin(!oldLogin);
        }}>
        or use {oldLogin ? "new login page" : "old login page"} here
      </div>
      {!oldLogin ? (
        <div>
          <ClerkSignIn />
        </div>
      ) : (
        <div className=" flex justify-center w-full">
          <div className=" h-full flex flex-row w-full p1">
            <div className="w-1/2 absolute opacity-90 h-full "></div>
            <section className="z-10 w-full flex items-center flex-col justify-center  relative">
              <div
                className="btn-xs btn  absolute top-2 right-3 text-black bg-teal-400 hover:bg-teal-600"
                onClick={() => {
                  setIsLogin((state) => !state);
                }}>
                <span className="">
                  {isLogin ? "Signup Here" : "Login Here"}
                </span>
              </div>
              {isLogin ? (
                <ErrorBoundary componentName="Login Form">
                  <LoginForm
                    onLogin={(username, password) => {
                      if (login) login(username, password);
                    }}
                  />
                </ErrorBoundary>
              ) : (
                <ErrorBoundary componentName="Signup Form">
                  <SignupForm
                    onSubmit={({ username, password, email, inviteCode }) => {
                      if (signUp)
                        signUp({ email, password, inviteCode, username });
                    }}
                  />
                </ErrorBoundary>
              )}
            </section>

            <section className="w-full h-full bg-slate-300 z-0 ">
              <img
                src={ColabImage}
                alt="image of 2 people shaking hands"
              />
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
