import React, { createContext } from "react";
import useRepairFormState, {
  RepairFormT,
  newRepairObj,
  newProcedure,
} from "../hooks/useRepairFormState";
import { ProcedureT, RepairFormDispatchT } from "../../types";

interface RepairFormContextT {
  currentFormState: RepairFormT;
  formDispatch: RepairFormDispatchT;
  newRepairObj: RepairFormT;
  newProcedure: ProcedureT;
}

export const RepairFormContext = createContext<RepairFormContextT>({
  currentFormState: newRepairObj,
  formDispatch: () => {},
  newRepairObj,
  newProcedure,
});

export const RepairFormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { currentFormState, formDispatch, newRepairObj } = useRepairFormState();

  //! have the current form state be updated by children
  //! but not referenced by them to prevent rerender
  //! each child will have its own state and mirror it to the state when changed

  // useEffect(() => {
  //   console.log("currentFormState @RepairFormContext", currentFormState);
  // }, [currentFormState]);

  const values: RepairFormContextT = {
    currentFormState,
    formDispatch,
    newRepairObj,
    newProcedure,
  };

  return (
    <RepairFormContext.Provider value={values}>
      <>{children}</>
    </RepairFormContext.Provider>
  );
};
