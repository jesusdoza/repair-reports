import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserToken() {
  const { getToken } = useAuth();

  const tokenData = useQuery({
    queryKey: ["userToken"],
    queryFn: async () => {
      return await getToken();
    },
  });

  return tokenData;
}
