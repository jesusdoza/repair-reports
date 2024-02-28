import { ProcedureT } from "../../hooks/useGetLatest";
import EditProcedureForm from "./EditProcedureForm";
import useProcedureListState from "../../hooks/useUpdateProceduresState";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function EditProcedureList({
  list,
  updateFn,
}: {
  list: ProcedureT[];
  updateFn: (newProcedures: ProcedureT[]) => void;
}): React.ReactNode {
  //
  //state holding all procedures on an array central state
  const { currentListState, dispatch } = useProcedureListState(list);
  // const currentListState = list;

  useEffect(() => {
    console.log("currentListState", currentListState);
    updateFn(currentListState);
  }, [currentListState]);

  const procedures = currentListState.map((proc, index) => {
    return (
      <li key={uuidv4()}>
        <EditProcedureForm
          reducer={dispatch}
          proc={proc}
          index={index}
        />
      </li>
    );
  });

  return (
    <div>
      <ul className="">{procedures}</ul>
    </div>
  );
}
