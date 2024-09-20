import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import React from "react";

import InviteLog, { InviteT } from "../../../src/components/Invite/InviteLog";

const testInvites: InviteT[] = [
  {
    createdAt: "12345",
    inviteCode: "111111",
    groups: [{ id: "11111", name: "group1invite" }],
    invitePassword: "pass1",
    status: "pending",
  },
  {
    createdAt: "12345",
    inviteCode: "111111",
    groups: [{ id: "11111", name: "group1invite" }],
    invitePassword: "pass1",
    status: "pending",
  },
];

describe("group", () => {
  it("should render with no props", () => {
    render(<InviteLog />);
  });

  it("should display list of invites", () => {
    render(<InviteLog invites={testInvites} />);

    const logRows = screen.getAllByRole("row");

    expect(logRows.length).toBe(testInvites.length + 1);
  });
});
