import { useSearchParams } from "react-router-dom";
import RepairList from "../../components/RepairList/RepairList";
import useRepairApi from "../../hooks/useRepairApi";
import { useEffect, useState } from "react";
import { RepairDataT } from "../../../types";

export default function SearchPage() {
  const { searchForRepair } = useRepairApi();
  const [searchParams] = useSearchParams();
  const [repairsFound, setRepairsFound] = useState<RepairDataT[]>([]);
  const [loading, setLoading] = useState(false);

  //todo add limit and page number to request
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search");

  async function getSearchResults(
    search: string,
    limit: number = 10,
    page: number = 1,
  ) {
    setLoading(true);
    const results = await searchForRepair(search, limit, page);

    setLoading(false);
    if (results) {
      setRepairsFound(results);
    }
  }

  useEffect(() => {
    if (search) {
      getSearchResults(search, limit, page);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Loading...</p>
        <span className="loading loading-bars loading-xl size-40"></span>
      </div>
    );
  }

  if (!search) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>No search phrase provided</p>
      </div>
    );
  }

  return (
    <div>
      <p>Search Results for: {search}</p>
      <RepairList repairList={repairsFound} />
    </div>
  );
}
