import { useEffect, useState } from "react";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import InviteToolContainer from "../../components/Invite/InviteToolContainer";
import UserInfoContainer from "../../components/Profile/UserInfoContainer";
import UserStats from "../../components/Profile/UserStats/UserStats";
import useGetUserGroups from "../../hooks/useGetUserGroups";
import useGetUserRepairs from "../../hooks/useGetUserRepairs";
import Modal from "../../components/Modal/Modal";

export default function ProfilePage(): React.ReactNode {
  const { data: userGroupMemberships, fetchData: getUserGroupData } =
    useGetUserGroups();
  const { getData, metaData } = useGetUserRepairs();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(
    <>
      <p>no content</p>
    </>
  );

  useEffect(() => {
    getUserGroupData();
    getData();
  }, []);

  return (
    <section className="text-slate-400 flex flex-col ">
      <div className="">
        <Modal
          onClose={() => {
            setIsModalOpen(false);
          }}
          isOpen={isModalOpen}>
          {modalContent}
        </Modal>
      </div>
      {/* TEST MODAL BUTTON */}
      <button
        className="btn btn-sm w-[100px]"
        onClick={(event) => {
          event.preventDefault();
          setIsModalOpen((bool) => {
            return !bool;
          });
        }}>
        modal toggle
      </button>
      {/* TEST MODAL BUTTON */}
      <div className="flex flex-col md:flex-row justify-center items-center">
        {/* side bar */}
        <aside className="w-2/6 min-h-[400px] m-0 p-1">
          <ErrorBoundary componentName="UserStats">
            <UserStats
              groupsList={userGroupMemberships}
              totalRepairs={metaData.totalByUser}
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
