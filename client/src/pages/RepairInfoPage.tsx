// import { repairDataT } from "../hooks/useGetLatest";
import React, { useEffect, useState } from "react";

import { useLocation, useParams } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { RepairDataT } from "../../types";

import RepairInfo from "../components/RepairDisplay/RepairInfo";
import useRepairApi from "../hooks/useRepairApi";

export const RepairInfoPage = (): React.ReactNode => {
  const { repair_id } = useParams();
  const { state }: { state: { repair: RepairDataT | undefined } } =
    useLocation();
  const { getRepairById } = useRepairApi();

  const [repairData, setRepairData] = useState(state?.repair);

  async function getRepairData(id: string) {
    try {
      const data = await getRepairById(id);
      console.log(`response data for repair id: ${id}`, data);
      setRepairData(data);
    } catch (error) {
      setRepairData(undefined);
    }
  }

  useEffect(() => {
    if (!repairData && repair_id) {
      getRepairData(repair_id);
    }
  }, []);

  //get userId to verify if user created repair
  const { userInfo } = useAuthContext();
  const userId = userInfo?._id;

  if (!repairData) {
    return <div>No repair data for this record</div>;
  }

  return (
    <RepairInfo
      userId={userId}
      repair={repairData}
    />
  );
};
