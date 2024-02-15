import React, { useState } from "react";
import { ProcedureT } from "../../hooks/useGetLatest";
import { DispatchType } from "../../hooks/useUpdateProcedures";
import { EditImageCard } from "./EditImageCard";

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
