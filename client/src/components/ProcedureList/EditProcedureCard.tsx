import { useState } from "react";
// import { RepairFormContext } from "../../context/RepairFormContext";

import { EditImageCard } from "../ImageCard/EditImageCard";
import { v4 as uuidv4 } from "uuid";
// import { useDebouncedCallback } from "use-debounce";
import { ImageObjT, ProcedureT } from "../../../types";
import { ImageObj } from "../../classes/ImageObj";
// import { Procedure } from "../../classes/Procedure";
// import useImageManager from "../../hooks/useImageManager";
import ModalConfirm from "../Modals/ModalConfirm";
import { Procedure } from "../../classes/Procedure";

export default function EditProcedureCard({
  procedureData = new Procedure(),
  id = uuidv4(),
}: {
  procedureData: ProcedureT;
  id?: string;
}) {
  //index to number to be used as reference of updating state array of the proceduresArray
  const PROCEDURE_ID = procedureData._id;

  const [instructions, setInstructions] = useState(procedureData.instructions);
  const { imageObjs } = procedureData;

  return (
    <div className="p-3 card relative border border-solid border-slate-700">
      {/* delete procedure button */}

      <ModalConfirm label="Remove procedure">
        <section>
          <span>Confirm: </span>
        </section>

        <section className="flex justify-center">
          <div
            onClick={() => {
              // handleRemoveProcedure();
            }}
            className="btn bg-yellow-600 hover:bg-red-600 hover:scale-125 w-40 text-black">
            Remove procedure
          </div>
        </section>
      </ModalConfirm>

      {/* edit image cards */}
      <section>
        <h1 className="text-xl">procedure num is </h1>
        <h1 className="text-xl">procedure ID is : {PROCEDURE_ID}</h1>
        <ul className=" w-full flex flex-wrap justify-center align-middle items-center gap-2 p-4  bg-neutral rounded-box">
          {/* {imageCards} */}
          <section>
            <div>
              <span>Add another image</span>
              <div
                onClick={() => {
                  // procedureActions.addImage();
                }}
                className="text-xl btn btn-active btn-accent hover:bg-green-300">
                +
              </div>
            </div>
          </section>
        </ul>
      </section>

      {/* INSTRUCTIONS */}
      <section className=" w-full flex flex-col items-center">
        <h3 className="text-lg text-gray">Instructions: </h3>
        <textarea
          onChange={(e) => {
            e.preventDefault();
            // handleInstructionsUpdate(e.target.value);
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
// export default function EditProcedureCard({
//   procedureData = new Procedure(),
//   id = uuidv4(),
//   procedureActions,
// }: {
//   procedureData: ProcedureT;
//   id: string;
//   procedureActions?: {
//     instructions: (text: string) => void;
//     addImage: () => void;
//     editImage: (imageIndex: number, updatedImageObj: ImageObj) => void;
//     removeImage: (imageId: string) => void;
//     removeProcedure: () => void;
//   };
// }) {
//   //index to number to be used as reference of updating state array of the proceduresArray
//   const PROCEDURE_INDEX = Number(id);
//   const PROCEDURE_ID = procedureData._id;

//   const { deleteImage } = useImageManager();

//   // const { formDispatch } = useContext(RepairFormContext);

//   const [instructions, setInstructions] = useState(procedureData.instructions);
//   const { imageObjs } = procedureData;

//   const imageCards = createEditImageCards({
//     imageObjs: imageObjs,
//     updateUrl: procedureActions.editImage,
//     onRemove: procedureActions.removeImage,
//   });

//   const handleInstructionsUpdate = useDebouncedCallback((text: string) => {
//     procedureActions.instructions(text);
//   }, 0);

//   const handleRemoveProcedure = async () => {
//     //remove images if needed
//     if (procedureData.imageObjs && procedureData.imageObjs.length > 0) {
//       console.log("procedureData", procedureData.imageObjs);

//       try {
//         const imagesDataArr = procedureData.imageObjs;
//         const promises = imagesDataArr.map((data) => {
//           console.log("removing id: ", data.imageId);

//           return deleteImage({ imageId: data.imageId });
//         });

//         await Promise.allSettled(promises);
//       } catch (error) {
//         console.log("error deleting multiple images", error);
//       }
//     }

//     //remove actual procedure component
//     procedureActions.removeProcedure();
//   };

//   return (
//     <div className="p-3 card relative border border-solid border-slate-700">
//       {/* delete procedure button */}

//       <ModalConfirm label="Remove procedure">
//         <section>
//           <span>Confirm: </span>
//         </section>

//         <section className="flex justify-center">
//           <div
//             onClick={() => {
//               handleRemoveProcedure();
//             }}
//             className="btn bg-yellow-600 hover:bg-red-600 hover:scale-125 w-40 text-black">
//             Remove procedure
//           </div>
//         </section>
//       </ModalConfirm>

//       {/* edit image cards */}
//       <section>
//         <h1 className="text-xl">procedure num is : {PROCEDURE_INDEX}</h1>
//         <h1 className="text-xl">procedure ID is : {PROCEDURE_ID}</h1>
//         <ul className=" w-full flex flex-wrap justify-center align-middle items-center gap-2 p-4  bg-neutral rounded-box">
//           {imageCards}
//           <section>
//             <div>
//               <span>Add another image</span>
//               <div
//                 onClick={() => {
//                   procedureActions.addImage();
//                 }}
//                 className="text-xl btn btn-active btn-accent hover:bg-green-300">
//                 +
//               </div>
//             </div>
//           </section>
//         </ul>
//       </section>

//       {/* INSTRUCTIONS */}
//       <section className=" w-full flex flex-col items-center">
//         <h3 className="text-lg text-gray">Instructions: </h3>
//         <textarea
//           onChange={(e) => {
//             e.preventDefault();
//             handleInstructionsUpdate(e.target.value);
//             setInstructions(e.target.value);
//           }}
//           className="w-3/4 "
//           value={instructions}
//           name=""
//           id=""
//           cols={30}
//           rows={10}></textarea>
//       </section>
//     </div>
//   );
// }

//create image card components
function createEditImageCards({
  updateUrl = () => {},
  imageObjs,
  onRemove = () => {},
}: {
  imageObjs: ImageObj[];
  updateUrl: (imageIndex: number, newImageObj: ImageObj) => void;
  onRemove?: (imageId: string) => void;
}) {
  const imageCardComponents = imageObjs.map((imageObj, index) => {
    const { imageUrl, imageId } = imageObj;
    // high order function to update url
    const updateImageUrl = (updatedImageObj: ImageObjT) => {
      updateUrl(index, { ...new ImageObj(), ...updatedImageObj });
    };

    const removeImageFromList = () => {
      if (onRemove) onRemove(imageId);
    };

    return (
      <li
        className="w-full card md:w-1/3 bg-slate-700 p-2"
        key={uuidv4()}>
        <EditImageCard
          imageData={imageObj}
          id={imageId}
          onRemove={removeImageFromList}
          key={uuidv4()}
          url={imageUrl}
          setFormImageObj={updateImageUrl}
        />
      </li>
    );
  });

  return imageCardComponents;
}
