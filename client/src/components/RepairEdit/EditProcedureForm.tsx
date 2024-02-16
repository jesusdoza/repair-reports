import React, { Dispatch, useState } from "react";
import { ProcedureT } from "../../hooks/useGetLatest";
import { updateProcDispT } from "../../hooks/useUpdateProcedures";
import { EditImageCard } from "./EditImageCard";

export default function EditProcedureForm({
  proc,
  reducer,
}: {
  proc: ProcedureT;
  reducer: updateProcDispT;
}) {
  //
  const [imageUrls, setImageUrls] = useState(proc.images);

  //
  const imageCards = createEditImageCards(imageUrls, setImageUrls);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    console.log("event.target.value", e.target.value);
  };

  return (
    <li>
      <section>
        <h1 className="text-xl">procedure num is : {proc.procedureNum}</h1>
        <ul className=" flex flex-col justify-center align-middle items-center gap-2 w-full p-4  bg-neutral rounded-box">
          {imageCards}
        </ul>
        {/* add another image to this list of images and use placeholder url in meantime */}
        <section>
          <div>
            <span>upload another image</span>
            <input
              type="file"
              accept="image/*"
              id="newImage"
            />
          </div>
        </section>
      </section>

      {/* INSTRUCTIONS */}
      <section className="">
        <h3 className="text-lg text-gray">Instructions: </h3>
        <textarea
          onChange={handleChange}
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
