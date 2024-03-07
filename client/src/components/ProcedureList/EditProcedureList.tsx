// import { ProcedureT } from "../../hooks/useGetLatest";
import EditProcedureCard from "./EditProcedureForm";

import React, { useContext, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RepairFormContext } from "../../context/RepairFormContext";
// import { RepairFormDispatchType } from "../../../types";

export default function EditProcedureList(): React.ReactNode {
  //

  const { currentFormState, formDispatch } = useContext(RepairFormContext);

  // const [list, setList] = useState(currentFormState.procedureArr);
  const list = currentFormState.procedureArr;

  const addNewProcedure = (index: number) => {
    formDispatch({
      type: "ADD_PROCEDURE",
      payload: { procIndex: index },
    });
  };

  const procedures = list.map((proc, index) => {
    return (
      <li key={uuidv4()}>
        <EditProcedureCard
          proc={proc}
          index={index}
        />

        <div
          onClick={() => {
            addNewProcedure(index + 1);
          }}
          className="btn">
          Add new Procedure here
        </div>
      </li>
    );
  });

  return (
    <div>
      <div
        onClick={() => {
          addNewProcedure(0);
        }}
        className="btn">
        Add new Procedure at begining
      </div>
      <ul className="">{procedures}</ul>
    </div>
  );
}

// function addProcedureAtIndex({
//   index,
//   list,
//   newItem,
// }: {
//   index: number;
//   list: ProcedureT[];
//   newItem: ProcedureT;
// }) {
//   const newList = [];

//   for (let i = 0; i < list.length; i++) {
//     const item = list[i];
//     // console.log(" newItem", newItem);

//     if (index - 1 == i) {
//       newList.push(newItem);
//     }

//     newList.push(item);
//   }

//   console.log("newList", newList);

//   return newList;
// }
