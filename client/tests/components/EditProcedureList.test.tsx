import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { Procedure } from "../../src/classes/Procedure";
import EditProcedureList from "../../src/components/ProcedureList/EditProcedureList";

const testProcedureList = [
  new Procedure({ instructions: "first" }),
  new Procedure({ instructions: "second" }),
  new Procedure({ instructions: "third" }),
  new Procedure({ instructions: "fourth" }),
];

describe("EditProcedureList ", () => {
  it("should display procedures", () => {
    render(<EditProcedureList procedureList={testProcedureList} />);

    const procedureList = screen.queryAllByTestId("edit-procedure-card");
    expect(procedureList.length).toBe(testProcedureList.length);
  });

  it("should add procedure", () => {
    render(<EditProcedureList procedureList={testProcedureList} />);

    const addButtons = screen.getAllByTestId("add-procedure-btn");
    expect(addButtons.length).toBeGreaterThan(0);

    act(() => {
      fireEvent.click(addButtons[0]);
    });

    const procedureList = screen.queryAllByTestId("edit-procedure-card");
    expect(procedureList.length).toBe(testProcedureList.length + 1);
  });

  it("should remove procedure", () => {
    render(<EditProcedureList procedureList={testProcedureList} />);

    const confirmSpy = vi
      .spyOn(window, "confirm")
      .mockImplementation(() => true);

    const removeButtons = screen.getAllByTestId("remove-procedure-btn");
    expect(removeButtons.length).toBeGreaterThan(0);

    act(() => {
      fireEvent.click(removeButtons[0]);
    });

    const procedureList = screen.queryAllByTestId("edit-procedure-card");
    expect(procedureList.length).toBe(testProcedureList.length - 1);
    confirmSpy.mockRestore();
  });
});
