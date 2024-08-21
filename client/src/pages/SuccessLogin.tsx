import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function SuccessLogin() {
  const [params] = useSearchParams("code");

  console.log("params", params.get("code"));

  return <div>SuccessLogin</div>;
}
