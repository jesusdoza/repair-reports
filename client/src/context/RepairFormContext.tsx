import { createContext, useState } from "react";
import { Repair } from "../classes/Repair";
import { addItem } from "../hooks/utils/addItem";
import { Procedure } from "../classes/Procedure";
import { RepairDataT } from "../../types";
import { ImageObj } from "../classes/ImageObj";

export type RepairFormDataContextT = {
  repairFormData: Repair;
  initializeRepairFormData: (repair: RepairDataT) => void;
  formAction: {
    addProcedureAfter: (id: string, item: Procedure) => void;
    addProcedureAtBegining: (item: Procedure) => void;
    updateInstructions: (id: string, text: string) => void;
    updateTitle: (title: string) => void;
    updateEngineMake: (title: string) => void;
    updateGroup: (title: string) => void;
    updateBoardType: (title: string) => void;
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
    updateTitle: () => {},
    updateEngineMake: () => {},
    updateGroup: () => {},
    updateBoardType: () => {},
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
  // const [repairFormData, setRepairFormData] = useState(repairForm);

  function updateTitle(title: string) {
    setRepairFormData((state) => {
      state.title = title;
      return state;
    });
  }
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

  //initialize form data
  function initializeRepairFormData(repair: RepairDataT) {
    const newRepair = new Repair(repair);

    setRepairFormData(newRepair);
  }

  function updateEngineMake(value: string) {
    setRepairFormData((state) => {
      state.engineMake = value;
      return state;
    });
  }
  function updateGroup(value: string) {
    setRepairFormData((state) => {
      state.engineMake = value;
      return state;
    });
  }
  function updateBoardType(value: string) {
    setRepairFormData((state) => {
      state.engineMake = value;
      return state;
    });
  }

  //! not tested
  ///add image to procedure
  function addImage(item: ImageObj, procedureId: string) {
    const targetProcedure = repairFormData.procedureArr.findIndex((proc) => {
      if (proc._id == procedureId) {
        return true;
      }
      return false;
    });

    const imagesArr = repairFormData.procedureArr[targetProcedure].imageObjs;

    const newImageObjs = addItem({
      pos: "end",
      arr: imagesArr,
      item,
    });

    setRepairFormData((state) => {
      state.procedureArr[targetProcedure].imageObjs = newImageObjs;

      return state;
    });
  }

  //! not tested
  //remove by id
  function removeImage(imageId: string, procedureId: string) {
    //get target procedure data
    const targetProcedure = repairFormData.procedureArr.findIndex((proc) => {
      if (proc._id == procedureId) {
        return true;
      }
      return false;
    });

    //filter out target id and return wanted imageObjs
    const newImageObjs = repairFormData.procedureArr[
      targetProcedure
    ].imageObjs.filter((imageData) => {
      if (imageData._id == imageId) return false;

      return true;
    });

    //update form data state without causing rerender
    setRepairFormData((state) => {
      state.procedureArr[targetProcedure].imageObjs = newImageObjs;

      return state;
    });
  }

  function updateImage() {}
  ///values to set in context
  const values = {
    repairFormData,
    initializeRepairFormData,
    formAction: {
      updateEngineMake,
      updateBoardType,
      updateGroup,
      addProcedureAfter,
      addProcedureAtBegining,
      updateInstructions,
      updateTitle,
      addImage,
      removeImage,
      updateImage,
    },
  };

  return (
    <RepairContext.Provider value={values}>{children}</RepairContext.Provider>
  );
};
