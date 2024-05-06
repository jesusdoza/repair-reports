import axios, { AxiosError } from "axios";
import { Repair } from "../classes/Repair";
import useAuthContext from "./useAuthContext";
import { signatureT } from "../../types";

const API_URL = import.meta.env.VITE_API_URL;

const useRepairApi = () => {
  const { unauthorizedError } = useAuthContext();

  const getLatestRepairs = async (limit: string | number) => {
    try {
      const response = await axios.get(`${API_URL}/api/repairs`, {
        withCredentials: true,
        params: { num: limit },
      });

      return response.data.repairs;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.status && error?.response?.status == 401) {
          console.log("unauthorized error @useRepairApi.getLatestRepairs");

          unauthorizedError();
        }
      }
    }
  };

  const searchForRepair = async (phrase: string) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/repairs`,
        { searchPhrase: phrase },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.status && error?.response?.status == 401) {
          console.log("unauthorized error @useRepairApi.searchForRepair");

          unauthorizedError();
        }
      }
    }
  };

  const getRepairById = async (repairId: string) => {
    console.log("repairId", repairId);
  };

  //todo what folder to upload images to needs to be in signature
  const getUploadSignature = async (folder: string) => {
    const response = await axios.get(`${API_URL}/api/signform`, {
      withCredentials: true,
      params: {
        folder,
      },
    });
    return response.data as signatureT;
  };

  const updateRepair = async (repair: Repair) => {
    console.log("repair @updateRepair ", repair);

    try {
      const response = await axios.put(
        `${API_URL}/api/repairs`,
        { repairData: repair },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.status && error?.response?.status == 401) {
          console.log("unauthorized error @useRepairApi.searchForRepair");

          unauthorizedError();
        }
      }
      throw new Error(`unspecified PUT error ${API_URL}/api/repairs`);
    }
  };

  const postRepair = async (repair: Repair) => {
    console.log("repair @updateRepair ", repair);

    try {
      const response = await axios.post(
        `${API_URL}/api/repairs`,
        { repairData: repair },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.status && error?.response?.status == 401) {
          console.log("unauthorized error @useRepairApi.searchForRepair");

          unauthorizedError();
        }
      }
      throw new Error(`unspecified PUT error ${API_URL}/api/repairs`);
    }
  };

  return {
    postRepair,
    updateRepair,
    getUploadSignature,
    getLatestRepairs,
    searchForRepair,
    getRepairById,
  };
};

export default useRepairApi;
