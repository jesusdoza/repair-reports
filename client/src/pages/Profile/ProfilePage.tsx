import InviteToolContainer from "../../components/Invite/InviteToolContainer";
import UserInfoContainer from "../../components/Profile/UserInfoContainer";

export default function ProfilePage(): React.ReactNode {
  return (
    <section className="text-slate-400 bg-emerald-400  flex flex-col ">
      <div className="flex">
        <main className="w-4/6 min-h-[400px] bg-red-950 m-0 p-1">
          <UserInfoContainer />
        </main>

        {/* side bar */}
        <aside className="w-2/6 min-h-[400px] m-0 bg-green-900 p-1">
          aside
        </aside>
      </div>
      <InviteToolContainer />
    </section>
  );
}
