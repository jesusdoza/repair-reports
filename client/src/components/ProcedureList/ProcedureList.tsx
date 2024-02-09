import React from "react";
import { ProcedureT } from "../../hooks/useGetLatest";

export default function ProcedureList({ list }: { list: ProcedureT[] }) {
  const cards = list.map((proc) => {
    return ProcedureCard(proc);
  });
  return (
    <div>
      ProcedureList
      <ul>{cards}</ul>
    </div>
  );
}

function ProcedureCard(proc: ProcedureT) {
  return (
    <li>
      <p>{proc.instructions}</p>
    </li>
  );
}
