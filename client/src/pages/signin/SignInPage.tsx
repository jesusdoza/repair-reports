import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";

export default function SignInPage() {
  return <SignIn signUpUrl="/signup"></SignIn>;
}
