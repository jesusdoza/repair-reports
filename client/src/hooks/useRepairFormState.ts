import { useReducer } from "react";
import {
  ChangeFormPayloadT,
  ProcedureT,
  RepairFormDispatchType,
  ImageObjT,
} from "../../types";
const LOC = "@useRepairFormState ";

class ImageObj implements ImageObjT {
  public imageUrl = "";
  public imageThumb = "";
  public caption = "";
  public imageId = "";
  public folder = "testFolder";
  constructor() {}
}

export class Procedure implements ProcedureT {
  public images = [""];
  public imageObjs: ImageObjT[] = [new ImageObj()];
  public imagesIdArr = [];
  public instructions = "";
  public procedureNum = 0;
  public thumbs = [];

  constructor() {}
}

export class Repair {
  public boardType = "other";
  public engineMake = "other";
  public group = "public";
  public procedureArr: ProcedureT[] = [new Procedure()];
  public title = "New Repair";

  constructor() {}
}

// export const newProcedure = new Procedure();

export const newRepairForm = new Repair();

export type RepairFormT = typeof newRepairForm;

export default function useRepairFormState() {
  const [currentFormState, formDispatch] = useReducer(
    updateFormDataReducer,
    new Repair()
  );

  return { currentFormState, formDispatch };
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
      return state;
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
    return {
      ...state,
      procedureArr: [new Procedure(), ...oldProcedures],
    };
  }

  if (procIndex >= oldProcedures.length - 1) {
    return { ...state, procedureArr: [...oldProcedures, new Procedure()] };
  }

  for (let i = 0; i < oldProcedures.length; i++) {
    if (i == procIndex) {
      updatedProcedures.push(new Procedure());
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
  console.log("payload update instruction", payload);

  const data = state;
  const index = payload.procIndex ? payload.procIndex : 0;
  data.procedureArr[index].instructions = payload?.instructions
    ? payload.instructions
    : "";
  // const newProcedures = state.procedureArr.map((proc: ProcedureT, index) => {
  //   if (payload.procIndex == index) {
  //     return { ...proc, instructions: payload.instructions } as ProcedureT;
  //   }
  //   return proc;
  // });

  // return { ...state, procedureArr: newProcedures };
  console.log("data", data);
  return data;
}

///UPDATE IMAGE action
//!working on here cant the newImage url is undefined** works but check again
function updateImage(state: RepairFormT, payload: ChangeFormPayloadT) {
  console.log(`${LOC} form payload`, payload);
  const { procIndex, newImageUrl, newImageIndex, newImageObj } = payload;

  //does image exists, have an index to update at, and index is valid if not then do nothing
  if (!newImageUrl || typeof newImageIndex != "number") {
    console.log(
      "no index to update or url to update with image@useUpdateProcedures.updateImage"
    );

    return state;
  }

  if (typeof procIndex != "number") {
    console.log("no procedure index to update image at");
    console.log("!payload.procIndex", !payload.procIndex);
    console.log(
      'typeof payload.procIndex != "number"',
      typeof procIndex != "number"
    );
    return state;
  }

  //get images if any from procedure
  const images = state.procedureArr[procIndex]?.images;
  const imageObjs = state.procedureArr[procIndex]?.imageObjs;

  //image might be in array remove from database and insert new
  if (Array.isArray(images) && images.length > newImageIndex) {
    //todo remove image
  }

  // const procIndex = payload.procIndex;
  const targetProc = state.procedureArr[procIndex];
  const imageIndexToUpdate = newImageIndex;

  //update legacy image urls property
  targetProc.images[imageIndexToUpdate] = newImageUrl;

  //update image objs with what was in payload
  targetProc.imageObjs[imageIndexToUpdate] = {
    ...imageObjs[imageIndexToUpdate],
    ...newImageObj,
  };

  //update state
  //update procedure in array procedureArr
  const newProcedures = state.procedureArr.map((proc: ProcedureT, index) => {
    if (procIndex == index) {
      console.log("targetProc updated with image url", targetProc);
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
  const { procIndex } = payload;

  const newProcedures = state.procedureArr.map((proc, index) => {
    if (index == procIndex) {
      //case images must be updated on image array and imageObj array
      //imageObjs[] will be initialized if one undefined
      return {
        ...proc,
        images: [...proc.images, "#Empty"],
        imageObjs: [...proc.imageObjs, new ImageObj()],
      };
    } else {
      return proc;
    }
  });
  return { ...state, procedureArr: newProcedures } as RepairFormT;
}
