import axios, { AxiosError } from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import useAuthContext from "./useAuthContext";
import { useState } from "react";

type InviteDataT = {
  inviteCode: string;
  invitePassword: string;
  groups: { id: string; name: string }[];
  createdAt: string;
  status: string;
};

export default function useInviteManager() {
  const { unauthorizedError } = useAuthContext();
  const [data, setData] = useState<InviteDataT[]>([]);

  async function getUserInvites() {
    try {
      const response = await axios.get(`${API_URL}/api/invite`, {
        withCredentials: true,
      });

      setData(response.data.invites);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.status && error?.response?.status == 401) {
          console.log("unauthorized error @useRepairApi.getLatestRepairs");

          unauthorizedError();
        }
      }
    }
  }
  function postInvite() {}

  return { getUserInvites, postInvite, data };
}
