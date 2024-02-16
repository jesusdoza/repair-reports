import { useReducer } from "react";
import { ProcedureT } from "./useGetLatest";

export default function useUpdateProcedures(procedureList: ProcedureT[]) {
  const [currentList, dispatch] = useReducer(changeProcedures, procedureList);

  return { currentList, dispatch };
}

export type updateProcDispT = React.Dispatch<{
  type: DispatchType;
  payload: {
    index: number;
  };
}>;

export enum DispatchType {
  UPDATE_IMAGE,
  ADD_IMAGE,
  UPDATE_INTRUC,
  ADD_PROCEDURE,
}

function changeProcedures(
  state: ProcedureT[],
  action: { type: DispatchType; payload: { index: number } }
) {
  switch (action.type) {
    case DispatchType.ADD_IMAGE:
      break;
    case DispatchType.ADD_PROCEDURE:
      break;
    case DispatchType.UPDATE_IMAGE:
      break;
    case DispatchType.UPDATE_INTRUC:
      updateInstruction(state, action.payload);
      break;

    default:
      break;
  }

  console.log("state", state);
  console.log("action", action);

  return state;
}

function updateInstruction(
  state: ProcedureT[],
  payload: { intructions?: string; index?: number }
): ProcedureT[] {
  const newState = state.map((proc: ProcedureT, index) => {
    if (payload.index == index) {
      return { ...proc, instructions: payload.intructions } as ProcedureT;
    }
    return proc;
  });

  return newState;
}
