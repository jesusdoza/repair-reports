import { useEffect, useState } from "react";
import useInviteManager from "../../hooks/useInviteManager";
import InviteLog from "./InviteLog";
import InviteTool from "./InviteTool";

type InviteT = {
  inviteCode: string;
  invitePassword: string;
  groups: { id: string; name: string }[];
  createdAt: string;
  status: string;
};

export default function InviteToolContainer() {
  //todo get any invites user has pending
  const { getUserInvites, data: inviteData } = useInviteManager();
  // const [invites, setInvites] = useState<InviteT[]>([]);

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
