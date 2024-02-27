import { useReducer } from "react";
import { ProcedureT, imageObjT } from "./useGetLatest";

const LOC = "@useRepairFormState ";

const proc:ProcedureT={
    images: [],
    imageObjs?:  [],
    imagesIdArr: [],
    instructions: '',
    procedureNum: 0,
    thumbs:[]
}

const newRepairState = {
  boardType: "other",
  engineMake: "other",
  group: "public",
  procedureArr: [proc],
  title: "New Repair",
};

export type NewRepairT = typeof newRepairState;

export default function useRepairFormState() {
  const [currentListState, dispatch] = useReducer(
    updateFormData,
    newRepairState
  );

  return { currentListState, dispatch };
}

export type updateProcDispT = React.Dispatch<{
  type: DispatchType;
  payload: ChangeFormPayloadT;
}>;

export enum DispatchType {
  UPDATE_IMAGES,
  ADD_IMAGE,
  UPDATE_INTRUC,
  ADD_PROCEDURE,
}

// export type imageObjT = {
//   imageUrl: string;
//   imageThumb: string;
//   caption: string;
//   imageId: string;
//   folder: string;
// };

export type ChangeFormPayloadT = {
  procIndex: number;
  instructions?: string;
  newImageUrl?: string;
  newImageIndex?: number;
  newImageObj?: imageObjT;
};

function updateFormData(
  state: NewRepairT,
  action: { type: DispatchType; payload: ChangeFormPayloadT }
) {
  let newState = state;
  switch (action.type) {
    case DispatchType.ADD_IMAGE:
      break;
    case DispatchType.ADD_PROCEDURE:
      break;
    case DispatchType.UPDATE_IMAGES:
      newState = updateImage(state, action.payload);
      break;
    case DispatchType.UPDATE_INTRUC:
      newState = updateInstruction(state, action.payload);
      break;

    default:
      break;
  }

  return newState;
}

function updateInstruction(
  state: NewRepairT,
  payload: ChangeFormPayloadT
):NewRepairT {
  // console.log("state", state);
  // console.log("payload", payload);
  const newProcedures = state.procedureArr.map((proc: ProcedureT, index) => {
    if (payload.procIndex == index) {
      return { ...proc, instructions: payload.instructions } as ProcedureT;
    }
    return proc;
  });
  // console.log("newState", newState);

  return {...state, procedureArr:newProcedures};
}

function updateImage(state: NewRepairT, payload: ChangeFormPayloadT) {
  console.log(`${LOC} form payload`, payload);

  //have new image to update
  if (!payload.newImageUrl || typeof payload.newImageIndex != "number") {
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
//   const newState = state.map((proc: ProcedureT, index) => {
    if (procIndex == index) {
      return targetProc;
    }
    return proc;
  });
//   console.log("new state", newState);

  return state;
}
