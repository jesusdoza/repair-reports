import React, { useState } from "react";
import { ProcedureT } from "../../hooks/useGetLatest";
import { DispatchType, updateProcDispT } from "../../hooks/useUpdateProcedures";
import { EditImageCard } from "./EditImageCard";

export default function EditProcedureForm({
  proc,
  reducer,
  index,
}: {
  proc: ProcedureT;
  reducer: updateProcDispT;
  index: number;
}) {
  //! use reducer and remove this state state will become const and update as necessary
  const [imageUrls, setImageUrls] = useState(proc.images);

  //coarse index to number to be used as reference of updating state array of the proceduresArray
  index = Number(index);

  const imageCards = createEditImageCards(imageUrls, setImageUrls, reducer);

  const handleInstructChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    // console.log("event.target.value", e.target.value);
    reducer({
      type: DispatchType.UPDATE_INTRUC,
      payload: { procIndex: index, instructions: e.target.value },
    });
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
          onChange={handleInstructChange}
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

// function addNewImage(
//   setImageUrls: React.Dispatch<React.SetStateAction<string[]>>
// ) {
//   setImageUrls((state) => [...state, "#"]);

//   return;
// }

//cards for images to be edited
/*
argumetns
imageUrls
setImageUrls
reducer
*/

//! use only the reducer here not set state redundant
function createEditImageCards(
  imageUrls: string[],
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>,
  reducer: updateProcDispT
) {
  //
  const imageCards = imageUrls.map((url, index) => {
    // setting up the function so component doesnt need to know what index it is in array
    //update image array at index based on map index
    const setUrl = (newUrl: string) => {
      setImageUrls((state) => {
        const newState = [...state];
        newState[index] = newUrl; //update at current index

        reducer({
          type: DispatchType.UPDATE_IMAGES,
          payload: { imagesUrls: newState, procIndex: index },
        });

        //update global state
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
