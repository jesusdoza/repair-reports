import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe, vi } from "vitest";
import React, { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

import LoginSignupContainer from "../../src/components/LoginSignUp/LoginSignupContainer";
// import { ClerkProvider } from "@clerk/clerk-react";
// import { RouterProvider } from "react-router-dom";
// import { createBrowserRouter } from "react-router-dom";

const signupFields = [
  "username",
  "email",
  "confirm email",
  "confirm password",
  "password",
  "invite code",
];

vi.mock("@clerk/clerk-react", () => {
  return {
    useAuth: vi.fn(() => {
      return { userId: null };
    }),
  };
});

describe("group", () => {
  it("should have place for username and password", () => {
    const screen = render(
      <MemoryRouter>
        <LoginSignupContainer oldLoginScreen={true} />
      </MemoryRouter>
    );

    screen.debug();

    const userInput = screen.getByPlaceholderText(/Email/i);
    expect(userInput).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });
  it("should have a submit button", () => {
    render(
      <MemoryRouter>
        <LoginSignupContainer oldLoginScreen={true} />
      </MemoryRouter>
    );
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeInTheDocument();
  });
  it("should have a signup button", () => {
    render(
      <MemoryRouter>
        <LoginSignupContainer oldLoginScreen={true} />
      </MemoryRouter>
    );

    const signupButton = screen.getByText(/signup/i);

    expect(signupButton).toBeInTheDocument();
  });

  it("should display signup form when clicked", () => {
    render(
      <MemoryRouter>
        <LoginSignupContainer oldLoginScreen={true} />
      </MemoryRouter>
    );

    const signupButton = screen.getByText(/signup/i);

    act(() => {
      fireEvent.click(signupButton);
    });

    const emailFeilds = screen.getAllByPlaceholderText(/email/i);
    expect(emailFeilds.length).toBe(2);
    const passwordFeilds = screen.getAllByPlaceholderText(/password/i);
    expect(passwordFeilds.length).toBe(2);

    screen.getAllByPlaceholderText(/invite code/i);

    screen.getAllByPlaceholderText(/username/i);
  });
});
