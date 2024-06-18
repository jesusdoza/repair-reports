import { useEffect, useState } from "react";

import { RepairDataT } from "../../types";
import useRepairApi from "./useRepairApi";

const useGetUserRepairs = (limit?: number) => {
  const [repairsData, setRepairsData] = useState<RepairDataT[] | []>([]);

  const { getUsersRepairs } = useRepairApi();
  useEffect(() => {
    const getData = async () => {
      const response = await getUsersRepairs(limit);
      setRepairsData(response);
    };

    getData();
  }, []);

  return repairsData;
};

export default useGetUserRepairs;
