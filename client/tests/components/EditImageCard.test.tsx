import EditImageCardContainer from "../../src/components/ImageCard/EditImageCard";
import { render, screen, fireEvent, within, act } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

describe("EditImageCard tests", () => {
  const testImageUrl = "https://placekitten.com/200/300";

  it("render with no props", () => {
    render(<EditImageCardContainer />);
    screen.getByTestId("edit-image-card");
  });

  it("should display image from url", () => {
    const { container } = render(<EditImageCardContainer url={testImageUrl} />);

    const imgElement = container.querySelector("img");

    expect(imgElement?.src).toBe(testImageUrl);
  });

  // it("should display message on eror", () => {
  //   const { container } = render(
  //     <EditImageCardContainer onRemove={() => console.log("test error")} />
  //   );

  //   const deleteBtn = screen.getByTestId("delete-button");

  //   act(() => {
  //     fireEvent.click(deleteBtn);
  //   });

  //   screen.debug();
  // });

  it("should display camera when activated", () => {});

  it("should display uploaded status on http urls", () => {});
});
