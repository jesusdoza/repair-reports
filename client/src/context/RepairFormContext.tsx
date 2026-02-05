// import { createContext, useState } from "react";
// import { Repair } from "../classes/Repair";
// import { addItem } from "../hooks/utils/addItem";
// import { Procedure } from "../classes/Procedure";
// import { RepairImage } from "../classes/RepairImage";

// export type formActionT = {
//   addProcedureAfter: (id: string, item: Procedure) => void;
//   addProcedureAtBegining: (item: Procedure) => void;
//   removeProcedure: (id: string) => void;
//   updateInstructions: (id: string, text: string) => void;
//   updateTitle: (title: string) => void;
//   updateEngineMake: (title: string) => void;
//   updateGroup: (title: string) => void;
//   updateBoardType: (title: string) => void;
//   addImage: (item: RepairImage, procedureId: string) => void;
//   updateImage: (item: RepairImage, procedureId: string) => void;
//   removeImage: (imageId: string, procedureId: string) => void;
//   replaceImageObjs: (list: RepairImage[], procedureId: string) => void;
// };

// export type RepairFormDataContextT = {
//   repairFormData: Repair;
//   initializeRepairFormData: (repair: Repair) => void;
//   formAction: {
//     addProcedureAfter: (id: string, item: Procedure) => void;
//     removeProcedure: (id: string) => void;
//     addProcedureAtBegining: (item: Procedure) => void;
//     updateInstructions: (id: string, text: string) => void;
//     updateTitle: (title: string) => void;
//     updateEngineMake: (title: string) => void;
//     updateGroup: (title: string) => void;
//     updateBoardType: (title: string) => void;
//     addImage: (item: RepairImage, procedureId: string) => void;
//     updateImage: (item: RepairImage, procedureId: string) => void;
//     removeImage: (imageId: string, procedureId: string) => void;
//     replaceImageObjs: (list: RepairImage[], procedureId: string) => void;
//   };
// };

// // const repairForm = new Repair();

// export const RepairFormDataContext = createContext<RepairFormDataContextT>({
//   repairFormData: new Repair(),
//   initializeRepairFormData: () => {},
//   formAction: {
//     addProcedureAfter: () => {},
//     removeProcedure: () => {},
//     addProcedureAtBegining: () => {},
//     updateInstructions: () => {},
//     updateTitle: () => {},
//     updateEngineMake: () => {},
//     updateGroup: () => {},
//     updateBoardType: () => {},
//     addImage: () => {},
//     updateImage: () => {},
//     removeImage: () => {},
//     replaceImageObjs: () => {},
//   },
// });

// //Provider
// export const RepairContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const repairForm = new Repair();
//   const [repairFormData, setRepairFormData] = useState(repairForm);
//   // const [repairFormData, setRepairFormData] = useState(repairForm);

//   function updateTitle(title: string) {
//     setRepairFormData((state) => {
//       state.title = title;
//       return state;
//     });
//   }
//   /// add to beggining of procedure array
//   function addProcedureAtBegining(item: Procedure) {
//     //update procedures
//     const newArr = addItem({
//       pos: "begining",
//       arr: repairFormData.procedures,
//       item,
//     });

//     setRepairFormData((state) => {
//       state.procedures = newArr;

//       return state;
//     });
//   }

//   function removeProcedure(id: string) {
//     //update procedures
//     setRepairFormData((state) => {
//       state.procedures = state.procedures.filter((proc) => proc._id != id);
//       return state;
//     });
//   }

//   ///update insturctions
//   function updateInstructions(id: string, text: string) {
//     setRepairFormData((state) => {
//       const newArr = state.procedures.map((proc) => {
//         if (proc._id == id) {
//           proc.instructions = text;
//           return proc;
//         }
//         return proc;
//       });
//       state.procedures = newArr;
//       return state;
//     });
//   }

//   ///add procedure after the id provided
//   function addProcedureAfter(id: string, item: Procedure) {
//     if (repairFormData.procedures.length < 2) {
//       setRepairFormData((state) => {
//         state.procedures.push(item);

//         return state;
//       });
//       return;
//     }

//     const newArr = addItem({
//       id,
//       pos: "after",
//       arr: repairFormData.procedures,
//       item,
//     });

//     setRepairFormData((state) => {
//       state.procedures = newArr;

//       return state;
//     });
//   }

//   //initialize form data
//   function initializeRepairFormData(newRepair: Repair) {
//     // const newRepair = new Repair(repair);

//     // console.log("setRepairdata");
//     // console.log("newRepair", newRepair);

//     setRepairFormData(newRepair);
//   }

//   function updateEngineMake(value: string) {
//     setRepairFormData((state) => {
//       state.category = value;
//       return state;
//     });
//   }

//   function updateGroup(value: string) {
//     setRepairFormData((state) => {
//       state.category = value;
//       return state;
//     });
//   }

//   function updateBoardType(value: string) {
//     setRepairFormData((state) => {
//       state.category = value;
//       return state;
//     });
//   }

//   ///add image to procedure
//   function addImage(item: RepairImage, procedureId: string) {
//     const targetProcedure = repairFormData.procedures.findIndex((proc) => {
//       if (proc._id == procedureId) {
//         return true;
//       }
//       return false;
//     });

//     const targetProcedureData = repairFormData.procedures[targetProcedure];
//     const imageObjArr = targetProcedureData.images;

//     const newImageObjs = addItem({
//       pos: "end",
//       arr: imageObjArr,
//       item,
//     });

//     //updating older implementation for backward compatibility to EJS app
//     const imageStringsArr = newImageObjs.map((data) => data.url);

//     setRepairFormData((state) => {
//       const targetProc = state.procedures[targetProcedure];
//       targetProc.images = newImageObjs;
//       targetProc.images = imageStringsArr;

//       return state;
//     });
//   }
//   function replaceImageObjs(list: RepairImage[], procedureId: string) {
//     const targetProcedure = repairFormData.procedures.findIndex((proc) => {
//       if (proc._id == procedureId) {
//         return true;
//       }
//       return false;
//     });

//     // const targetProcedureData = repairFormData.procedureArr[targetProcedure];

//     const newImageObjs = list;

//     //updating older implementation for backward compatibility to EJS app
//     const imageStringsArr = newImageObjs.map((data) => data.url);

//     setRepairFormData((state) => {
//       const targetProc = state.procedures[targetProcedure];
//       targetProc.images = newImageObjs;
//       targetProc.images = imageStringsArr;

//       return state;
//     });
//   }

//   //remove by id
//   function removeImage(imageId: string, procedureId: string) {
//     //get target procedure data
//     const targetProcedure = repairFormData.procedures.findIndex((proc) => {
//       if (proc._id == procedureId) {
//         return true;
//       }
//       return false;
//     });

//     //filter out target id and return wanted imageObjs
//     const newImageObjs = repairFormData.procedures[
//       targetProcedure
//     ].images.filter((imageData) => {
//       if (imageData._id == imageId) return false;

//       return true;
//     });

//     //updating older implementation for backward compatibility to EJS app
//     const imageStringsArr = newImageObjs.map((data) => data.url);

//     //update form data state without causing rerender
//     setRepairFormData((state) => {
//       const targetProc = state.procedures[targetProcedure];
//       targetProc.images = newImageObjs;
//       targetProc.images = imageStringsArr;

//       return state;
//     });
//   }

//   //update image data by id
//   function updateImage(newImageData: RepairImage, procedureId: string) {
//     console.log("newImageData", newImageData);
//     console.log("procedureId", procedureId);
//     const targetProcedure = repairFormData.procedures.findIndex((proc) => {
//       if (proc._id == procedureId) {
//         return true;
//       }
//       return false;
//     });

//     //get images Data array from target procedure
//     const targetProcedureData = repairFormData.procedures[targetProcedure];
//     const imageObjsArr = targetProcedureData.images;

//     //replace target image data by id
//     const newImageObjs = imageObjsArr.map((imageData) => {
//       if (imageData._id == newImageData._id) {
//         return newImageData;
//       }
//       return imageData;
//     });

//     //updating older implementation for backward compatibility to EJS app
//     const imageStringsArr = newImageObjs.map((data) => data.url);

//     console.log("newImageObjs", newImageObjs);

//     //update form state
//     setRepairFormData((state) => {
//       const targetProc = state.procedures[targetProcedure];
//       targetProc.images = newImageObjs;
//       targetProc.images = imageStringsArr;

//       return state;
//     });
//   }
//   ///values to set in context
//   const values = {
//     repairFormData,
//     initializeRepairFormData,
//     formAction: {
//       updateEngineMake,
//       updateBoardType,
//       updateGroup,
//       addProcedureAfter,
//       removeProcedure,
//       addProcedureAtBegining,
//       updateInstructions,
//       updateTitle,
//       addImage,
//       removeImage,
//       updateImage,
//       replaceImageObjs,
//     },
//   };

//   return (
//     <RepairFormDataContext.Provider value={values}>
//       {children}
//     </RepairFormDataContext.Provider>
//   );
// };

// export function changeTitle(repair: Repair, newTitle: string) {
//   repair.title = newTitle;

//   return repair;
// }
