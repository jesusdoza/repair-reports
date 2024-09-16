import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function SignupSetupPage() {
  const { signUpWithProvider, userInfo } = useContext(AuthContext);
  // const { getInvite } = useInviteManager();
  const { userId } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  // const password = location.hash.substring(1);
  // const clerkAuthProvider = user?.externalAccounts[0].provider;

  // console.log("password", password);
  // console.log("clerk provider", user?.externalAccounts[0].provider);

  const email = user?.emailAddresses[0].emailAddress;
  const username = user?.username;

  const handleCreateUserProfile = async () => {
    try {
      if (email && signUpWithProvider) {
        await signUpWithProvider({
          email,
          username,
          provider: "clerk",
          providerId: userId!,
        });

        navigate("/dashboard");
      }
    } catch (error) {
      setErrors(["failed to signup with provider"]);
    }
  };

  useEffect(() => {
    handleCreateUserProfile();
  }, []);
  useEffect(() => {
    console.log("userInfo", userInfo);
  }, [userInfo]);

  return (
    <div className="h-[500px] w-full flex justify-center items-center">
      <div className="bg-red-600">{errors}</div>
      <span>Loading your profile</span>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
