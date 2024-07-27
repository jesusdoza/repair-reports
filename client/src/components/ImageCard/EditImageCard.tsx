import React, { useState, useRef, useEffect, useContext } from "react";
// import useUploadImage from "../../hooks/useUploadImage";
import { ImageObjT } from "../../../types";
import { useDebouncedCallback } from "use-debounce";
import { v4 as uuidv4 } from "uuid";
import useImageManager from "../../hooks/useImageManager";
import { ImageObj } from "../../classes/ImageObj";
import StatusBar from "./UploadStatusBar";
import useCreateThumbUrl from "../../hooks/useCreateThumbUrl";
import { RepairFormDataContext } from "../../context/RepairFormContext";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { ImageCard } from "./ImagePreviewCard";

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
          handleImageUpload("testfolder");
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

//todo extract view from the logic
type EditImageCardPropsT = {
  imageId?: string;
  url: string;
  onRemove?: () => void;
  errorMessages?: string[];
  uploadStatus?: UploadStatus;
  uploadProgress?: number;
  isCameraActive: boolean;
  uploadAllowed: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  onCapture: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleCamera: () => void;
  onUpload: () => void;
};

function EditImageCard({
  imageId = "",
  url,
  uploadStatus,
  errorMessages,
  onRemove,
  uploadProgress,
  isCameraActive: activeCamera,
  videoRef,
  onFileChange,
  uploadAllowed,
  onUpload,
}: EditImageCardPropsT) {
  useEffect(() => {}, [videoRef]);

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

            {/* {activeCamera && (
              <CaptureCamera
                onCameraSelect={() => {}}
                cameras={cameras}
                onCapture={onCapture}
                videoRef={videoRef}
              />
            )} */}
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
              accept="image/*"
              capture
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

// type CaptureCameraPropsT = {
//   videoRef: React.RefObject<HTMLVideoElement>;
//   onCapture: () => void;
//   cameras: MediaDeviceInfo[];
//   onCameraSelect: (id: string) => void;
// };
// function CaptureCamera({
//   onCapture,
//   videoRef,
//   cameras,
//   onCameraSelect,
// }: CaptureCameraPropsT) {
//   function handleSelectCam(id: string) {
//     if (onCameraSelect) {
//       onCameraSelect(id);
//     }
//   }

//   return (
//     <section className=" flex flex-col border-solid border-2 border-cyan-400 h-full">
//       <div className="w-full h-5/6">
//         <CameraPreview videoRef={videoRef} />
//       </div>
//       <label htmlFor="">
//         input file
//         <input
//           type="file"
//           accept="image/"
//         />
//       </label>
//       <div
//         className="btn h-1/6"
//         onClick={onCapture}>
//         capture
//       </div>
//       <div>
//         {cameras.map((cam) => {
//           return (
//             <li>
//               <div
//                 onClick={() => handleSelectCam(cam.deviceId)}
//                 className="btn btn-xs">
//                 dfa
//               </div>
//             </li>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// //************** UTILITYS  ***************/

// async function getCameras({
//   setCameras,
// }: {
//   setCameras: React.Dispatch<React.SetStateAction<MediaDeviceInfo[]>>;
// }) {
//   try {
//     await navigator.mediaDevices.getUserMedia({ video: true }); //ask for access

//     const devices = await navigator.mediaDevices.enumerateDevices();

//     const videoDevs = devices.filter((device) => device.kind === "videoinput");

//     setCameras(videoDevs);
//   } catch (error) {
//     console.log("error getting cameras", error);
//   }
// }
