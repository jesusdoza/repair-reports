import axios from "axios";
import { repairDataT } from "../hooks/useGetLatest";
const API_URL = import.meta.env.VITE_API_URL;

type signatureT = {
  apikey: string;
  cloudname: string;
  signature: string;
  timestamp: number;
};

const getLatestRepairs = async (limit: string | number) => {
  // const response = await axios.get(`http://localhost:8000/api/repairs`, {
  const response = await axios.get(`${API_URL}/api/repairs`, {
    withCredentials: true,
    params: { num: limit },
  });

  return response.data.repairs;
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

const getUploadSignature = async () => {
  const response = await axios.get(`${API_URL}/api/signform`, {
    withCredentials: true,
  });
  return response.data as signatureT;
};

const updateRepair = async (repair: repairDataT) => {
  const response = await axios.put(
    `${API_URL}/api/repairs`,
    { repair },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export default {
  updateRepair,
  getUploadSignature,
  getLatestRepairs,
  searchForRepair,
  getRepairById,
};
