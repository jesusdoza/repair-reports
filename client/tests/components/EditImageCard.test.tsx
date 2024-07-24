import EditImageCardContainer from "../../src/components/ImageCard/EditImageCard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ImageObj } from "../../src/classes/ImageObj";

describe("EditImageCard tests", () => {
  const testImageUrl = "https://placekitten.com/200/300";

  it("render with no props", () => {
    //@ts-expect-error testing render
    render(<EditImageCardContainer />);
    screen.getByTestId("edit-image-card");
  });

  it("should display image from url", () => {
    //@ts-expect-error testing render
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
  it("should display uploaded status on http urls", () => {
    const testImageData = new ImageObj();
    testImageData.imageUrl =
      "https://media.istockphoto.com/id/1095522328/photo/searching-missing-piece.jpg?s=2048x2048&w=is&k=20&c=RnVaIz5Y2GZTLDeA2mRrWgg1YjjdSbCu50WkyzzJGbc=";

    const { container } = render(
      //@ts-expect-error testing render
      <EditImageCardContainer
        url={testImageData.imageUrl}
        imageData={testImageData}
      />
    );

    const imgElement = container.querySelector("img");
    screen.debug();
    screen.getByText("uploaded");
    expect(imgElement?.src).toBe(testImageData.imageUrl);
  });

  it("should display camera when activated", () => {});
});
