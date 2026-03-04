// import { repairDataT } from "../hooks/useGetLatest";
import React from "react";

import { useParams } from "react-router-dom";

import RepairInfo from "../components/RepairDisplay/RepairInfo";
import useGetRepairById from "@/hooks/useGetRepairById";

export const RepairInfoPage = (): React.ReactNode => {
  const { id } = useParams();

  // const { getRepairById } = useRepairApi();
  const { data: repairData, isLoading } = useGetRepairById({ id });

  if (isLoading) {
    return <div>Loading repair data...</div>;
  }

  //get userId to verify if user created repair
  // const { userInfo } = useAuthContext();
  // const userId = userInfo?._id;

  if (!repairData) {
    return <div>No repair data for this record</div>;
  }

  return (
    <RepairInfo
      userId={"userId"} //todo get userId from auth context
      repair={repairData}
    />
  );
};
