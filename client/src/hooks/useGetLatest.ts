import { useEffect, useState } from "react";
import repairApi from "../api/RepairReportsApi";

const useGetLatest = async () => {
  const [repairsData, setRepairsData] = useState([]);

  useEffect(() => {
    console.log("get data");
    const getData = async () => {
      const response = await repairApi.getLatestRepairs();
      console.log("response", response);
    };

    getData();
  }, []);
};

export default useGetLatest;
