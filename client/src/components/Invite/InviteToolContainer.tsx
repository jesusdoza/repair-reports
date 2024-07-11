import { useEffect } from "react";
import useInviteManager from "../../hooks/useInviteManager";
import InviteLog from "./InviteLog";
import InviteTool from "./InviteTool";

export default function InviteToolContainer() {
  //todo get any invites user has pending
  const { getUserInvites, data: inviteData, postInvite } = useInviteManager();

  const handlePostInvite = async (groupIds: string[], password?: string) => {
    console.log("groupIds", groupIds);
    // await postInvite({ groups: groupIds, password });
  };

  useEffect(() => {
    getUserInvites();
  }, []);

  return (
    <div className="p-1 ">
      <InviteTool onPostInvite={handlePostInvite} />
      <InviteLog invites={inviteData} />
    </div>
  );
}
