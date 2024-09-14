import { SignIn } from "@clerk/clerk-react";
import React from "react";

export default function ClerkSignIn() {
  return (
    <SignIn
      signUpUrl="/signup"
      afterSignOutUrl={"/"}
      fallbackRedirectUrl={"/login/clerk"}
      forceRedirectUrl={"/login/clerk"}
    />
  );
}
