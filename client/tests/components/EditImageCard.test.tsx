import { EditImageCard } from "../../src/components/ImageCard/EditImageCard";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

describe("EditImageCard tests", () => {
  it("render with no props", () => {
    render(<EditImageCard />);
    // screen.get
  });

  it("should display image url", () => {});

  it("should display camera when activated", () => {});

  it("should display uploaded status on http urls", () => {});
});
