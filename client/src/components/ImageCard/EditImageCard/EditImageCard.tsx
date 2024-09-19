import React from "react";

import { ImageCard } from "../ImagePreviewCard";
import StatusBar from "../UploadStatusBar";
import { v4 as uuidv4 } from "uuid";

//todo extract view from the logic
type EditImageCardPropsT = {
  imageId?: string;
  url: string;
  onRemove?: () => void;
  errorMessages?: string[];
  uploadStatus?: string;
  uploadProgress?: number;
  isCameraActive: boolean;
  uploadAllowed: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  onCapture: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleCamera: () => void;
  onUpload: () => void;
};

export default function EditImageCard({
  imageId = "",
  url,
  uploadStatus,
  errorMessages,
  onRemove,
  uploadProgress,
  isCameraActive: activeCamera,

  onFileChange,
  uploadAllowed,
  onUpload,
}: EditImageCardPropsT) {
  //   useEffect(() => {}, [videoRef]);

  return (
    <div
      data-testid="edit-image-card"
      key={uuidv4()}
      className="relative">
      <h3>image id :{imageId}</h3>
      {/* delete x button */}
      <div
        data-testid="delete-button"
        onClick={() => {
          if (onRemove) onRemove();
        }}
        className="btn btn-circle z-10 bg-yellow-600 absolute right-0 hover:bg-red-600 hover:scale-125">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="black">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      {/* alerts and status */}
      <section className=" flex flex-col items-center h-1/8 relative">
        {/* upload progress bar */}
        <div className=" absolute">
          <StatusBar
            errorMessages={errorMessages}
            progress={uploadProgress ? uploadProgress : 0}
            status={uploadStatus ? uploadStatus : ""}
          />
        </div>
      </section>

      {/* image preview or camera preview */}
      <div className="flex flex-col max-w-[500px] h-5/6 items-center">
        {/* camera of image preview */}
        <div className="w-full flex flex-col justify-center items-center h-5/6">
          <div className="h-4/6">
            {/* there is image to preview and camera is inactive */}
            {url && !activeCamera ? <ImageCard url={url.toString()} /> : null}
          </div>
          <section className="flex w-full h-2/6 item-center justify-center ">
            {/* //! manaul image url input */}
            {/* <div className="items-center ">
          Image URL
          <textarea
            onChange={(event) => {
              // event.preventDefault();
              const text = event.target.value;
              setImagePreview(text);
              handleUrlChange(text);
            }}
            wrap="true"
            // defaultValue={url}
            defaultValue={
              typeof imagePreview == "string"
                ? imagePreview
                : "no image url"
            }
            // value={url}
            cols={30}
            className="textarea textarea-bordered w-full"
            placeholder="URL"></textarea>
        </div> */}
          </section>
        </div>

        {/* edit tools */}
        <div className="text-black border-2 border-s-violet-100 w-full">
          <h3 className=" bg-gray-700">Edit Tools</h3>

          <div>
            <input
              type="file"
              accept="file"
              onChange={(event) => {
                onFileChange(event);
              }}
            />
          </div>

          {/* <div
              className="btn btn-sm"
              onClick={onToggleCamera}>
              {!activeCamera ? "open camera" : "close camera"}
            </div> */}

          {uploadAllowed && (
            <div
              onClick={() => {
                onUpload();
              }}
              className="btn btn-sm">
              Manual Upload Image
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
