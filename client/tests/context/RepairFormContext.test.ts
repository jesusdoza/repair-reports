import { it, expect, describe } from "vitest";
import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import {
  changeTitle,
  RepairContextProvider,
  RepairFormDataContext,
} from "../../src/context/RepairFormContext";

import { Repair } from "../../src/classes/Repair";

import { useContext } from "react";
import { Procedure } from "../../src/classes/Procedure";
import { ImageObj } from "../../src/classes/ImageObj";

describe("repair form context method tests", () => {
  it("should change title on repair data changeTitle()", () => {
    const newTitle = "title changed";
    const repair = new Repair();

    expect(repair.title).not.toBe(newTitle);

    changeTitle(repair, newTitle);

    expect(repair.title).toBe(newTitle);
  });
});

describe("RepairFormContext form changes tests", () => {
  it("should initialize repairFormdata with initializeRepairformData method", async () => {
    const { result } = renderHook(() => useContext(RepairFormDataContext), {
      wrapper: RepairContextProvider,
    });

    const newRepair = new Repair();
    newRepair.title = "changed title";

    await act(async () => {
      await result.current.initializeRepairFormData(newRepair);
    });

    await waitFor(() => {
      expect(result.current.repairFormData).toEqual(newRepair);
    });
  });

  it("should add procedure to repair increasing array", async () => {
    const { result } = renderHook(() => useContext(RepairFormDataContext), {
      wrapper: RepairContextProvider,
    });

    // const startingProcedures = result.current.repairFormData.procedureArr;
    const amountOfProceduresToAdd = 2;

    await act(async () => {
      for (let i = 0; i < amountOfProceduresToAdd; i++) {
        await result.current.formAction.addProcedureAtBegining(new Procedure());
      }
    });

    await waitFor(() => {
      expect(result.current.repairFormData.procedureArr.length).toEqual(
        amountOfProceduresToAdd
      );
    });
  });

  it("should add procedure after desired procedure with id matching", async () => {
    const { result } = renderHook(() => useContext(RepairFormDataContext), {
      wrapper: RepairContextProvider,
    });
    const procedures = [new Procedure(), new Procedure(), new Procedure()];

    const TEST_REPAIR = new Repair();
    TEST_REPAIR.procedureArr = procedures;

    await act(async () => {
      result.current.initializeRepairFormData(TEST_REPAIR);
    });

    expect(result.current.repairFormData.procedureArr[0]._id).toBe(
      procedures[0]._id
    );

    let testProc = new Procedure();
    testProc._id += "new one";
    let addAfterPos = 0;
    let pushedProcId =
      result.current.repairFormData.procedureArr[addAfterPos + 1]._id;

    //add procedure after first one
    await act(async () => {
      result.current.formAction.addProcedureAfter(
        procedures[addAfterPos]._id,
        testProc
      );
    });

    //expect new procedure to be inserted after the pos specified
    expect(
      result.current.repairFormData.procedureArr[addAfterPos + 1]._id
    ).toBe(testProc._id);

    //expect old procedure to be one index up from previous
    expect(
      result.current.repairFormData.procedureArr[addAfterPos + 2]._id
    ).toBe(pushedProcId);

    addAfterPos = 1;
    testProc = new Procedure();
    testProc._id += "new 2";
    pushedProcId =
      result.current.repairFormData.procedureArr[addAfterPos + 1]._id;

    const targetId =
      result.current.repairFormData.procedureArr[addAfterPos]._id;

    //add procedure after first one
    console.log("target id: ", targetId);
    await act(async () => {
      result.current.formAction.addProcedureAfter(targetId, testProc);
    });

    // expect new procedure to be inserted after the pos specified
    expect(
      result.current.repairFormData.procedureArr[addAfterPos + 1]._id
    ).toBe(testProc._id);

    // expect old procedure to be one index up from previous
    expect(
      result.current.repairFormData.procedureArr[addAfterPos + 2]._id
    ).toBe(pushedProcId);
  });
});

describe("repairform context procedure change tests", () => {
  it("changes target procedure instructions", async () => {
    const newIntructions = "instructions changed to this";

    const procedures = [new Procedure(), new Procedure(), new Procedure()];
    const targetProcedureId = procedures[1]._id;
    const initialRepairData = new Repair();
    initialRepairData.procedureArr = procedures;
    const { result } = renderHook(() => useContext(RepairFormDataContext), {
      wrapper: RepairContextProvider,
    });

    await act(async () => {
      await result.current.initializeRepairFormData(initialRepairData);
    });
    await act(async () => {
      await result.current.formAction.updateInstructions(
        targetProcedureId,
        newIntructions
      );
    });

    await waitFor(() => {
      const procedures = result.current.repairFormData.procedureArr;

      for (let i = 0; i < procedures.length; i++) {
        const procedureObj = procedures[i];

        if (procedureObj._id === targetProcedureId) {
          expect(procedureObj.instructions).toEqual(newIntructions);
        } else {
          expect(procedureObj.instructions).toEqual("");
        }
      }
    });
  });

  it("adds image to target procedure", async () => {
    const newImageUrl = "http://new_url";

    const procedures = [new Procedure(), new Procedure(), new Procedure()];
    const targetProcedureId = procedures[0]._id;
    const initialRepairData = new Repair();
    initialRepairData.procedureArr = procedures;

    const { result } = renderHook(() => useContext(RepairFormDataContext), {
      wrapper: RepairContextProvider,
    });

    await act(async () => {
      await result.current.initializeRepairFormData(initialRepairData);
    });

    await act(async () => {
      const newImagebj = new ImageObj();
      newImagebj.imageUrl = newImageUrl;
      await result.current.formAction.addImage(newImagebj, targetProcedureId);
    });

    await waitFor(() => {
      const procedures = result.current.repairFormData.procedureArr;

      for (let i = 0; i < procedures.length; i++) {
        const procedureObj = procedures[i];

        procedureObj.imageObjs.forEach((data) => {
          if (data.imageUrl === newImageUrl) {
            expect(procedureObj._id).toBe(targetProcedureId);
          } else {
            expect(procedureObj._id).not.toBe(targetProcedureId);
          }
        });
        //go through the images in all procedures to see if image url was addeded
      }
    });
  });

  it.todo("removes image from target procedure", () => {
    expect(images).not.toContain(testImage);
  });
});

describe("repairform context image change tests", () => {
  it.todo("should", () => {});
});
