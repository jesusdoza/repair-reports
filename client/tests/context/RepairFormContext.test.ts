import { it, expect, describe } from "vitest";
import { act, render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import {
  changeTitle,
  RepairContextProvider,
  RepairFormDataContext,
} from "../../src/context/RepairFormContext";
import { Repair } from "../../src/classes/Repair";

import { useContext } from "react";

describe("repair form context method tests", () => {
  it("should change title on repair data changeTitle()", () => {
    const newTitle = "title changed";
    const repair = new Repair();

    expect(repair.title).not.toBe(newTitle);

    changeTitle(repair, newTitle);

    expect(repair.title).toBe(newTitle);
  });
});

describe("RepairFormContext tests", () => {
  it("should", async () => {
    const { result } = renderHook(() => useContext(RepairFormDataContext), {
      wrapper: RepairContextProvider,
    });

    const intializeForm = result.current.initializeRepairFormData;
    const repairFormData = result.current.repairFormData;
    const formActions = result.current.formAction;

    await act(async () => {
      await intializeForm(new Repair());
    });

    await waitFor(() => {
      expect(Array.isArray(result.current.data)).toBe(true);
      expect(result.current.data.length).toBe(mockReturn.length);
      expect(axiosMockGet).toBeCalledTimes(3);
    });
  });
});
