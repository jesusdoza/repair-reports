import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { RepairDataT } from "../../types";
import useRepairApi from "./useRepairApi";
import useAuthContext from "./useAuthContext";

const useGetLatest = (limit: number) => {
  const [repairsData, setRepairsData] = useState<RepairDataT[] | []>([]);
  const { getLatestRepairs } = useRepairApi();
  const { unauthorizedError } = useAuthContext();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getLatestRepairs(limit);
        setRepairsData(response);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error?.response?.status && error?.response?.status == 401) {
            console.log("error.status", error?.response?.status);
            unauthorizedError();
            return;
          }

          console.log("unspecified axios error", error);
        }
      }
    };

    getData();
  }, []);

  return repairsData;
};

export default useGetLatest;
