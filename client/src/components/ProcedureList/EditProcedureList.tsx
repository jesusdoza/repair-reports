import EditProcedureCard from "./EditProcedureCard";
import useProcedureListState, {
  DispatchType,
} from "../../hooks/useProceduresListState";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ProcedureT } from "../../../types";

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

  useEffect(() => {
    console.log("currentListState", currentListState);
    updateFn(currentListState);
  }, [currentListState]);

  const procedures = list.map((proc, index) => {
    return (
      <li key={uuidv4()}>
        <EditProcedureCard
          proc={proc}
          index={index}
        />
        <section className="p-3 flex flex-col justify-center items-center">
          <div
            onClick={() => {
              dispatch({
                type: DispatchType.ADD_NEW_PROCEDURE,
                payload: { procIndex: index + 1 },
              });
            }}>
            <div className="btn">+ Add Procedure Here</div>
          </div>
        </section>
      </li>
    );
  });

  return (
    <div>
      <ul className="">{procedures}</ul>
    </div>
  );
}
