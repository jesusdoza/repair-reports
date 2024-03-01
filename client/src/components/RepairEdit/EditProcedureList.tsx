import { ProcedureT } from "../../hooks/useGetLatest";
import EditProcedureForm from "./EditProcedureForm";

import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ChangeFormPayloadT,
  DispatchType,
} from "../../hooks/useRepairFormState";

export default function EditProcedureList({
  list,
  formDispatch: formDispatch,
}: {
  list: ProcedureT[];
  formDispatch: React.Dispatch<{
    type: DispatchType;
    payload: ChangeFormPayloadT;
  }>;
}): React.ReactNode {
  //

  console.log("list", list);

  //state holding all procedures on an array central state
  // const { currentListState, dispatch: updateProcedureList } =
  //   useProcedureListState(list);

  // const updateProcedureList = useDebouncedCallback(
  //   (update: { type: DispatchType; payload: ChangeProcPayloadT }) => {
  //     dispatch(update);
  //   },
  //   1000
  // );

  // useEffect(() => {
  //   console.log("currentListState", currentListState);
  //   updateFn(currentListState);
  // }, [currentListState]);

  const procedures = list.map((proc, index) => {
    return (
      <li key={uuidv4()}>
        <EditProcedureForm
          formDispatch={formDispatch}
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
