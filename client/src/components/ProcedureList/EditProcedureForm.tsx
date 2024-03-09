import React, { useContext, useState } from "react";
import { RepairFormContext } from "../../context/RepairFormContext";

import { EditImageCard } from "../ImageCard/EditImageCard";
import { v4 as uuidv4 } from "uuid";
import { useDebouncedCallback } from "use-debounce";
import { ImageObjT, ProcedureT, RepairFormDispatchT } from "../../../types";

export default function EditProcedureCard({
  proc,
  index,
  updateProcedure,
}: {
  proc: ProcedureT;
  index: number;
  updateProcedure: (text: string) => void;
}) {
  //index to number to be used as reference of updating state array of the proceduresArray
  const PROCEDURE_INDEX = Number(index);

  const { formDispatch } = useContext(RepairFormContext);

  const [instructions, setInstructions] = useState(proc.instructions);
  const imageCards = createEditImageCards({
    imageUrls: proc.images,
    procIndex: PROCEDURE_INDEX,
    dispatch: formDispatch,
  });

  const handleInstructionsUpdate = useDebouncedCallback((text: string) => {
    updateProcedure(text);
  }, 0);

  return (
    <div className="bg-blue-900 p-3 card">
      <section>
        <h1 className="text-xl">procedure num is : {PROCEDURE_INDEX}</h1>
        <ul className=" w-full flex flex-wrap justify-center align-middle items-center gap-2 p-4  bg-neutral rounded-box">
          {imageCards}
        </ul>
        {/* add another image to this list of images and use placeholder url in meantime */}
        <section>
          <div>
            <span>Add another image</span>
            <div
              onClick={() => {
                formDispatch({
                  type: "ADD_IMAGE",
                  payload: {
                    procIndex: index,
                    // newImageOrder: [...proc.images, "#empty"],
                  },
                });
              }}
              className="text-xl btn btn-active btn-accent hover:bg-green-300">
              +
            </div>
          </div>
        </section>
      </section>

      {/* INSTRUCTIONS */}
      <section className="">
        <h3 className="text-lg text-gray">Instructions: </h3>
        <textarea
          onChange={(e) => {
            e.preventDefault();
            console.log("e.target.value", e.target.value);
            handleInstructionsUpdate(e.target.value);
            setInstructions(e.target.value);
          }}
          className="w-3/4 "
          value={instructions}
          name=""
          id=""
          cols={30}
          rows={10}></textarea>
      </section>
    </div>
  );
}

function createEditImageCards({
  procIndex,
  imageUrls,
  dispatch,
}: {
  imageUrls: string[];
  procIndex: number;
  dispatch: RepairFormDispatchT;
}) {
  const imageCards = imageUrls.map((url, index) => {
    // high order function to update url
    const updateImageUrl = ({ imageUrl, imageId, folder }: ImageObjT) => {
      // console.log("imageUrl", imageUrl);

      dispatch({
        type: "UPDATE_IMAGES",
        payload: {
          newImageUrl: imageUrl,
          newImageObj: { imageUrl, imageId, folder },
          procIndex: procIndex,
          newImageIndex: index,
        },
      });
    };

    return (
      <li
        className="w-1/3 card bg-slate-700 p-2"
        key={uuidv4()}>
        <EditImageCard
          key={uuidv4()}
          url={url}
          setFormImageUrl={updateImageUrl}
        />
      </li>
    );
  });

  return imageCards;
}
