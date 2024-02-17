import React, { useState, useRef } from "react";

export function EditImageCard({
  url,
  setUrl,
}: {
  url: string;
  setUrl: (newUrl: string) => void;
}) {
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    url
  );

  const [activeCamera, setActiveCamera] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = async () => {
    setActiveCamera((state) => !state);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const captureFrame = () => {
    const canvas = document.createElement("canvas");
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");
      setImagePreview(dataUrl);
    }
  };

  return (
    <div
      key={url}
      className="w-3/4 bg-green-100">
      <div className="flex flex-col">
        {imagePreview && (
          <img
            src={imagePreview.toString()}
            alt="Preview"
            style={{ maxWidth: "100%" }}
          />
        )}
        <label
          htmlFor=""
          className="text-black border-2 border-s-violet-100">
          <h3 className=" bg-gray-700">Change image</h3>
          {activeCamera && (
            <video
              ref={videoRef}
              style={{ display: "block", maxWidth: "100%" }}
              autoPlay
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <div
            className="btn"
            onClick={captureFrame}>
            capture
          </div>

          <div
            className="btn"
            onClick={handleCapture}>
            Use camera
          </div>
        </label>
      </div>
    </div>
  );
}
