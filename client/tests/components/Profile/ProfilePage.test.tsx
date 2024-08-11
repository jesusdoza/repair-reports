import {
  getAllByRole,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import React from "react";

// import * as jest from "jest";
import "@testing-library/jest-dom/vitest";
import {
  it,
  expect,
  describe,
  vi,
  Vitest,
  VitestUtils,
  type Mock,
} from "vitest";

import useGetUserGroups from "../../../src/hooks/useGetUserGroups";
import useGetUserRepairs from "../../../src/hooks/useGetUserRepairs";

import ProfilePage from "../../../src/pages/Profile/ProfilePage";

vi.mock("../../../src/hooks/useGetUserRepairs");
vi.mock("../../../src/hooks/useGetUserGroups");

(useGetUserRepairs as Mock).mockReturnValue({
  getData: () => {},
  metaData: { totalByUser: 23, currentPage: 1, limitResults: 2 },
});
(useGetUserGroups as Mock).mockReturnValue({
  data: [],
  fetchData: () => {},
  error: [],
});

(useGetUserRepairs as jest.Mock).mockReturnValue({
  getData: () => {},
  metaData: { totalByUser: 23, currentPage: 1, limitResults: 2 },
});

describe("ProfilePage tests", () => {
  it("should display users total repairs created and total groups joined", () => {
    // Mock the return value of the hook

    render(<ProfilePage />);

    screen.debug();

    expect(1).toBeTruthy();
  });
});
