import { useEffect } from "react";
import useInviteManager from "../../hooks/useInviteManager";
import InviteLog from "./InviteLog";
import InviteTool from "./InviteTool";
import useGetUserGroups, { UserGroupDataT } from "../../hooks/useGetUserGroups";
import isInviteAllowed from "../../hooks/utils/isInviteAllowed";

export default function InviteToolContainer({
  userGroupMemberships = [],
}: {
  userGroupMemberships: UserGroupDataT[];
}) {
  //todo get any invites user has pending
  const { getUserInvites, data: inviteData, postInvite } = useInviteManager();
  const { fetchData: getUserGroupData } = useGetUserGroups();

  const inviteAllowedGroups = userGroupMemberships.filter((groupData) => {
    return isInviteAllowed(groupData);
  });

  const availableInviteGroups = inviteAllowedGroups.map((groupData) => {
    return { id: groupData.groupId, name: groupData.groupName };
  });

  const handlePostInvite = async (groupIds: string[], password?: string) => {
    const response = await postInvite({ groups: groupIds, password });
    console.log("response", response);
    getUserInvites();
  };

  useEffect(() => {
    getUserInvites();
  }, []);

  //TODO remove this and implement group data into invite tool
  useEffect(() => {
    console.log("data from groups", userGroupMemberships);
  }, [userGroupMemberships]);

  return (
    <div className="p-1">
      <div
        className="btn bg-green-500"
        onClick={() => getUserGroupData()}>
        refresh
      </div>
      <div className="">
        <InviteTool
          onPostInvite={handlePostInvite}
          availableGroups={availableInviteGroups}
        />
        <InviteLog invites={inviteData} />
      </div>
    </div>
  );
}
