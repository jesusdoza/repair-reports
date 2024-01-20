import { useState } from "react";
import repairApi from "../api/RepairReportsApi";

const useGetLatest = async () => {
  const [repairsData, setRepairsData] = useState([]);
  const response = await repairApi.getLatestRepairs();

  setRepairsData(response);

  return repairsData;
};

export default useGetLatest;
