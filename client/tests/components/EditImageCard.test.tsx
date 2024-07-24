import EditImageCardContainer from "../../src/components/ImageCard/EditImageCard";
import { fireEvent, getByRole, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ImageObj } from "../../src/classes/ImageObj";
import { act } from "react";

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

  it("should display uploaded status on http urls", () => {
    const testImageData = new ImageObj();
    testImageData.imageUrl =
      "https://media.istockphoto.com/id/1095522328/photo/searching-missing-piece.jpg?s=2048x2048&w=is&k=20&c=RnVaIz5Y2GZTLDeA2mRrWgg1YjjdSbCu50WkyzzJGbc=";

    render(
      //@ts-expect-error testing render
      <EditImageCardContainer
        url={testImageData.imageUrl}
        imageData={testImageData}
      />
    );

    screen.getByTestId("upload-status-bar");
    const statusElem = screen.getByTestId("status");
    expect(statusElem.textContent).toMatch(/uploaded/i);
  });

  it("should call on remove method", () => {
    const onRemove = vi.fn();
    render(
      <EditImageCardContainer
        //@ts-expect-error testing render
        imageData={{ _id: "1" }}
        onRemove={onRemove}
      />
    );
    const deleteBtn = screen.getByTestId("delete-button");
    act(() => {
      fireEvent.click(deleteBtn);
    });
    expect(onRemove).toBeCalledTimes(1);
  });
});
