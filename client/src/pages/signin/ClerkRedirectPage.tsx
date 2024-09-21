import { useEffect, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";

export default function ClerkRedirectPage() {
  const { verifyLogin, signUpWithProvider } = useAuthContext();
  const { userId, isSignedIn, signOut, isLoaded } = useAuth();
  const { user } = useUser();
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const email = user?.emailAddresses[0].emailAddress;
  const username = user?.username;

  const handleLogout = async () => {
    await signOut({ redirectUrl: "/login" });
    navigate("/login");
  };

  useEffect(() => {
    async function loadUserInfo() {
      if (isLoaded) {
        if (isSignedIn) {
          const userProfile = await verifyLogin();
          if (userProfile) {
            navigate("/dashboard");
          } else if (email && signUpWithProvider) {
            console.log("user does not exists making profile one", userProfile);

            const { error } = await signUpWithProvider({
              email,
              username,
              provider: "clerk",
              providerId: userId!,
            });

            if (error) {
              if (error == "email invalid") {
                setErrors(["email already in use"]);
              }

              return;
            }

            navigate("/dashboard");
          }
        } else {
          setErrors(["You need be logged in"]);
        }
      }
    }

    loadUserInfo();
  }, [isSignedIn, isLoaded]);

  return (
    <div>
      <div className="h-[500px] w-full flex flex-col justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
        <div>
          <span>Loading your profile</span>
        </div>

        {errors.length ? (
          <section>
            <div>
              <span>Error </span>
              {errors.map((err) => (
                <div
                  role="alert"
                  className="alert alert-warning">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{err}</span>
                </div>
              ))}
            </div>
            <div
              onClick={handleLogout}
              className="btn btn-info ">
              <h3>Login here</h3>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
