import { useEffect, useState } from "react";
import useRequestErrorHandler from "./useRequestErrorHandler";

type UserGroupData = {
  _id: string;
  userId: string;
  username: string;
  role: string[];
  groupId: string;

  groupName: string;
};

export default function useGetUserGroups() {
  const [groups, setGroups] = useState<UserGroupData[]>([]);
  const [error, setError] = useState<string[]>([]);
  const handler = useRequestErrorHandler();

  const getUserGroups = async () => {
    try {
      const foundGroups = await handler(fetchUserGroupData);

      if (foundGroups && foundGroups.length) setGroups(foundGroups);
    } catch (error) {
      console.log("failed to get user group memberships");
      setError(["failed to get groups memberships"]);
    }
  };

  useEffect(() => {
    getUserGroups();
  }, []);

  return { data: groups, getUserGroups, error };
}

async function fetchUserGroupData(): Promise<UserGroupData[]> {
  return [];
}
