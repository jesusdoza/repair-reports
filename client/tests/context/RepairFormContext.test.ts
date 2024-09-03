import { it, expect, describe, vi } from "vitest";
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

const getTestRepairInstance = vi.fn(() => {
  const TestProcedures = [
    new Procedure({
      imageObjs: [new ImageObj(), new ImageObj()],
      images: ["url1", "url2"],
      imagesIdArr: ["url1", "url2"],
      instructions: "procedure1 intructions",
      procedureNum: 0,
      thumbs: ["url1", "url2"],
    }),
    new Procedure({
      imageObjs: [new ImageObj(), new ImageObj()],
      images: ["url1", "url2"],
      imagesIdArr: ["url1", "url2"],
      instructions: "procedure2 intructions",
      procedureNum: 1,
      thumbs: ["url1", "url2"],
    }),
    new Procedure({
      imageObjs: [new ImageObj(), new ImageObj()],
      images: ["url1", "url2"],
      imagesIdArr: ["url1", "url2"],
      instructions: "procedure3 intructions",
      procedureNum: 2,
      thumbs: ["url1", "url2"],
    }),
  ];

  const testRepairIntance = new Repair(
    JSON.parse(
      '{"_id":{"$oid":"66a93947cfa85842b2eadbbf"},"version":"3","title":"Intermittent vslope code","boardType":"OTHER","searchTags":[],"engineMake":"DDEC 5","procedureArr":[{"_id":"580a7b3d-a801-486f-9049-ee2d64d230c8","images":["http://res.cloudinary.com/da6jwh1id/image/upload/v1722366276/testfolder/63629c7c159bbca8835346f0/hec3qbodapo2h0mgbxrd.jpg","http://res.cloudinary.com/da6jwh1id/image/upload/v1722366274/testfolder/63629c7c159bbca8835346f0/fiklcsuodfabrj8faynh.jpg"],"imageObjs":[{"_id":"9f2d6165-5efd-496c-8e56-807cb2320458","imageUrl":"http://res.cloudinary.com/da6jwh1id/image/upload/v1722366276/testfolder/63629c7c159bbca8835346f0/hec3qbodapo2h0mgbxrd.jpg","imageThumb":"http://res.cloudinary.com/da6jwh1id/image/upload/c_thumb,w_200,g_face/v1722366276/testfolder/63629c7c159bbca8835346f0/hec3qbodapo2h0mgbxrd.jpg","caption":"","imageId":"testfolder/63629c7c159bbca8835346f0/hec3qbodapo2h0mgbxrd","folder":"testfolder/63629c7c159bbca8835346f0"},{"_id":"e215753b-2c77-4e37-b9b5-143a4a10c10a","imageUrl":"http://res.cloudinary.com/da6jwh1id/image/upload/v1722366274/testfolder/63629c7c159bbca8835346f0/fiklcsuodfabrj8faynh.jpg","imageThumb":"http://res.cloudinary.com/da6jwh1id/image/upload/c_thumb,w_200,g_face/v1722366274/testfolder/63629c7c159bbca8835346f0/fiklcsuodfabrj8faynh.jpg","caption":"","imageId":"testfolder/63629c7c159bbca8835346f0/fiklcsuodfabrj8faynh","folder":"testfolder/63629c7c159bbca8835346f0"}],"procedureNum":{"$numberInt":"0"},"instructions":"On ddec 5 everything worked but had vslope code become active randomly when powered up with injectors off. Traced vslope pine from cpu to this chip marked 28D03 but is compatible with LM2901D.","thumbs":[],"imagesIdArr":[]},{"_id":"4c5d8a11-1c36-45a2-813a-d42a17d226dc","images":["http://res.cloudinary.com/da6jwh1id/image/upload/v1722374779/testfolder/63629c7c159bbca8835346f0/yz1tf99ksgtgpwd4pgcw.jpg","http://res.cloudinary.com/da6jwh1id/image/upload/v1722374780/testfolder/63629c7c159bbca8835346f0/wroqtxhki5qj00wxuvzt.jpg"],"imageObjs":[{"_id":"385d7e5f-5f06-4864-949c-e0d3a43710d3","imageUrl":"http://res.cloudinary.com/da6jwh1id/image/upload/v1722374779/testfolder/63629c7c159bbca8835346f0/yz1tf99ksgtgpwd4pgcw.jpg","imageThumb":"http://res.cloudinary.com/da6jwh1id/image/upload/c_thumb,w_200,g_face/v1722374779/testfolder/63629c7c159bbca8835346f0/yz1tf99ksgtgpwd4pgcw.jpg","caption":"","imageId":"testfolder/63629c7c159bbca8835346f0/yz1tf99ksgtgpwd4pgcw","folder":"testfolder/63629c7c159bbca8835346f0"},{"_id":"701be252-4d3f-4d07-b62e-8b658e96b0ce","imageUrl":"http://res.cloudinary.com/da6jwh1id/image/upload/v1722374780/testfolder/63629c7c159bbca8835346f0/wroqtxhki5qj00wxuvzt.jpg","imageThumb":"http://res.cloudinary.com/da6jwh1id/image/upload/c_thumb,w_200,g_face/v1722374780/testfolder/63629c7c159bbca8835346f0/wroqtxhki5qj00wxuvzt.jpg","caption":"","imageId":"testfolder/63629c7c159bbca8835346f0/wroqtxhki5qj00wxuvzt","folder":"testfolder/63629c7c159bbca8835346f0"}],"procedureNum":{"$numberInt":"0"},"instructions":"Code still came up again but only on key on then after a few seconds code would go inactive. Checked resistance on resistors near the lm2901D sometimes marked as 28D03.There was a tiny 472 resistor reading 4M ohms a good one should be around 4K ohm","thumbs":[],"imagesIdArr":[]}],"group":"public","visibility":"public","createdBy":"63629c7c159bbca8835346f0","removed":false,"__v":{"$numberInt":"0"}}'
    )
  );

  testRepairIntance.procedureArr = TestProcedures;

  return testRepairIntance;
});

describe("repair form context method tests", () => {
  it("should change title on repair data changeTitle()", () => {
    const newTitle = "title changed";
    const repair = new Repair();

    expect(repair.title).not.toBe(newTitle);

    changeTitle(repair, newTitle);

    expect(repair.title).toBe(newTitle);
  });
});

describe("intialize repairform data tests", () => {
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
});

describe("RepairFormContext form procedure change tests", () => {
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

  it("changes target procedure instructions", async () => {
    const newIntructions = "instructions changed to this";

    const procedures = [new Procedure(), new Procedure(), new Procedure()];
    const targetProcedureId = procedures[1]._id;
    const initialRepairData = getTestRepairInstance();
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

  //! remove procedure from form
  it.todo("remove target procedure from repair", async () => {
    const newProceduresAdded: Procedure[] = [];
    const { result } = renderHook(() => useContext(RepairFormDataContext), {
      wrapper: RepairContextProvider,
    });

    const amountOfProceduresToAdd = 2;

    await act(async () => {
      for (let i = 0; i < amountOfProceduresToAdd; i++) {
        const procedureToAdd = new Procedure();

        newProceduresAdded.push(procedureToAdd);
        await result.current.formAction.addProcedureAtBegining(procedureToAdd);
      }
    });

    await waitFor(() => {
      expect(result.current.repairFormData.procedureArr.length).toEqual(
        amountOfProceduresToAdd
      );
    });

    //TODO remove procedure

    //TODO check correct amount of procedures are left

    //TODO check the removed id is no longer there
  });
});

describe("repairform context image change tests", () => {
  it("adds image to target procedure", async () => {
    const newImageUrl = "http://new_url";

    const initialRepairData = getTestRepairInstance();

    const targetProcedureId = initialRepairData.procedureArr[0]._id;

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
          }
        });
      }
    });
  });

  it("removes image from target procedure", async () => {
    const newImageUrl = "http://new_url";

    const testNewImagebj = new ImageObj();
    testNewImagebj.imageUrl = newImageUrl;

    const initialRepairData = getTestRepairInstance();

    const targetProcedureId = initialRepairData.procedureArr[0]._id;

    const { result } = renderHook(() => useContext(RepairFormDataContext), {
      wrapper: RepairContextProvider,
    });

    await act(async () => {
      await result.current.initializeRepairFormData(initialRepairData);
    });

    //add image to procedure
    await act(async () => {
      await result.current.formAction.addImage(
        testNewImagebj,
        targetProcedureId
      );
    });

    //check image is in the procedure
    await waitFor(() => {
      const procedures = result.current.repairFormData.procedureArr;

      for (let i = 0; i < procedures.length; i++) {
        const procedureObj = procedures[i];

        procedureObj.imageObjs.forEach((data) => {
          if (data.imageUrl === newImageUrl) {
            expect(procedureObj._id).toBe(targetProcedureId);
          }
        });
      }
    });

    //remove image
    await act(async () => {
      result.current.formAction.removeImage(
        testNewImagebj._id,
        targetProcedureId
      );
    });

    // verify image was removed
    await waitFor(async () => {
      const procedures = result.current.repairFormData.procedureArr;

      for (let i = 0; i < procedures.length; i++) {
        const procedureObj = procedures[i];

        procedureObj.imageObjs.forEach((data) => {
          expect(data._id).not.toBe(testNewImagebj._id);
        });
      }
    });
  });
});
