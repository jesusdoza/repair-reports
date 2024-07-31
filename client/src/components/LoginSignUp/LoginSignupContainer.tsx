import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "./LoginForm";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import SignupForm from "./SignupForm";

export default function LoginSignupContainer(): React.ReactNode {
  const { login, signUp } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col w-full items-center">
      <div className=" flex justify-center w-full">
        <div className="bg-slate-500 p-1 h-full flex flex-col gap-1 w-full">
          <div
            onClick={() => {
              setIsLogin((state) => !state);
            }}
            className="btn-xs btn w-48 self-end">
            {isLogin ? "Signup Here" : "Login Here"}
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
                  if (signUp) signUp({ email, password, inviteCode, username });
                }}
              />
            </ErrorBoundary>
          )}
        </div>
      </div>
    </div>
  );
}
