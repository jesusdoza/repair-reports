// import { ProcedureT } from "../../hooks/useGetLatest";
import EditProcedureCard from "./EditProcedureForm";

import React, { useContext, useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { RepairFormContext } from "../../context/RepairFormContext";
import { RepairDispatchTypeEnum } from "../../../types";

export default function EditProcedureList(): React.ReactNode {
  //

  const { currentFormState, formDispatch } = useContext(RepairFormContext);
  // const [list, setList] = useState(currentFormState.procedureArr);
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

  const procedures = useMemo(() => {
    return list.map((proc, index) => {
      console.log("rebuild proc list ", list.length);

      return (
        <li key={uuidv4()}>
          <EditProcedureCard
            proc={proc}
            index={index}
          />

          <div className="btn">Add new Procedure here</div>
        </li>
      );
    });
  }, [list]);

  return (
    <div>
      <div
        onClick={() => {
          // console.log("add at front");
          formDispatch({
            type: RepairDispatchTypeEnum.ADD_PROCEDURE,
            payload: { procIndex: 0 },
          });
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
