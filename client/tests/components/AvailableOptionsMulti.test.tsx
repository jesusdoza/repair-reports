import { it, expect, describe } from "vitest";
import {
  render,
  screen,
  fireEvent,
  findByText,
  queryHelpers,
} from "@testing-library/react";
import AvailableOptionsMulti from "../../src/components/AvailableOptions/AvailableOptionsMulti";
import "@testing-library/jest-dom/vitest";

const testOptions = [
  {
    value: "option1",
    label: "option1",
  },
  {
    value: "option2",
    label: "option2",
  },
  {
    value: "option3",
    label: "option3",
  },
];

describe("AvailableOptionsMulti", () => {
  it("should render with no props", () => {
    render(<AvailableOptionsMulti />);

    const component = screen.getByTestId("available-options-multi");

    screen.debug();
    expect(component).toBeInTheDocument();
  });

  it("should contain items passed in", async () => {
    render(
      <AvailableOptionsMulti
        title="test title"
        options={testOptions}
      />
    );

    // const component = screen.getByText("test title");
    const component = screen.getByText("Select...");
    fireEvent.mouseDown(component);

    testOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });
});
