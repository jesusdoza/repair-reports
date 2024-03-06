import { useReducer } from "react";
import {
  ChangeFormPayloadT,
  ProcedureT,
  RepairFormDispatchType,
} from "../../types";
const LOC = "@useRepairFormState ";

export const newImageObj = {
  imageUrl: "#",
  imageThumb: "#",
  caption: "",
  imageId: "",
  folder: "testFolder",
};

export const newProcedure: ProcedureT = {
  images: ["#"],
  imageObjs: [newImageObj],
  imagesIdArr: [],
  instructions: "",
  procedureNum: 0,
  thumbs: [],
};

export const newRepairObj = {
  boardType: "other",
  engineMake: "other",
  group: "public",
  procedureArr: [newProcedure],
  title: "New Repair",
};

export type RepairFormT = typeof newRepairObj;

export default function useRepairFormState() {
  const [currentFormState, formDispatch] = useReducer(
    updateFormDataReducer,
    newRepairObj
  );

  return { newRepairObj, currentFormState, formDispatch };
}

function updateFormDataReducer(
  state: RepairFormT,
  action: { type: RepairFormDispatchType; payload: ChangeFormPayloadT }
) {
  let newState = state;
  switch (action.type) {
    case "ADD_IMAGE":
      console.log("addemptyimagecard1");
      newState = addEmptyImageToProcedure(state, action.payload);
      break;
    case "UPDATE_FIELD":
      newState = updateField(state, action.payload);
      break;
    case "ADD_PROCEDURE":
      newState = addProcedure(state, action.payload);
      break;
    case "UPDATE_PROCEDURES":
      newState = updateProcedures(state, action.payload);
      break;
    case "UPDATE_IMAGES":
      newState = updateImage(state, action.payload);
      break;
    case "UPDATE_INTRUC":
      newState = updateInstruction(state, action.payload);
      break;

    default:
      console.log("no action available for ", action.type);

      break;
  }

  return newState;
}

function addProcedure(state: RepairFormT, payload: ChangeFormPayloadT) {
  const updatedProcedures = [];
  const oldProcedures = state.procedureArr;

  const procIndex =
    typeof payload.procIndex == "number" && payload.procIndex >= 0
      ? payload.procIndex
      : 0;

  //add to begining
  if (procIndex == 0) {
    return { ...state, procedureArr: [newProcedure, ...oldProcedures] };
  }

  if (procIndex >= oldProcedures.length - 1) {
    return { ...state, procedureArr: [...oldProcedures, newProcedure] };
  }

  for (let i = 0; i < oldProcedures.length; i++) {
    if (i == procIndex) {
      updatedProcedures.push(newProcedure);
      updatedProcedures.push(oldProcedures[i]);
      continue;
    }

    updatedProcedures.push(oldProcedures[i]);
  }

  return { ...state, procedureArr: updatedProcedures };
}

function updateField(state: RepairFormT, payload: ChangeFormPayloadT) {
  return { ...state, ...payload.formField };
}

function updateProcedures(state: RepairFormT, payload: ChangeFormPayloadT) {
  const { allProcedures } = payload;

  return { ...state, procedureArr: allProcedures } as RepairFormT;
}

function updateInstruction(
  state: RepairFormT,
  payload: ChangeFormPayloadT
): RepairFormT {
  // console.log("state", state);
  console.log("payload", payload);
  const newProcedures = state.procedureArr.map((proc: ProcedureT, index) => {
    if (payload.procIndex == index) {
      return { ...proc, instructions: payload.instructions } as ProcedureT;
    }
    return proc;
  });
  // console.log("newState", newState);

  return { ...state, procedureArr: newProcedures };
}

///UPDATE IMAGE action
//!working on here
function updateImage(state: RepairFormT, payload: ChangeFormPayloadT) {
  console.log(`${LOC} form payload`, payload);

  //does image exists, have an index to update at, and index is valid if not then do nothing
  if (!payload.newImageUrl || typeof payload.newImageIndex != "number") {
    console.log("no index to update image@useUpdateProcedures.updateImage");
    return state;
  }

  if (typeof payload.procIndex != "number") {
    console.log("no procedure index to update image at");
    console.log("!payload.procIndex", !payload.procIndex);
    console.log(
      'typeof payload.procIndex != "number"',
      typeof payload.procIndex != "number"
    );
    return state;
  }

  //get images if any from procedure
  const images = state.procedureArr[payload.procIndex]?.images;
  const imageObjs = state.procedureArr[payload.procIndex]?.imageObjs;

  //image might be in array remove from database and insert new
  if (Array.isArray(images) && images.length > payload.newImageIndex) {
    //todo remove image
  }

  const procIndex = payload.procIndex;
  const targetProc = state.procedureArr[procIndex];
  const imageIndexToUpdate = payload.newImageIndex;

  const newImageUrl = payload.newImageUrl;
  // const newImageObj = payload?.newImageObj;

  //update legacy image urls property
  targetProc.images[imageIndexToUpdate] = newImageUrl;

  //update image objs
  targetProc.imageObjs[imageIndexToUpdate] = {
    ...newImageObj,
    imageUrl: newImageUrl,
  };

  //update state
  //update procedure in array procedureArr
  const newProcedures = state.procedureArr.map((proc: ProcedureT, index) => {
    if (procIndex == index) {
      return targetProc;
    }
    return proc;
  });

  return { ...state, procedureArr: newProcedures } as RepairFormT;
}

function addEmptyImageToProcedure(
  state: RepairFormT,
  payload: ChangeFormPayloadT
) {
  // console.log("add new empty image");

  const newProcedures = state.procedureArr.map((proc, index) => {
    if (index == payload.procIndex) {
      return {
        ...proc,
        images: [...proc.images, "#Empty"],
        imageObjs: proc.imageObjs
          ? [...proc.imageObjs, newImageObj]
          : [newImageObj],
      };
    } else {
      return proc;
    }
  });
  return { ...state, procedureArr: newProcedures } as RepairFormT;
}
