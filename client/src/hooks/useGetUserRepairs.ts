// import { RepairDataT } from "../../types";
import RepairApi from "../api/RepairReportsApi";
import { useQuery } from "@tanstack/react-query";
import useGetUserToken from "./useGetUserToken";
export type metaDataT = {
  totalByUser: number;
  currentPage: number;
  limitResults: number;
};

const useGetUserRepairs = ({
  limit = 10,
  page = 0,
}: {
  limit?: number;
  page?: number;
}) => {
  const tokenData = useGetUserToken();
  const userToken = tokenData.data;

  const query = useQuery({
    queryKey: ["userRepairs", limit, page],
    queryFn: async () => {
      return await RepairApi.getUsersRepairs({ limit, page, userToken });
    },
    staleTime: 0,
    enabled: !!userToken,
  });
  return query;
};
export default useGetUserRepairs;
