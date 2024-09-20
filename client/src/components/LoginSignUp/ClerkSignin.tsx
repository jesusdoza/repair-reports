import { SignIn } from "@clerk/clerk-react";

export default function ClerkSignIn() {
  return (
    <SignIn
      signUpUrl="/signup/clerk"
      afterSignOutUrl={"/"}
      fallbackRedirectUrl={"/login"}
      forceRedirectUrl={"/login/clerk/signin"}
    />
  );
}
