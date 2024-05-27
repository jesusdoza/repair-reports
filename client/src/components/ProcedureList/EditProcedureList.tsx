import EditProcedureCard from "./EditProcedureCard";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ProcedureT } from "../../../types";
// import { Procedure } from "../../classes/Procedure";
// import { ImageObj } from "../../classes/ImageObj";
import { Procedure } from "../../classes/Procedure";

import { addItem } from "../../hooks/utils/addItem";

type ProcedureListItemT = {
  _id: string;
  component: React.ReactNode;
};

export default function EditProcedureList({
  procedureList,
}: {
  procedureList: ProcedureT[];
}): React.ReactNode {
  //starting out procedures state
  const [ProcedureList, setProcedureList] = useState<
    {
      _id: string;
      component: React.ReactNode;
    }[]
  >(initializeProcedures(procedureList));

  // const addNewProcedure = (index: number) => {
  //   formDispatch({
  //     type: "ADD_PROCEDURE",
  //     payload: { procIndex: index },
  //   });
  // };

  // const procedures = procedureList.map((procedureData, procedureIndex) => {
  //   //object with update methods for editProcedureCard component
  //   const procedureActions = generateProcedureMethods({
  //     formDispatch,
  //     procedureIndex,
  //     procedureId: procedureData._id,
  //   });

  //   return (
  //     <li
  //       key={uuidv4()}
  //       className="">
  //       <EditProcedureCard
  //         key={procedureData._id}
  //         procedureActions={procedureActions}
  //         procedureData={procedureData}
  //         index={procedureIndex}
  //       />

  //       <div
  //         onClick={() => {
  //           addNewProcedure(procedureIndex + 1);
  //         }}
  //         className="btn">
  //         Add new Procedure here
  //       </div>
  //     </li>
  //   );
  // });

  return (
    <div>
      <div
        onClick={() => {
          const _id = uuidv4();
          addAtBegining({
            setter: setProcedureList,
            itemToAdd: {
              _id,
              component: (
                <EditProcedureCard
                  key={_id}
                  procedureData={new Procedure()}
                />
              ),
            },
          });
        }}
        className="btn">
        Add new Procedure at begining
      </div>
      <ul className="w-full flex flex-col gap-2 overflow-hidden">
        {ProcedureList.map((proc) => proc.component)}
      </ul>
    </div>
  );
}

//create methods for specific procedure based on there index position
// function generateProcedureMethods({
//   procedureIndex,
//   formDispatch,
//   procedureId,
// }: {
//   procedureIndex: number;
//   formDispatch: RepairFormDispatchT;
//   procedureId: string;
// }) {
//   const instructions = (text: string) => {
//     formDispatch({
//       type: "UPDATE_INTRUC",
//       payload: { procIndex: procedureIndex, instructions: text },
//     });
//   };

//   const addImage = () => {
//     formDispatch({
//       type: "ADD_IMAGE",
//       payload: { procIndex: procedureIndex },
//     });
//   };

//   const editImage = (imageIndex: number, updatedImageObj: ImageObj) => {
//     formDispatch({
//       type: "UPDATE_IMAGES",
//       payload: {
//         procIndex: procedureIndex,
//         imageIndex: imageIndex,
//         newImageObj: updatedImageObj,
//       },
//     });
//   };

//   const removeImage = (imageId: string) => {
//     formDispatch({
//       type: "REMOVE_IMAGE",
//       payload: { imageId, procIndex: procedureIndex },
//     });
//   };
//   const removeProcedure = () => {
//     //remove current procedure
//     formDispatch({
//       type: "REMOVE_PROCEDURE",
//       payload: { procedureId },
//     });
//   };
//   return {
//     instructions,
//     addImage,
//     editImage,
//     removeImage,
//     removeProcedure,
//   };
// }

function initializeProcedures(procs: ProcedureT[]): {
  _id: string;
  component: React.ReactNode;
}[] {
  const procedureComponents = procs.map((procedureData) => {
    const _id = procedureData?._id ? procedureData?._id : uuidv4();
    return {
      _id,
      component: (
        <li
          key={_id}
          className="">
          <EditProcedureCard
            key={procedureData._id}
            procedureData={procedureData}
            id={procedureData?._id ? procedureData?._id : uuidv4()}
          />

          <div
            onClick={() => {}}
            className="btn">
            Add new Procedure here
          </div>
        </li>
      ) as React.ReactNode,
    };
  });

  return procedureComponents;
}

function addAtBegining({
  setter,
  itemToAdd,
}: {
  setter: React.Dispatch<React.SetStateAction<ProcedureListItemT[]>>;
  itemToAdd: ProcedureListItemT;
}) {
  setter((state) => {
    const newState = addItem({
      pos: "begining",
      arr: state,
      item: itemToAdd,
    });

    return newState;
  });
}
