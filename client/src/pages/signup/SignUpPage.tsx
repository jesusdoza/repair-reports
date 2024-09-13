import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="flex w-full h-screen justify-center">
      <SignUp
        signInUrl="/login"
        forceRedirectUrl={"/signup/setup"}></SignUp>
      ;
    </div>
  );
}
