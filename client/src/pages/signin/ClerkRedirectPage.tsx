import { useEffect } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function ClerkRedirectPage() {
  const { verifyLogin } = useAuthContext();

  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUserInfo() {
      if (isSignedIn) {
        verifyLogin();
        navigate("/dashboard");
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
