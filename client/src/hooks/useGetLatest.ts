import { RepairDataT } from "../../types";
import { useQuery } from "@tanstack/react-query";
import RepairReportsApi from "@/api/RepairReportsApi";

import { useAuth } from "@clerk/clerk-react";

const useGetLatestRepairs = ({
  requestLimit,
}: {
  requestLimit?: string | number;
}) => {
  const { getToken } = useAuth();
  const limit = requestLimit ? Number(requestLimit) : 1;

  const tokenData = useQuery({
    queryKey: ["userToken"],
    queryFn: async () => {
      return await getToken();
    },
  });

  const userToken = tokenData.data;

  const { data, isError, isLoading } = useQuery<{
    metaData: Map<string, string>;
    results: RepairDataT[];
  }>({
    queryKey: ["latestRepairs", limit],
    queryFn: () => RepairReportsApi.getLatestRepairs(limit, userToken),
    staleTime: 0,
    enabled: !!userToken,
    initialData: { metaData: new Map(), results: [] },
  });
  return { data, isError, isLoading };
};
export default useGetLatestRepairs;
