import RepairList from "../components/RepairList/RepairList";
import React from "react";
import useGetLatestRepairs from "../hooks/useGetLatest";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

export default function LatestRepairsPage(): React.ReactNode {
  const { data, isError, isLoading } = useGetLatestRepairs({
    requestLimit: 8,
  });

  if (isError) {
    return <div>Error loading latest repairs</div>;
  }
  if (isLoading) {
    return <div>Loading latest repairs...</div>;
  }

  if (!data || data?.results?.length === 0) {
    return <div>No latest repairs to display</div>;
  }

  console.log("data", data);
  return (
    <ErrorBoundary componentName={RepairList.name}>
      <RepairList repairList={data.results} />
    </ErrorBoundary>
  );
}
