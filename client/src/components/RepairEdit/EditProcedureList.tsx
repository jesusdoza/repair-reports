// import { ProcedureT } from "../../hooks/useGetLatest";
import EditProcedureCard from "./EditProcedureForm";

import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { RepairFormContext } from "../../context/RepairFormContext";

export default function EditProcedureList(): React.ReactNode {
  //

  const { currentFormState } = useContext(RepairFormContext);
  const list = currentFormState.procedureArr;
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
        <EditProcedureCard
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
