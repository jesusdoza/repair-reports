import { useEffect } from "react";
import useInviteManager from "../../hooks/useInviteManager";
import InviteLog from "./InviteLog";
import InviteTool from "./InviteTool";

export default function InviteToolContainer() {
  //todo get any invites user has pending
  const { getUserInvites, data: inviteData } = useInviteManager();

  useEffect(() => {
    getUserInvites();
  }, []);

  return (
    <div className="p-1 ">
      <InviteTool />
      <InviteLog invites={inviteData} />
    </div>
  );
}
