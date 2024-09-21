import { useEffect, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";

export default function ClerkRedirectPage() {
  const { verifyLogin, signUpWithProvider } = useAuthContext();
  const { userId, isSignedIn } = useAuth();
  const { user } = useUser();
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const email = user?.emailAddresses[0].emailAddress;
  const username = user?.username;

  useEffect(() => {
    async function loadUserInfo() {
      if (isSignedIn) {
        const userProfile = await verifyLogin();
        if (userProfile) {
          // navigate("/dashboard");
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
          }

          // navigate("/dashboard");
        }
      }
    }

    loadUserInfo();
  }, [isSignedIn]);

  return (
    <div>
      <div className="h-[500px] w-full flex flex-col justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
        <div>
          <span>Loading your profile</span>
        </div>

        {errors.length ? (
          <div>
            {errors.map((err) => (
              <span>{err}</span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
