import useAuthContext from "../../hooks/useAuthContext";
import { UserProfile } from "@clerk/clerk-react";

export default function ProfilePage(): React.ReactNode {
  const { userInfo } = useAuthContext();

  console.log("userInfo", userInfo);

  return (
    <section className="text-slate-400 flex flex-col ">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <main className="w-4/6 min-h-[400px] m-0 p-1">
          <div className="p-2">
            <UserProfile />
          </div>
          <div className="p-2"></div>
        </main>
      </div>
    </section>
  );
}
