import { useEffect } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";

export default function ClerkRedirectPage() {
  const { verifyLogin, signUpWithProvider } = useAuthContext();
  const { userId, isSignedIn } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const email = user?.emailAddresses[0].emailAddress;
  const username = user?.username;

  useEffect(() => {
    async function loadUserInfo() {
      if (isSignedIn) {
        const userProfile = await verifyLogin();
        if (userProfile) {
          navigate("/dashboard");
        } else if (email && signUpWithProvider) {
          console.log("user does not exists making profile one", userProfile);

          await signUpWithProvider({
            email,
            username,
            provider: "clerk",
            providerId: userId!,
          });

          navigate("/dashboard");
        }
      }
    }
    loadUserInfo();
  }, [isSignedIn]);

  return (
    <div>
      <div className="h-[500px] w-full flex justify-center items-center">
        <span>Loading your profile</span>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </div>
  );
}
