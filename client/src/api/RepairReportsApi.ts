import axios from "axios";
const API_URL = import.meta.VITE_API_URL;
const getLatestRepairs = async () => {
  axios.get(`${API_URL}`);
};
const searchForRepair = async (text: string) => {};
const getRepairInfo = async (repairId: string) => {};

export default { getLatestRepairs, searchForRepair, getRepairInfo };
