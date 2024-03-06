import { useReducer } from "react";
import {
  ChangeFormPayloadT,
  ProcedureT,
  RepairFormDispatchType as RepairFormDispatchType,
} from "../../types";
const LOC = "@useRepairFormState ";

export const newProcedure: ProcedureT = {
  images: ["#"],
  imageObjs: [],
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

// export type RepairFormDispatchT = React.Dispatch<{
//   type: DispatchType;
//   payload: ChangeFormPayloadT;
// }>;

// export enum RepairDispatchTypeT {
//   UPDATE_IMAGES,
//   ADD_IMAGE,
//   UPDATE_INTRUC,
//   ADD_PROCEDURE,
//   REMOVE_PROCEDURE,
//   UPDATE_PROCEDURES,
//   UPDATE_FIELD,
// }

// export type imageObjT = {
//   imageUrl: string;
//   imageThumb: string;
//   caption: string;
//   imageId: string;
//   folder: string;
// };

// export type ChangeFormPayloadT = {
//   procIndex?: number;
//   instructions?: string;
//   newImageUrl?: string;
//   newImageIndex?: number;
//   newImageObj?: ImageObjT;
//   allProcedures?: ProcedureT[];

//   formField?: Record<string, string>;
// };

function updateFormDataReducer(
  state: RepairFormT,
  action: { type: RepairFormDispatchType; payload: ChangeFormPayloadT }
) {
  let newState = state;
  switch (action.type) {
    case RepairFormDispatchType.ADD_IMAGE:
      // console.log("addemptyimagecard1");
      // newState = addEmptyImageToProcedure(state, action.payload);
      break;
    case RepairFormDispatchType.UPDATE_FIELD:
      newState = updateField(state, action.payload);
      break;
    case RepairFormDispatchType.ADD_PROCEDURE:
      newState = addProcedure(state, action.payload);
      break;
    case RepairFormDispatchType.UPDATE_PROCEDURES:
      newState = updateProcedures(state, action.payload);
      break;
    case RepairFormDispatchType.UPDATE_IMAGES:
      newState = updateImage(state, action.payload);
      break;
    case RepairFormDispatchType.UPDATE_INTRUC:
      newState = updateInstruction(state, action.payload);
      break;

    default:
      console.log("no action available for ", action.type);

      break;
  }

  return newState;
}

function addProcedure(state: RepairFormT, payload: ChangeFormPayloadT) {
  const newProcedures = [];

  const procIndex =
    typeof payload.procIndex == "number" && payload.procIndex >= 0
      ? payload.procIndex
      : 0;

  for (let i = 0; i < state.procedureArr.length; i++) {
    if (i == procIndex) {
      newProcedures.push(newProcedure);
      newProcedures.push(state.procedureArr[i]);
      continue;
    }

    newProcedures.push(state.procedureArr[i]);
  }

  return { ...state, procedureArr: newProcedures };
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
  // console.log("payload", payload);
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
function updateImage(state: RepairFormT, payload: ChangeFormPayloadT) {
  console.log(`${LOC} form payload`, payload);

  //have new image to update
  if (
    !payload.newImageUrl ||
    typeof payload.newImageIndex != "number" ||
    !(payload?.procIndex && payload.procIndex > 0)
  ) {
    console.log("no index to update image@useUpdateProcedures.updateImage");
    return state;
  }

  const images = state.procedureArr[payload.procIndex]?.images;

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

  //update state
  //update the image in specified index of procedureArr
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
  console.log("add new empty image");

  const newProcedures = state.procedureArr.map((proc, index) => {
    if (index == payload.procIndex) {
      return { ...proc, images: [...proc.images, "#Empty"] };
    } else {
      return proc;
    }
  });
  return { ...state, procedureArr: newProcedures } as RepairFormT;
}
