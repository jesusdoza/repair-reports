import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="flex w-full h-screen justify-center">
      <div>
        <SignUp
          signInUrl={"/login/clerk"}
          forceRedirectUrl={`/login/clerk/loaduser`}
        />
      </div>
    </div>
  );
}
