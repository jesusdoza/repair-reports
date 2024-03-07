import React, { useState, useRef, useEffect } from "react";
import useUploadImage from "../../hooks/useUploadImage";
import { CameraPreview } from "./CameraPreview";
import { ImageObjT } from "../../../types";
import { useDebouncedCallback } from "use-debounce";
import { v4 as uuidv4 } from "uuid";

enum UploadStatus {
  SUCCESS,
  UPLOADING,
  ERROR,
  IDLE,
}

export function EditImageCard({
  url,
  setFormImageUrl,
}: {
  url: string;
  setFormImageUrl: (imageObj: ImageObjT) => void; //external state setter to manipulate url prop
}) {
  const uploadImage = useUploadImage();

  //will show image of what has been captured by camera or url, or empty
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    url
  );

  //is camera active
  const [activeCamera, setActiveCamera] = useState(false);

  //todo handle upload status for user
  const [imageUploadStatus, setImageUploadStatus] = useState<UploadStatus>(
    UploadStatus.IDLE
  );

  const [uploadProgress, setUploadProgress] = useState(10);

  //new image to upload
  const [imageToUpload, setImageToUpload] = useState<File | string>(url);

  const handleUrlChange = useDebouncedCallback(
    (urlText: string | null | ArrayBuffer) => {
      if (typeof urlText != "string") {
        alert("image url is not in text form");
        return;
      }

      setFormImageUrl({
        folder: "testFolder",
        imageId: urlText,
        imageUrl: urlText,
      });
    },
    300
  );

  //ref used to interact with node that is rendered to dom and get its current properties
  //will hold <video> tag reference
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleImageUpload = useDebouncedCallback(async (folder: string) => {
    setImageUploadStatus(UploadStatus.UPLOADING);
    console.log("typeof imageToUpload", typeof imageToUpload);
    console.log("typeof imageToUpload", Boolean(imageToUpload));
    console.log("typeof imageToUpload", imageToUpload);
    if (
      (typeof imageToUpload == "string" && imageToUpload.length > 6) ||
      typeof imageToUpload == "object"
    ) {
      try {
        const response = await uploadImage(imageToUpload, folder);
        // console.log("response from image upload: ", response);
        const imageObj: ImageObjT = {
          imageUrl: response.url,
          imageId: response.public_id,
          folder: response.folder,
        };
        setFormImageUrl(imageObj);
        setImageUploadStatus(UploadStatus.SUCCESS);
        return;
      } catch (error) {
        console.log("error uploading", error);
        setImageUploadStatus(UploadStatus.ERROR);
        //todo set alert of failed upload
        return;
      }
    }
    alert("no image to upload");
  }, 1000);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //check input element for files
    const imageFile = event.target.files && event.target.files[0];

    //turn off camera incase its on
    setActiveCamera(false);

    if (imageFile) {
      const reader = new FileReader();

      setImageToUpload(imageFile);

      //registering callback when event onloadend happens
      reader.onloadend = async () => {
        //event will trigger and reader.result will have data:URL
        setImagePreview(reader.result);
        handleUrlChange(reader.result);
      };

      //read the file data and trigger onloadend event
      reader.readAsDataURL(imageFile);
    }
  };

  const openCamera = async () => {
    setActiveCamera((state) => !state);
    try {
      //get users camera if available
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      //if a ref has a node currently set, give it the camera stream
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const captureFrame = async () => {
    //create a canvas to view camera stream
    const canvas = document.createElement("canvas");

    //if currently holds a reference to <video>
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      //grab current from from canvas
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);

      //grab current view displayed on canvas from camera
      const dataUrl = canvas.toDataURL("image/png");

      const blobData = await fetch(dataUrl).then((res) => res.blob());

      const imageFileFromBlob = new File([blobData], "image.jpg");

      setImageToUpload(imageFileFromBlob);
      //once image is captured set preview and close camera
      setImagePreview(dataUrl);
      setActiveCamera(false);
      handleUrlChange(dataUrl);
    }
  };

  return (
    <div
      key={uuidv4()}
      className="h-[500px]">
      {/* alerts and status */}
      <section className=" flex flex-col items-center h-1/6">
        {imageUploadStatus == UploadStatus.UPLOADING ||
          (true && (
            <div className="">
              <span className="loading loading-spinner text-accent"></span>
              <progress
                className="progress progress-accent w-56"
                value={uploadProgress}
                max="100"></progress>
            </div>
          ))}
        {imageUploadStatus == UploadStatus.SUCCESS ||
          (true && (
            <div
              role="alert"
              className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Your Image was uploaded!</span>
            </div>
          ))}
        {imageUploadStatus == UploadStatus.ERROR ||
          (true && (
            <div
              role="alert"
              className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Error! Upload Failed</span>
            </div>
          ))}
      </section>

      {/* image preview or camera preview */}
      <div className="flex flex-col max-w-[500px] h-5/6">
        {/* camera of image preview */}
        <div className="w-full flex flex-col justify-center items-center h-5/6">
          <div className="h-4/6">
            {imagePreview && !activeCamera ? (
              <section className="w-full flex flex-col  h-full">
                <img
                  className=" h-full"
                  src={imagePreview.toString()}
                  alt="Preview"
                />
              </section>
            ) : null}

            {activeCamera && (
              <section className=" flex flex-col border-solid border-2 border-cyan-400 h-full">
                <div className="w-full h-5/6">
                  <CameraPreview videoRef={videoRef} />
                </div>

                <div
                  className="btn h-1/6"
                  onClick={captureFrame}>
                  capture
                </div>
              </section>
            )}
          </div>
          <section className="flex w-full h-2/6 ">
            <label htmlFor="">
              Image URL
              <textarea
                onChange={(event) => {
                  const text = event.target.value;
                  handleUrlChange(text);
                }}
                wrap="true"
                defaultValue={url}
                cols={30}
                className="textarea textarea-bordered w-full"
                placeholder="URL"></textarea>
            </label>

            {/* <textarea
              onChange={(event) => {
                const text = event.target.value;
                handleUrlChange(text);
              }}
              wrap="true"
              defaultValue={url}
              cols={30}
            /> */}
          </section>
        </div>

        <div className="text-black border-2 border-s-violet-100 h-1/6">
          <h3 className=" bg-gray-700">Edit Tools</h3>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div
            className="btn btn-sm"
            onClick={openCamera}>
            Use camera
          </div>

          <div
            onClick={() => {
              handleImageUpload("testfolder");
            }}
            className="btn btn-sm">
            Manual Upload Image
          </div>
        </div>
      </div>
    </div>
  );
}
