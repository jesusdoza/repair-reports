import React, { useEffect, useState, useRef } from "react";

export function EditImageCard({
  url,
  setUrl,
}: {
  url: string;
  setUrl: (newUrl: string) => void; //external state setter to manipulate url prop
}) {
  //will show image of what has been captured by camera or url, or empty
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    url
  );

  const [activeCamera, setActiveCamera] = useState(false);

  const [imageToUpload, setImageToUpload] = useState<File | null>(null);

  useEffect(() => {
    console.log("imageToUpload", imageToUpload);
  }, [imageToUpload]);

  //ref used to interact with node that is rendered to dom and get its current properties
  //will hold <video> tag reference
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //check input element for files
    const file = event.target.files && event.target.files[0];

    //turn off camera incase its on
    setActiveCamera(false);

    if (file) {
      const reader = new FileReader();

      //registering callback when event onloadend happens
      reader.onloadend = async () => {
        //event will trigger and reader.result will have data:URL
        setImagePreview(reader.result);
      };

      //read the file data
      reader.readAsDataURL(file);

      //set file data to upload
      setImageToUpload(file);
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

  const captureFrame = () => {
    //create a canvas to view camera stream
    const canvas = document.createElement("canvas");

    //if currently holds a reference to <video>
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);

      //grab current view displayed on canvas from camera
      const dataUrl = canvas.toDataURL("image/png");
      canvas.toBlob;

      //once image is captured set preview and close camera
      setImagePreview(dataUrl);
      setActiveCamera(false);
    }
  };

  return (
    <div
      key={url}
      className=" bg-green-100">
      <div className="flex flex-col  max-w-[500px] ">
        <div className=" h-[500px] w-full flex justify-center items-center ">
          {imagePreview && !activeCamera ? (
            <img
              className="w-full "
              src={imagePreview.toString()}
              alt="Preview"
            />
          ) : null}

          {activeCamera && (
            <section className=" flex flex-col border-solid h-full border-emerald-600 border-8 ">
              <div className="h-3/4">
                <CameraPreview videoRef={videoRef} />
              </div>

              <div
                className="btn h-1/4"
                onClick={captureFrame}>
                capture
              </div>
            </section>
          )}
        </div>

        <label
          htmlFor=""
          className="text-black border-2 border-s-violet-100">
          <h3 className=" bg-gray-700">Edit Tools</h3>

          <div
            className="btn"
            onClick={openCamera}>
            Use camera
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </label>
      </div>
    </div>
  );
}

function CameraPreview({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
}) {
  return (
    <video
      className="h-full w-full"
      ref={videoRef}
      style={{ display: "block", maxWidth: "100%" }}
      autoPlay
    />
  );
}
