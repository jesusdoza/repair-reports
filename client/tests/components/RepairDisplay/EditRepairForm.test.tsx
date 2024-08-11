import {
  act,
  fireEvent,
  getByRole,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import React from "react";

import EditRepairForm from "../../../src/components/RepairDisplay/RepairEditFormV2";
import { RepairDataT } from "../../../types";
import { Procedure } from "../../../src/classes/Procedure";
import { RepairContextProvider } from "../../../src/context/RepairFormContext";
import { Repair } from "../../../src/classes/Repair";

const testData: RepairDataT = {
  boardType: "test board",
  createdBy: "test id",
  engineMake: "test enginemake",
  group: "test group",
  removed: false,
  procedureArr: [
    new Procedure({
      instructions: "test instructions",
      imageObjs: [],
      images: [],
      imagesIdArr: [],
      procedureNum: 0,
      thumbs: [],
      _id: "1234",
    }),
  ],
  title: "test title",
  version: 3,
  searchTags: ["test tag"],
  _id: "111111",
  visibility: "public",
};

const expectedRepair = new Repair(testData);

///TEST SUITE
describe("EditRepairForm tests", () => {
  const onSubmitMock = vi.fn();

  beforeEach(() => {
    onSubmitMock.mockReset();
  });

  it("display error with missing data", () => {
    //@ts-expect-error checking empty prop render
    render(<EditRepairForm />);
    screen.getByText(/no data/i);
  });

  it("should display data passed in", () => {
    //@ts-expect-error checking empty prop render
    render(<EditRepairForm repair={testData} />);

    //title
    screen.getByDisplayValue(testData.title);
    //enginemake
    screen.getByText(testData.engineMake, { exact: false });
    //instructions on one procedure
    screen.getByText(testData.procedureArr[0].instructions, { exact: false });
  });

  it("should call edit function passed in", async () => {
    // onSubmitMock.mockImplementation((args) => {
    //   // console.log("args", args);
    // });

    onSubmitMock.mockReset();

    render(
      <EditRepairForm
        submitType="Update"
        repair={testData}
        onSubmit={onSubmitMock}
      />
    );

    await act(() => {
      submitFormAction();
    });

    expect(onSubmitMock).toBeCalled();
  });

  it("should send in correct form data to function onsubmit fn", async () => {
    onSubmitMock.mockReset();

    render(
      <RepairContextProvider>
        <EditRepairForm
          submitType="Update"
          repair={testData}
          onSubmit={onSubmitMock}
        />
      </RepairContextProvider>
    );

    await act(() => {
      submitFormAction();
    });

    expect(onSubmitMock).toBeCalledWith(expectedRepair);
    expect(onSubmitMock).not.toBeCalledWith(new Repair());
  });

  it("title input should change and be reflected with correct formData", async () => {
    onSubmitMock.mockReset();

    const titleChangeValue = "this new title";

    const user = userEvent.setup();

    render(
      <RepairContextProvider>
        <EditRepairForm
          submitType="Update"
          repair={testData}
          onSubmit={onSubmitMock}
        />
      </RepairContextProvider>
    );

    const titleInput = screen.getByTestId("title-input");
    user.clear(titleInput);

    //submit form
    await act(async () => {
      await user.type(titleInput, titleChangeValue);
    });

    await act(() => {
      submitFormAction();
    });

    screen.debug(titleInput);

    expectedRepair.title = titleChangeValue;

    expect(onSubmitMock).toBeCalledWith(expectedRepair);
  });
});

//*************************utility***********************
async function submitFormAction() {
  const submitButton = screen.getByTestId("repair-form-tools");
  await act(() => {
    fireEvent.click(submitButton);
  });

  const confirmModal = screen.getByTestId("confirm-modal");

  await act(async () => {
    const confirmButton = getByRole(confirmModal, "button", {
      hidden: true,
    });
    await fireEvent.click(confirmButton);
  });
}
