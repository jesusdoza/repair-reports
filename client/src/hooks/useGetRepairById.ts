// import { RepairDataT } from "../../types";
import RepairApi from "../api/RepairReportsApi";
import { useQuery } from "@tanstack/react-query";
import useGetUserToken from "./useGetUserToken";
export type metaDataT = {
  totalByUser: number;
  currentPage: number;
  limitResults: number;
};

const useGetRepairById = ({ id }: { id: string | undefined }) => {
  const tokenData = useGetUserToken();
  const userToken = tokenData.data;

  const query = useQuery({
    queryKey: ["repairs", id],
    queryFn: async () => {
      return await RepairApi.getRepairById({ repairId: id, userToken });
    },
    staleTime: 0,
    enabled: !!userToken && !!id,
  });
  return query;
};
export default useGetRepairById;
