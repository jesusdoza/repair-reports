import { it, expect, describe, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import InviteTool, {
  GroupOptionT,
} from "../../src/components/Invite/InviteTool";
import React from "react";

const testGroups: GroupOptionT[] = [
  {
    id: "11111",
    name: "test-group1",
  },
  {
    id: "222222",
    name: "test-group2",
  },
  {
    id: "3333333",
    name: "test-group3",
  },
];

describe("InviteTool", () => {
  const testFn = vi.fn();
  it("should display list of groups to invite", () => {
    render(
      <InviteTool
        availableGroups={testGroups}
        onPostInvite={testFn}
      />
    );
    const list = screen.getByText(/Select group/i);

    fireEvent.mouseDown(list);

    testGroups.forEach((group) => {
      expect(screen.getByText(group.name)).toBeInTheDocument();
    });
  });

  it("should call onPostIntive method with passed in prop", () => {
    render(
      <InviteTool
        availableGroups={testGroups}
        onPostInvite={testFn}
      />
    );

    const submitButton = screen.getByTestId("invite-submit");

    act(() => {
      fireEvent.click(submitButton);
    });

    expect(testFn).toBeCalledTimes(1);

    testFn.mockReset();
  });

  it("should call onPostIntive method with correct args", () => {
    render(
      <InviteTool
        availableGroups={testGroups}
        onPostInvite={testFn}
      />
    );

    const submitButton = screen.getByTestId("invite-submit");
    const list = screen.getByText(/Select group/i);

    act(() => {
      fireEvent.mouseDown(list);
    });

    fireEvent.click(screen.getByText(testGroups[0].name));

    act(() => {
      fireEvent.click(submitButton);
    });

    expect(testFn).toHaveBeenCalledWith([testGroups[0].id], "");
    expect(testFn).not.toHaveBeenCalledWith([testGroups[1].id], "PASSWORD");

    testFn.mockReset();
  });
});
