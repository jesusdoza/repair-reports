import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe } from "vitest";
import React from "react";

import LoginSignupContainer from "../../src/components/LoginSignUp/LoginSignupContainer";

const signupFields = [
  "username",
  "email",
  "confirm email",
  "confirm password",
  "password",
  "invite code",
];

describe("group", () => {
  it("should have place for username and password", () => {
    render(<LoginSignupContainer />);

    const userInput = screen.getByPlaceholderText(/email/i);
    expect(userInput).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });
  it("should have a submit button", () => {
    render(<LoginSignupContainer />);
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeInTheDocument();
  });
  it("should have a signup button", () => {
    render(<LoginSignupContainer />);

    const signupButton = screen.getByText(/signup/i);

    expect(signupButton).toBeInTheDocument();
  });

  it("should display signup form when clicked", () => {
    render(<LoginSignupContainer />);

    const signupButton = screen.getByText(/signup/i);

    act(() => {
      fireEvent.click(signupButton);
    });

    screen.debug();

    const emailFeilds = screen.getAllByPlaceholderText(/email/i);
    expect(emailFeilds.length).toBe(2);
    const passwordFeilds = screen.getAllByPlaceholderText(/password/i);
    expect(passwordFeilds.length).toBe(2);

    screen.getAllByPlaceholderText(/invite code/i);

    screen.getAllByPlaceholderText(/username/i);
  });
});
