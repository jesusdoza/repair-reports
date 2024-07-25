import { render, screen, fireEvent } from "@testing-library/react";
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
  it("should remove procedure", () => {
    render(<EditProcedureList procedureList={testProcedureList} />);

    const procedureList = screen.queryAllByTestId("edit-procedure-card");
    expect(procedureList.length).toBe(testProcedureList.length);
  });
  it("should add procedure", () => {});
});
