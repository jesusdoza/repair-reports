import { useEffect } from "react";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import InviteToolContainer from "../../components/Invite/InviteToolContainer";
import UserInfoContainer from "../../components/Profile/UserInfoContainer";
import useGetUserGroups from "../../hooks/useGetUserGroups";
import useGetUserRepairs from "../../hooks/useGetUserRepairs";
import { UserButton } from "@clerk/clerk-react";
import UserStats from "../../components/Profile/UserStats/UserStats";
import useAuthContext from "../../hooks/useAuthContext";
// import Modal from "../../components/Modal/Modal";

export default function ProfilePage(): React.ReactNode {
  const { data: userGroupMemberships, fetchData: getUserGroupData } =
    useGetUserGroups();
  const { getData, metaData } = useGetUserRepairs();

  const { userInfo } = useAuthContext();
  const authProvider = userInfo?.authProvider;

  useEffect(() => {
    getUserGroupData();
    getData();
  }, []);

  return (
    <section className="text-slate-400 flex flex-col ">
      <div className="flex flex-col md:flex-row justify-center items-center">
        {/* side bar */}
        <aside className="w-2/6 min-h-[400px] m-0 p-1">
          <ErrorBoundary componentName="UserStats">
            {/* create component for this */}
            {/* <UserProfile></UserProfile> */}
            {authProvider === "local" ? (
              <div className="self-center w-full flex justify-center">
                <div className="avatar placeholder w-full">
                  <div className="bg-neutral text-neutral-content w-full rounded-full">
                    <span className="text-[100px] w-full">
                      {userInfo?.username}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <UserButton
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    avatarBox: "w-full h-full",
                    userButtonTrigger: "w-full h-full",
                    userButtonBox: "w-[300px] h-[300px]",
                  },
                }}
              />
            )}
            {/*  */}
            <UserStats
              groupsList={userGroupMemberships}
              totalRepairs={metaData.totalByUser}
              username={userInfo?.username}
            />
          </ErrorBoundary>
        </aside>

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
      </div>
    </section>
  );
}
