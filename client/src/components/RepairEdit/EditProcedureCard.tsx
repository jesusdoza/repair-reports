import React, { Dispatch, useState } from "react";
import { ProcedureT } from "../../hooks/useGetLatest";
import { DispatchType } from "../../hooks/useUpdateProcedures";
import { EditImageCard } from "./EditImageCard";

export default function ProcedureForm({
  proc,
  reducer,
}: {
  proc: ProcedureT;
  reducer: Dispatch<{ type: DispatchType; payload: object }>;
}) {
  //
  const [imageUrls, setImageUrls] = useState(proc.images);

  //
  const imageCards = createEditImageCards(imageUrls, setImageUrls);

  return (
    <li>
      <h1 className="text-xl">procedure num is : {proc.procedureNum}</h1>
      <ul className=" flex flex-col justify-center align-middle items-center gap-2 w-full p-4  bg-neutral rounded-box">
        {imageCards}
      </ul>
      <section>
        <div
          onClick={() => addNewImage(setImageUrls)}
          className="btn">
          add new image
        </div>
      </section>
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

function addNewImage(
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>
) {
  setImageUrls((state) => [...state, "#"]);

  return;
}

function createEditImageCards(
  imageUrls: string[],
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>
) {
  const imageCards = imageUrls.map((url, index) => {
    //update image array at index based on map index
    const setUrl = (newUrl: string) => {
      setImageUrls((state) => {
        const newState = [...state];
        newState[index] = newUrl; //update at current index
        return newState;
      });
    };

    return (
      <li key={url}>
        <EditImageCard
          url={url}
          setUrl={setUrl}
        />
      </li>
    );
  });

  return imageCards;
}
