import axios, { AxiosError } from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import useAuthContext from "./useAuthContext";

export default function useInviteManager() {
  const { unauthorizedError } = useAuthContext();

  async function getUserInvites() {
    try {
      const response = await axios.get(`${API_URL}/api/invite`, {
        withCredentials: true,
      });

      return response.data;
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

  return { getUserInvites, postInvite };
}
