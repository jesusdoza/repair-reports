import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe } from "vitest";
import React from "react";

import EditRepairForm from "../../../src/components/RepairDisplay/RepairEditFormV2";
import { Repair } from "../../../src/classes/Repair";
import { RepairDataT } from "../../../types";

const testData: RepairDataT = {
  boardType: "test board",
  createdBy: "test id",
  engineMake: "test enginemake",
  group: "test group",
  removed: false,
  procedureArr: [],
  title: "test title",
  version: 3,
  searchTags: ["test tag"],
  _id: "111111",
  visibility: "public",
};

const testRepair = new Repair(testData);

describe("EditRepairForm", () => {
  it("display error with missing data", () => {
    //@ts-expect-error checking empty prop render
    render(<EditRepairForm />);
    screen.getByText(/no data/i);
  });
  it("display data", () => {
    //@ts-expect-error checking empty prop render
    render(<EditRepairForm repair={testRepair} />);
    screen.debug();
    screen.getByText(/test title/i);
  });
  it.todo("call edit function passed in", () => {});
  it.todo(
    "repair form changes should be reflected on call function passed in",
    () => {}
  );
  it.todo("should handle invalid repair data", () => {});
});
