import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "./LoginForm";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import SignupForm from "./SignupForm";
import ColabImage from "../../assets/Live collaboration-rafiki.svg";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@clerk/clerk-react";
import { XCircle } from "lucide-react";

export default function LoginSignupContainer(): React.ReactNode {
  const { login, signUp, isAuth } = useContext(AuthContext);
  const { userId } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [displayErrors, setDisplayErrors] = useState([] as string[]);
  const navigate = useNavigate();

  if (isAuth || userId) {
    navigate("/latest");
  }

  return (
    <div className="flex flex-col w-full items-center bg-slate-50">
      <Link
        to={"/login/clerk"}
        className="btn bg-white btn-sm ">
        or use new login page here
      </Link>

      <div className=" flex justify-center w-full">
        <div className=" h-full flex flex-col w-full p1 relative md:flex-row md:w-3/4 lg:w-1/2 xl:w-2/5 2xl:w-1/3">
          <div className="w-1/2 absolute opacity-90 h-full"></div>

          {/* form for signup */}
          <section className="z-10 w-full flex items-center flex-col justify-center relative">
            <div
              className="btn-xs btn absolute top-2 right-3 text-black bg-teal-400 hover:bg-teal-600 z-10"
              onClick={() => {
                setIsLogin((state) => !state);
              }}>
              <span className="">{isLogin ? "Signup Here" : "Login Here"}</span>
            </div>

            <div className="bg-white w-auto h-auto p-4 rounded-lg shadow-lg">
              {isLogin ? (
                <ErrorBoundary componentName="Login Form">
                  <LoginForm
                    onLogin={async (username, password) => {
                      if (login) {
                        const result = await login(username, password);

                        if (result.error) {
                          console.log("login error", result.error);
                          setDisplayErrors([result.error]);
                        }
                      }
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
            </div>
          </section>
          {/* image  */}
          <section className="w-full h-full bg-slate-300 z-0 ">
            <img
              src={ColabImage}
              alt="image of 2 people shaking hands"
            />
          </section>
        </div>
      </div>
      <div>
        {displayErrors.length > 0 ? (
          <ErrorBanner errors={displayErrors} />
        ) : null}
      </div>
    </div>
  );
}

interface ErrorBannerProps {
  errors: string[];
  // onDismiss: () => void;
}

function ErrorBanner({ errors }: ErrorBannerProps) {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 rounded-md shadow-md">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <XCircle
            className="h-5 w-5 text-red-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1">
          {/* <h3 className="text-sm font-medium text-red-800">
            There {errors.length === 1 ? "is an error" : "are errors"} with your
            submission
          </h3> */}
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc pl-5 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <span className="sr-only">Dismiss</span>
              <XCircle
                className="h-5 w-5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
