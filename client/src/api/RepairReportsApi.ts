import axios from "axios";
import { Repair } from "../classes/Repair";
import { RepairDataT, signatureT } from "../../types";
const API_URL = import.meta.env.VITE_API_URL;

const getLatestRepairs = async (
  limit: string | number,
  userToken: string | null | undefined
) => {
  if (!userToken) {
    throw new Error("no user token provided");
  }
  try {
    const response = await axios.get(`${API_URL}/api/repair`, {
      withCredentials: true,
      params: { num: limit },
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return {
      metaData: new Map<string, string>(),
      results: [] as RepairDataT[],
    };
  }
};

const getUsersRepairs = async ({
  limit,
  page,
  userToken,
}: {
  userToken?: string | null | undefined;
  limit?: number;
  page?: number;
}) => {
  if (!userToken) return;
  try {
    const response = await axios.get(`${API_URL}/api/repair/user`, {
      params: { limit, page },
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return response.data as {
      results: RepairDataT[];
      metaData: Record<string, string>;
    };
  } catch (error) {
    throw new Error(`error getting user repairs`);
  }
};

const searchForRepair = async (phrase: string) => {
  const response = await axios.post(
    `http://localhost:8000/api/repairs`,
    { searchPhrase: phrase },
    {
      withCredentials: true,
    }
  );
  return response.data;
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
  } catch (err) {
    if (err instanceof Error && err?.message) {
      throw new Error(`PUT error ${API_URL}/api/repairs : ${err?.message}`);
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
  } catch (err) {
    if (err instanceof Error && err?.message) {
      throw new Error(`PUT error ${API_URL}/api/repairs : ${err?.message}`);
    }

    throw new Error(`unspecified PUT error ${API_URL}/api/repairs`);
  }
};

export default {
  postRepair,
  updateRepair,
  getUploadSignature,
  getLatestRepairs,
  searchForRepair,
  getRepairById,
  getUsersRepairs,
};
