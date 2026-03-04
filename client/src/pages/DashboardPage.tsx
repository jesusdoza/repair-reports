import React from "react";
import DashboardPageContainer from "./dashboard/DashboardPageContainer";
import { useSearchParams } from "react-router-dom";
export default function DashboardPage(): React.ReactNode {
  const [params] = useSearchParams();
  const page = Number(params.get("page")) || 0;
  const limit = Number(params.get("limit")) || 10;
  const skips = Number(params.get("skips")) || 0;

  return (
    <DashboardPageContainer
      page={page}
      limit={limit}
      skips={skips}
    />
  );
}
