import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { Procedure } from "../../src/classes/Procedure";
import EditProcedureList from "../../src/components/ProcedureList/EditProcedureList";

const testProcedureList = [
  new Procedure(),
  new Procedure(),
  new Procedure(),
  new Procedure(),
];

describe("EditProcedureList ", () => {
  it("should remove procedure", () => {
    render(<EditProcedureList procedureList={testProcedureList} />);
  });
  it("should add procedure", () => {});
});
