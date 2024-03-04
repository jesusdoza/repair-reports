import React, { useEffect, useState } from "react";
import { ProcedureT } from "../../hooks/useGetLatest";

import { EditImageCard } from "./EditImageCard";
import { v4 as uuidv4 } from "uuid";
import { useDebouncedCallback } from "use-debounce";

export default function EditProcedureCard({
  proc,
  // formDispatch,
  index,
}: {
  proc: ProcedureT;
  // formDispatch: React.Dispatch<{
  //   type: RepairDispatchTypeT;
  //   payload: ChangeFormPayloadT;
  // }>;
  index: number;
}) {
  //index to number to be used as reference of updating state array of the proceduresArray
  const PROCEDURE_INDEX = Number(index);

  const imageCards = createEditImageCards({
    imageUrls: proc.images,
    procIndex: PROCEDURE_INDEX,
  });

  // const handleInstructChange = useDebouncedCallback(updateIntructions, 500);

  return (
    <div className="bg-blue-900 p-3 card">
      <section>
        <h1 className="text-xl">procedure num is : {proc.procedureNum}</h1>
        <ul className=" w-full flex flex-wrap justify-center align-middle items-center gap-2 p-4  bg-neutral rounded-box">
          {imageCards}
        </ul>
        {/* add another image to this list of images and use placeholder url in meantime */}
        <section>
          <div>
            <span>Add another image</span>
            <div
              // onClick={() => {
              //   formDispatch({
              //     type: RepairDispatchTypeT.CHANG_IMAGE_LIST,
              //     payload: {
              //       procIndex: index,
              //       newImageOrder: [...proc.images, "#empty"],
              //     },
              //   });
              // }}
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
            // handleInstructChange(e.target.value, formDispatch, PROCEDURE_INDEX);
          }}
          className="w-3/4 "
          defaultValue={proc.instructions}
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
}: {
  imageUrls: string[];
  procIndex: number;
}) {
  const imageCards = imageUrls.map((url, index) => {
    // high order function to update url
    // const updateUrl = (newUrl: string) => {
    //   reducer({
    //     type: RepairDispatchTypeT.UPDATE_IMAGE,
    //     payload: {
    //       newImageUrl: newUrl,
    //       procIndex: procIndex,
    //       newImageIndex: index,
    //     },
    //   });
    // };

    return (
      <li
        className="w-1/3 card bg-slate-700 p-2"
        key={uuidv4()}>
        <EditImageCard
          url={url}
          setUrl={() => {}}
        />
      </li>
    );
  });

  return imageCards;
}

function updateIntructions(
  text: string,
  reducer: updateProcDispT,
  procIndex: number
) {
  text;
  // console.log("event.target.value", e.target.value);
  reducer({
    type: RepairDispatchTypeT.UPDATE_INTRUC,
    payload: { procIndex: procIndex, instructions: text },
  });
}
