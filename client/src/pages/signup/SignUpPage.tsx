import { SignUp } from "@clerk/clerk-react";
const forceRedirectUrl = `/signup/setup`;

export default function SignUpPage() {
  return (
    <div className="flex w-full h-screen justify-center">
      <div>
        <SignUp
          signInUrl="/login"
          forceRedirectUrl={forceRedirectUrl}
        />
      </div>
    </div>
  );
}
