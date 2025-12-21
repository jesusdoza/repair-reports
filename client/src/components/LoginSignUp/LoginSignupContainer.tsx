import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuth, SignIn } from "@clerk/clerk-react";

export default function LoginSignupContainer(): React.ReactNode {
  const { isAuth } = useContext(AuthContext);
  const { userId } = useAuth();

  const navigate = useNavigate();

  if (isAuth || userId) {
    navigate("/latest");
  }

  return (
    <div className="flex flex-col w-full items-center bg-slate-50">
      <SignIn
        signUpUrl="/signup/clerk"
        afterSignOutUrl={"/"}
        fallbackRedirectUrl={"/login"}
        forceRedirectUrl={"/login/clerk/loaduser"}
      />
    </div>
  );
}
