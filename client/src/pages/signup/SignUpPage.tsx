import { SignUp } from "@clerk/clerk-react";
const forceRedirectUrl = `/signup/setup/clerk`;

export default function SignUpPage() {
  return (
    <div className="flex w-full h-screen justify-center">
      <div>
        <SignUp
          signInUrl="/login/clerk"
          forceRedirectUrl={forceRedirectUrl}
        />
      </div>
    </div>
  );
}
