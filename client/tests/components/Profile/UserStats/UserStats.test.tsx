import UserStats, {
  GroupListingT,
} from "../../../../src/components/Profile/UserStats/UserStats";
import {
  getAllByRole,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe } from "vitest";
import React from "react";
import { MemoryRouter } from "react-router-dom";

const testGroupListProp: GroupListingT[] = [
  {
    groupId: "1111",
    groupName: "number1",
    role: ["read", "invite"],
  },
  {
    groupId: "22222",
    groupName: "number2",
    role: ["read"],
  },
];

const testTotalRepairsProp = 4;

describe("UserStats", () => {
  it("should display table with corect number of listings", () => {
    render(
      <MemoryRouter>
        <UserStats
          groupsList={testGroupListProp}
          totalRepairs={testTotalRepairsProp}
        />
      </MemoryRouter>
    );

    const table = screen.getByRole("table");
    const tableRows = getAllByRole(table, "row");

    //plus on for the table header also counts as row

    testGroupListProp.forEach((groupData) => {
      screen.getByText(groupData.groupName);
    });

    expect(tableRows.length).toBe(testGroupListProp.length + 1);
  });

  it("should display total number of repairs", () => {
    render(
      <MemoryRouter>
        <UserStats
          groupsList={testGroupListProp}
          totalRepairs={testTotalRepairsProp}
        />
      </MemoryRouter>
    );
    screen.getByText(testTotalRepairsProp);
  });

  it("should display correct roles", () => {
    render(
      <MemoryRouter>
        <UserStats
          groupsList={testGroupListProp}
          totalRepairs={testTotalRepairsProp}
        />
      </MemoryRouter>
    );

    const targetCell = screen.getByText(/invite/i);
    const targetRow = targetCell.closest("tr");
    //@ts-expect-error checking must have row with current state
    getByText(targetRow, testGroupListProp[0].groupName);
  });
});
