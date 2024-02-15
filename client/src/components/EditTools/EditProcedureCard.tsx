import React, { useState } from "react";
import { ProcedureT } from "../../hooks/useGetLatest";
import { DispatchType } from "../../hooks/useUpdateProcedures";

export default function ProcedureForm({
  proc,
  reducer,
}: {
  proc: ProcedureT;
  reducer: DispatchType;
}) {
  const [imageUrls, setImageUrls] = useState(proc.images);

  const images = imageUrls.map((url, index) => {
    //update image array at index based on map index
    const setUrl = (newUrl: string) => {
      setImageUrls((state) => {
        const newState = [...state];
        newState[index] = newUrl; //update at current index
        return newState;
      });
    };

    return (
      <div>
        <EditImageCard
          url={url}
          setUrl={setUrl}
        />
        <input
          type="file"
          accept="image/*"
        />
      </div>
    );
  });

  return (
    <li>
      <h1 className="text-xl">procedure num is : {proc.procedureNum}</h1>
      <ul className=" flex flex-col justify-center align-middle items-center gap-2 w-full p-4  bg-neutral rounded-box">
        {images}
      </ul>
      <section className="">
        <h3 className="text-lg text-gray">Instructions: </h3>

        <textarea
          className="w-3/4 "
          defaultValue={proc.instructions}
          name=""
          id=""
          cols={30}
          rows={10}></textarea>
      </section>
    </li>
  );
}

function EditImageCard({
  url,
  setUrl,
}: {
  url: string;
  setUrl: (newUrl: string) => void;
}) {
  return (
    <li
      key={url}
      className="w-3/4 bg-green-400">
      <div className="flex flex-col">
        <img
          src={url}
          className="rounded-box "
        />
        <label
          htmlFor=""
          className="">
          <h3>original url</h3>
          <input
            type="text"
            disabled
            value={url}
          />
        </label>
        <label
          htmlFor=""
          className="">
          <h3>Upload new image</h3>
        </label>
      </div>
    </li>
  );
}

// function previewImage(event) {
//   //   const uploadnum = event.target.closest(".uploads").dataset.totalfiles;
//   const currentUpload = event.target.closest(".imageuploaded");
//   const image = currentUpload.querySelector("img");
//   image.src = URL.createObjectURL(event.target.files[0]);
//   image.alt = "image preview";
//   image.classList.add("img-mini");
// }
