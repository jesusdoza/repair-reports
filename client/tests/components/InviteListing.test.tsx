import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  InviteListing,
  InviteT,
} from "../../src/components/Invite/InviteListing/InviteListing";

const testInviteData: InviteT = {
  createdAt: "12345",
  groups: [{ id: "1321234", name: "test group" }],
  inviteCode: "3fewafawe",
  invitePassword: "dfdafdafsad",
  status: "pending",
};

describe("InviteListing", () => {
  it("should render listing of invites when list is provided ", () => {
    render(<InviteListing invite={testInviteData} />);

    screen.debug();
  });
});
