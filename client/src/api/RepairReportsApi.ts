import axios from "axios";
const API_URL = import.meta.VITE_API_URL;
const getLatestRepairs = async () => {
  const response = await axios.get(`http://localhost:8000/api/repairs`, {
    withCredentials: true,
  });

  return response.data.repairs;
};
const searchForRepair = async (text: string) => {};
const getRepairInfo = async (repairId: string) => {};

export default { getLatestRepairs, searchForRepair, getRepairInfo };
