import { useReducer } from "react";
import { ProcedureT, imageObjT } from "./useGetLatest";

export default function useUpdateProcedures(procedureList: ProcedureT[]) {
  const [currentListState, dispatch] = useReducer(
    changeProcedures,
    procedureList
  );

  return { currentListState, dispatch };
}

export type updateProcDispT = React.Dispatch<{
  type: DispatchType;
  payload: ChangeProcPayloadT;
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

export type ChangeProcPayloadT = {
  procIndex: number;
  instructions?: string;
  imagesUrls?: string[];
  imageObjs?: imageObjT[];
};

function changeProcedures(
  state: ProcedureT[],
  action: { type: DispatchType; payload: ChangeProcPayloadT }
) {
  let newState = state;
  switch (action.type) {
    case DispatchType.ADD_IMAGE:
      break;
    case DispatchType.ADD_PROCEDURE:
      break;
    case DispatchType.UPDATE_IMAGES:
      newState = updateImages(state, action.payload);
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
  state: ProcedureT[],
  payload: ChangeProcPayloadT
): ProcedureT[] {
  // console.log("state", state);
  // console.log("payload", payload);
  const newState = state.map((proc: ProcedureT, index) => {
    if (payload.procIndex == index) {
      return { ...proc, instructions: payload.instructions } as ProcedureT;
    }
    return proc;
  });
  // console.log("newState", newState);

  return newState;
}

function updateImages(state: ProcedureT[], payload: ChangeProcPayloadT) {
  console.log("payload", payload);

  //update state
  const newState = state.map((proc: ProcedureT, index) => {
    if (payload.procIndex == index) {
      return {
        ...proc,
        images: payload.imagesUrls,
        imageObjs: payload?.imageObjs && [],
      } as ProcedureT;
    }
    return proc;
  });
  // console.log("DispatchType.UPDATE_IMAGES", action);
  // console.log("state", state);
  // const newstate = { ...state, images: action.imagesUrls };
  console.log("new state", newState);

  return state;
  // return { ...state, images: action.imagesUrls };
}
