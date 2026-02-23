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
  return (
    <div
      data-testid="edit-image-card"
      key={uuidv4()}
      className="relative bg-card rounded-xl shadow-lg border border-border p-6 max-w-md mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-primary-foreground/80">
          Image ID:{" "}
          <span className="font-mono text-xs text-muted-foreground">
            {imageId}
          </span>
        </h3>
        <button
          data-testid="delete-button"
          onClick={() => {
            if (onRemove) onRemove();
          }}
          className="btn btn-circle bg-destructive hover:bg-destructive/80 text-destructive-foreground border-none shadow transition-transform hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* alerts and status */}
      <section className="flex flex-col items-center relative min-h-[32px] mb-2">
        <div className="w-full">
          <StatusBar
            errorMessages={errorMessages}
            progress={uploadProgress ? uploadProgress : 0}
            status={uploadStatus ? uploadStatus : ""}
          />
        </div>
      </section>

      {/* image preview or camera preview */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full max-h-60 flex items-center justify-center">
            {url && !activeCamera ? <ImageCard url={url.toString()} /> : null}
          </div>
        </div>
      </div>

      {/* edit tools */}
      <div className="w-full mt-4 bg-muted rounded-lg p-4 border border-border flex flex-col gap-3">
        <h4 className="text-base font-medium text-muted-foreground mb-2">
          Edit Tools
        </h4>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            onFileChange(event);
          }}
          className="file-input file-input-bordered w-full file:bg-primary file:text-primary-foreground file:rounded file:border-none"
        />
        {/*
        <button
          className="btn btn-sm mt-2"
          onClick={onToggleCamera}
        >
          {!activeCamera ? "Open Camera" : "Close Camera"}
        </button>
        */}
        {uploadAllowed && (
          <button
            onClick={() => {
              onUpload();
            }}
            className="btn btn-primary btn-sm w-full mt-2">
            Manual Upload Image
          </button>
        )}
      </div>
    </div>
  );
}
