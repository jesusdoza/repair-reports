import InviteToolContainer from "../../components/Invite/InviteToolContainer";
import UserInfoContainer from "../../components/Profile/UserInfoContainer";

export default function ProfilePage(): React.ReactNode {
  return (
    <section className="text-slate-400 flex h-[400px]">
      <main className="w-4/6 bg-red-950 m-0 h-full p-1">
        <UserInfoContainer />

        <InviteToolContainer />
      </main>

      {/* side bar */}
      <aside className="w-2/6  h-full m-0 bg-green-900 p-1"></aside>
    </section>
  );
}
