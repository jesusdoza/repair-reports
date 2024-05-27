import { createContext } from "react";
import { Repair } from "../classes/Repair";

export type RepairFormDataContextT = {
  repairFormData: Repair;
};

const repairFormData = new Repair();

export const RepairContext = createContext<RepairFormDataContextT>({
  repairFormData,
});

export const RepairContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const values = {
    repairFormData,
    formAction: { addProcedureAfter, addProcedureAtBegining },
  };

  return (
    <RepairContext.Provider value={values}>{children}</RepairContext.Provider>
  );
};

//methods for updating repair

function addProcedureAfter() {}
function addProcedureAtBegining() {}
