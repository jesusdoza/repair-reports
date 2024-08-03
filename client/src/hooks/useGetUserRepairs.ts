import { useState } from "react";

import { RepairDataT } from "../../types";
import useRepairApi from "./useRepairApi";
type metaDataT = {
  totalByUser: number;
  currentPage: number;
  limitResults: number;
};

const useGetUserRepairs = () => {
  const [repairsData, setRepairsData] = useState<RepairDataT[] | []>([]);
  const [metaData, setMetaData] = useState<metaDataT>({
    totalByUser: 0,
    currentPage: 0,
    limitResults: 0,
  });

  const { getUsersRepairs } = useRepairApi();

  const getData = async (limit?: number, page?: number) => {
    const response = await getUsersRepairs(limit, page);

    const { results, ...otherData } = response as {
      results: RepairDataT[];
      totalByUser: number;
      currentPage: number;
      limitResults: number;
    };

    setMetaData(otherData);
    setRepairsData(results);
  };

  return { repairsData, getData, metaData };
};

export default useGetUserRepairs;
