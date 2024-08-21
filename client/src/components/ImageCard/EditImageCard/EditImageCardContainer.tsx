import React, { useState, useRef, useEffect, useContext } from "react";
// import useUploadImage from "../../hooks/useUploadImage";
import { ImageObjT } from "../../../../types";
import { useDebouncedCallback } from "use-debounce";

import useImageManager from "../../../hooks/useImageManager";
import { ImageObj } from "../../../classes/ImageObj";

import useCreateThumbUrl from "../../../hooks/useCreateThumbUrl";
import { RepairFormDataContext } from "../../../context/RepairFormContext";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";

import EditImageCard from "./EditImageCard";

enum UploadStatus {
  SUCCESS = "SUCCESS",
  UPLOADING = "UPLOADING",
  ERROR = "ERROR",
  IDLE = "IDLE",
  DELETING = "DELETING",
}

export default function EditImageCardContainer({
  url = "",
  onRemove,
  imageData,
  procedureId,
}: {
  procedureId: string;
  id: string;
  url: string;
  onRemove?: () => void;
  imageData: ImageObj;
}) {
  //hook for handling image database
  const { uploadImage, deleteImage } = useImageManager();
  const { formAction } = useContext(RepairFormDataContext);

  //create thumb url from regular url using cloudinary url specification
  const createThumbUrl = useCreateThumbUrl();

  //is image deleteable from cloudinary by checking url
  const [isDeletable, setIsDeletable] = useState(url.includes("http"));

  //is image uploadable by checking image url to include buffer prefix
  const [isUploadable, setIsUploadable] = useState(url.includes("data:"));

  //will hold <video> tag reference in dom to show video stream
  const videoRef = useRef<HTMLVideoElement | null>(null);

  //camera stream
  const mediaStreamRef = useRef<MediaStream | null>(null);

  //is camera active
  const [activeCamera, setActiveCamera] = useState(false);

  //image has been uploaded and have imageObj or null
  //after image is uploaded store details
  //!maybe just update upload status state and handle if upload happend that way
  const [imageUploadedObj, setImageUploadedObj] = useState<null | ImageObjT>(
    imageData
  );

  //show status of image action
  const [imageUploadStatus, setImageUploadStatus] = useState<UploadStatus>(
    isDeletable ? UploadStatus.SUCCESS : UploadStatus.IDLE
  );

  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  //number to track percentage of image action progress
  const [uploadProgress, setUploadProgress] = useState(10);

  //new image to upload stored locally
  //! maybe have a single state to keep image data and update upload status state to keep track of uploaded event
  //! instead of storing 2 different states
  const [imageToUpload, setImageToUpload] = useState<File | string>(url);

  //image preview of file selected or image captured from camera
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    url
  );

  //close camera tracks and turn off video stream on dismount
  useEffect(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
      videoRef.current = null;
    }

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        videoRef.current = null;
      }
    };
  }, []);

  const handleUrlChange = useDebouncedCallback(
    (urlText: string | null | ArrayBuffer) => {
      if (typeof urlText != "string") {
        alert("image url is not in text form");
        return;
      }

      console.log("url change");

      formAction.updateImage({ ...imageData, imageUrl: urlText }, procedureId);

      //url changed of image either manually or file changed
      //todo have folder be added according to user organization in authcontext
      // setFormImageObj({
      //   folder: "testFolder",
      //   imageId: imageUploadedObj ? imageUploadedObj.imageId : urlText,
      //   imageUrl: urlText,
      // });
    },
    300
  );

  const handleImageUpload = useDebouncedCallback(async (folder: string) => {
    setImageUploadStatus(UploadStatus.UPLOADING);
    setUploadProgress(30);

    if (
      (typeof imageToUpload == "string" && imageToUpload.length > 6) ||
      typeof imageToUpload == "object"
    ) {
      setUploadProgress(50);
      try {
        const response = await uploadImage(imageToUpload, folder);

        // console.log("response image", response);
        if (!response) {
          console.log("no response from axios");
          return;
        }

        const {
          url,
          public_id,
          folder: uploadFolder,
        }: { url: string; public_id: string; folder: string } = response.data;
        console.log("response", response);

        //todo get thumbnail url
        const thumbUrl = createThumbUrl(url);
        console.log("thumbUrl", thumbUrl);

        const imageObj: ImageObjT = {
          _id: imageData._id,
          imageUrl: url,
          imageId: public_id,
          folder: uploadFolder,
          imageThumb: thumbUrl,
        };

        //update form data in context
        formAction.updateImage(new ImageObj(imageObj), procedureId);

        setUploadProgress(70);
        // setFormImageObj(imageObj);
        setImageUploadedObj(imageObj);
        setUploadProgress(100);
        setImageUploadStatus(UploadStatus.SUCCESS);
        setIsUploadable(false);
        setIsDeletable(true);
        return;
      } catch (error) {
        console.log("error uploading", error);
        setImageUploadStatus(UploadStatus.ERROR);
        setErrorMessage((state) => {
          return [...state, "error uploading"];
        });
        return;
      }
    }

    alert("no image to upload");
  }, 1000);

  //handle delete of image from database and state
  const handleImageDelete = async () => {
    // if image has been uploaded delete from database
    // console.log("delete image");
    // console.log("isDeletable", isDeletable);

    //delete from database
    if (isDeletable && imageUploadedObj) {
      try {
        const deleteResponse = await deleteImage({
          imageId: imageUploadedObj.imageId,
        });
        console.log("deleteResponse", deleteResponse);
        setImageUploadedObj(null);

        if (onRemove) onRemove();
      } catch (error) {
        // reset image obj and do not remove from dom
        alert("failed to delete image");

        // setImageUploadedObj(imageUploadedObj);
        return;
      }
      // remove from form context only
    } else {
      formAction.removeImage(imageData._id, procedureId);
      if (onRemove) onRemove();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    //check input element for files
    const imageFile = event.target.files && event.target.files[0];

    //turn off camera incase its on
    setActiveCamera(false);

    //if image can be removed from database
    if (isDeletable && imageUploadedObj) {
      try {
        const deleteResponse = await deleteImage({
          imageId: imageUploadedObj.imageId,
        });

        console.log("changed image delete response", deleteResponse);
      } catch (error) {
        console.log("failed to delete image to replace");
      }
    }

    //image available
    if (imageFile) {
      const reader = new FileReader();

      setImageToUpload(imageFile);

      //registering callback when event onloadend happens
      reader.onloadend = async () => {
        //event will trigger and reader.result will have data:URL
        setImagePreview(reader.result);

        handleUrlChange(reader.result);

        //reset state to not uploaded yet state
        setImageUploadedObj(null);
      };

      //read the file data and trigger onloadend event
      reader.readAsDataURL(imageFile);
      setIsUploadable(true);
    }
  };

  const toggleCamera = async () => {
    if (activeCamera) {
      setActiveCamera(false);

      //if camera running turn off
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        videoRef.current = null;
      }

      return;
    }

    setActiveCamera(true);
    try {
      //get users camera if available
      const userMedia = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      mediaStreamRef.current = userMedia;

      //if a ref has a node currently set, give it the camera stream
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStreamRef.current;
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

      //stop the strea
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        videoRef.current = null;
      }

      setImageToUpload(imageFileFromBlob);

      //once image is captured set preview and close camera
      setImagePreview(dataUrl);
      setActiveCamera(false);
      handleUrlChange(dataUrl);
      setImageUploadedObj(null);
    }
  };

  return (
    <ErrorBoundary componentName="EditImagecard">
      <EditImageCard
        onUpload={() => {
          handleImageUpload("cata");
        }}
        onFileChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleFileChange(event);
        }}
        uploadStatus={imageUploadStatus}
        uploadProgress={uploadProgress}
        onRemove={handleImageDelete}
        uploadAllowed={isUploadable}
        isCameraActive={activeCamera}
        onToggleCamera={toggleCamera}
        onCapture={captureFrame}
        url={String(imagePreview)}
        videoRef={videoRef}
        errorMessages={errorMessage}
      />
    </ErrorBoundary>
  );
}
