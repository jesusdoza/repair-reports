//@ts-nocheck
import { it, expect, describe, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { createBrowserRouter, MemoryRouter } from "react-router-dom";

import "@testing-library/jest-dom/vitest";

import Navbar, { NavLinkT } from "../../../src/components/Navbar/Navbar";
import React from "react";

export const routes = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <div></div>,
  },
]);

const testMenu: NavLinkT[] = [
  { label: "test1", url: "/test1" },
  { label: "test2", url: "/test2" },
];

const testProfileMenu: NavLinkT[] = [
  { label: "profile1", url: "/profile1" },
  { label: "profile2", url: "/profile2" },
];

describe("Navbar", () => {
  it("should render with missing props", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  });

  it("should display link to menu items passed in", () => {
    render(
      <MemoryRouter>
        <Navbar mainMenu={testMenu} />
      </MemoryRouter>
    );

    testMenu.forEach((item) => {
      expect(screen.getByText(item.label));
    });
  });

  it("should have the profile links passed as props", () => {
    render(
      <MemoryRouter>
        <Navbar
          mainMenu={testMenu}
          profileMenu={testProfileMenu}
        />
      </MemoryRouter>
    );

    const profileNavButton = screen.getByTestId("nav-profile-menu");

    act(() => {
      fireEvent.mouseDown(profileNavButton);
    });

    testProfileMenu.forEach((item) => {
      expect(screen.getByText(item.label));
    });
  });
});
