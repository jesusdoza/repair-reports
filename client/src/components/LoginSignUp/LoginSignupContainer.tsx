import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "./LoginForm";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import SignupForm from "./SignupForm";

export default function LoginSignupContainer(): React.ReactNode {
  const { login, signUp } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    inviteCode: "",
  });

  const [isLogin, setIsLogin] = useState(true);
  const [validPassword, setValidPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  return (
    <div className="flex flex-col w-full items-center">
      <div className=" flex justify-center w-full">
        <div className="bg-slate-500 p-1 h-full flex flex-col gap-1 w-full">
          <ErrorBoundary componentName="LoginForm">
            <LoginForm />
          </ErrorBoundary>
          <ErrorBoundary componentName="LoginForm">
            <SignupForm />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
