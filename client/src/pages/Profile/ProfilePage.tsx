import { useEffect } from "react";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import InviteToolContainer from "../../components/Invite/InviteToolContainer";
import UserInfoContainer from "../../components/Profile/UserInfoContainer";
import UserStats from "../../components/Profile/UserStats/UserStats";
import useGetUserGroups from "../../hooks/useGetUserGroups";

export default function ProfilePage(): React.ReactNode {
  const { data: userGroupMemberships, fetchData: getUserGroupData } =
    useGetUserGroups();

  useEffect(() => {
    getUserGroupData();
  }, []);

  return (
    <section className="text-slate-400   flex flex-col ">
      <div className="flex">
        <main className="w-4/6 min-h-[400px] m-0 p-1">
          <div className="p-2">
            <UserInfoContainer />
          </div>
          <div className="p-2">
            <ErrorBoundary componentName="InviteTool">
              <InviteToolContainer
                userGroupMemberships={userGroupMemberships}
              />
            </ErrorBoundary>
          </div>
        </main>

        {/* side bar */}
        <aside className="w-2/6 min-h-[400px] m-0 bg-green-900 p-1">
          <ErrorBoundary componentName="UserStats">
            <UserStats groupsList={userGroupMemberships} />
          </ErrorBoundary>
        </aside>
      </div>
    </section>
  );
}
