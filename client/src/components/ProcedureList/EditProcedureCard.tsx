import React, { useEffect, useContext, useState } from "react";
// import {
//   DispatchType,
//   updateProcDispT,
// } from "../../hooks/useProceduresListState";
import { EditImageCard } from "../ImageCard/EditImageCard";
import { v4 as uuidv4 } from "uuid";
import { ProcedureT, RepairFormDispatchType } from "../../../types";
import { RepairFormContext } from "../../context/RepairFormContext";

export default function EditProcedureCard({
  proc,
  index,
}: {
  proc: ProcedureT;
  index: number;
}) {
  //index to number to be used as reference of updating state array of the proceduresArray
  const PROCEDURE_INDEX = Number(index);

  const [images, setImages] = useState(proc.images);
  const [instructions, setInstructions] = useState(proc.instructions);

  const { formDispatch } = useContext(RepairFormContext);
  // useEffect(() => {
  //   reducer({
  //     type: DispatchType.CHANG_IMAGE_LIST,
  //     payload: { procIndex: index, newImageOrder: images },
  //   });
  // }, [images]);

  // console.log("proc", proc);
  // const imageCards = createEditImageCards({
  //   imageUrls: proc.images,
  //   reducer: reducer,
  //   procIndex: PROCEDURE_INDEX,
  // });

  const imageCards = createEditImageCards({
    imageUrls: images,
    reducer: () => {},
    procIndex: PROCEDURE_INDEX,
  });

  return (
    <div className="bg-blue-900 p-3 card">
      <section className=" h-full">
        <section className=" h-1/2">
          <h1 className="text-xl">procedure num is : {proc.procedureNum}</h1>
          <ul className=" w-full flex flex-wrap justify-center align-middle items-center gap-2 p-4  bg-neutral rounded-box">
            {imageCards}
          </ul>
        </section>
        {/* add another image to this list of images and use placeholder url in meantime */}
        <section className=" h-1/2">
          <div>
            <span>upload another image</span>
            <div
              onClick={() => {
                setImages((state) => {
                  //! update context state
                  return [...state, "#empty"];
                });
              }}
              className="text-xl btn btn-active btn-accent hover:bg-green-300">
              +
            </div>
          </div>
        </section>
      </section>

      {/* INSTRUCTIONS */}
      <section className="flex flex-col">
        <label
          htmlFor="instructions"
          className="text-lg text-gray">
          Instructions:
        </label>
        <textarea
          onChange={(e) => {
            e.preventDefault();
            console.log("e", e);
            formDispatch({
              type: "UPDATE_INTRUC",
              payload: { procIndex: index, instructions: e.target.value },
            });
            // setInstructions(() => {
            //   return e.target.value;
            // });
          }}
          className="w-3/4 m-auto"
          defaultValue={instructions}
          name=""
          id="instructions"
          cols={30}
          rows={10}></textarea>
        {/* <div
          className="btn"
          onClick={() => {
            handleInstructChange(instructions, reducer, PROCEDURE_INDEX);
          }}>
          update
        </div> */}
      </section>
    </div>
  );
}

// function addNewImage(
//   setImageUrls: React.Dispatch<React.SetStateAction<string[]>>
// ) {
//   setImageUrls((state) => [...state, "#"]);

//   return;
// }

function createEditImageCards({
  procIndex,
  reducer,
  imageUrls,
}: {
  imageUrls: string[];
  procIndex: number;
  reducer: updateProcDispT;
}) {
  //

  const imageCards = imageUrls.map((url, index) => {
    // setting up the function so component doesnt need to know what index it is in array
    // console.log("url", url);
    const updateUrl = (newUrl: string) => {
      //update image array at index based on map index
      reducer({
        type: DispatchType.UPDATE_IMAGE,
        payload: {
          newImageUrl: newUrl,
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
          url={url}
          setFormImageUrl={updateUrl}
        />
      </li>
    );
  });

  return imageCards;
}

function handleInstructChange(
  e: string,
  reducer: updateProcDispT,
  procIndex: number
) {
  // console.log("event.target.value", e.target.value);
  reducer({
    type: DispatchType.UPDATE_INTRUC,
    payload: { procIndex: procIndex, instructions: e },
  });
}
