import { createContext, useState } from "react";
import { Repair } from "../classes/Repair";
import { addItem } from "../hooks/utils/addItem";
import { Procedure } from "../classes/Procedure";
import { RepairDataT } from "../../types";

export type RepairFormDataContextT = {
  repairFormData: Repair;
  initializeRepairFormData: (repair: RepairDataT) => void;
  formAction: {
    addProcedureAfter: (id: string, item: Procedure) => void;
    addProcedureAtBegining: (item: Procedure) => void;
    updateInstructions: (id: string, text: string) => void;
  };
};

// const repairForm = new Repair();

export const RepairContext = createContext<RepairFormDataContextT>({
  repairFormData: new Repair(),
  initializeRepairFormData: () => {},
  formAction: {
    addProcedureAfter: () => {},
    addProcedureAtBegining: () => {},
    updateInstructions: () => {},
  },
});

//Provider
export const RepairContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const repairForm = new Repair();
  const [repairFormData, setRepairFormData] = useState(repairForm);

  /// add to beggining of procedure array
  function addProcedureAtBegining(item: Procedure) {
    //update procedures
    const newArr = addItem({
      pos: "begining",
      arr: repairFormData.procedureArr,
      item,
    });

    setRepairFormData((state) => {
      state.procedureArr = newArr;

      return state;
    });
  }

  ///update insturctions
  function updateInstructions(id: string, text: string) {
    setRepairFormData((state) => {
      const newArr = state.procedureArr.map((proc) => {
        if (proc._id == id) {
          proc.instructions = text;
          return proc;
        }
        return proc;
      });
      state.procedureArr = newArr;

      return state;
    });
  }

  ///add procedure after the id provided
  function addProcedureAfter(id: string, item: Procedure) {
    const newArr = addItem({
      id,
      pos: "after",
      arr: repairFormData.procedureArr,
      item,
    });
    setRepairFormData((state) => {
      state.procedureArr = newArr;

      return state;
    });
  }

  function initializeRepairFormData(repair: RepairDataT) {
    const newRepair = new Repair(repair);
    console.log("new repair initialized context");
    console.log("newRepair", newRepair);
    setRepairFormData(newRepair);
  }
  ///values to set in context
  const values = {
    repairFormData,
    initializeRepairFormData,
    formAction: {
      addProcedureAfter,
      addProcedureAtBegining,
      updateInstructions,
    },
  };

  return (
    <RepairContext.Provider value={values}>{children}</RepairContext.Provider>
  );
};
