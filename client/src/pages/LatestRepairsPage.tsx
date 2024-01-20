import { useEffect, useState } from "react";
import useGetLatest from "../hooks/useGetLatest";

export default function LatestRepairs() {
  //todo get latest repairs

  const repairs = useGetLatest();

  return (
    <div className="center-block">
      <h1>latest repairs</h1>
    </div>
  );
}
