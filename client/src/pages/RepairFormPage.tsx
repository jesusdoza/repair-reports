import React, { ChangeEvent, useContext, useState, useEffect } from "react";
import AvailableOptions from "../components/AvailableOptions/AvailableOptions";
import EditProcedureList from "../components/RepairEdit/EditProcedureList";
import { RepairFormContext } from "../context/RepairFormContext";
import { ProcedureT, RepairDispatchTypeEnum } from "../../types";
// import { ProcedureT, RepairDispatchTypeEnum } from "../../types";

const LOC = "@RepairFormPage.tsx";

export default function RepairFormPage(): React.ReactNode {
  const { newRepairObj, newProcedure, formDispatch, currentFormState } =
    useContext(RepairFormContext);

  useEffect(() => {
    console.log("currentFormState", currentFormState);
  }, [currentFormState]);

  const [currentProcedureList, setProcedureList] = useState(
    newRepairObj.procedureArr
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //! NOT USING DATABASE YET
    try {
      // const res = await updateRepair(updatedData);
      // console.log("res update repair", res);
    } catch (error) {
      console.log("error handleUpdate @EditRepairPage ", error);
    }
  };

  const availableGroups = [
    {
      label: `original: ${newRepairObj.group}`,
      value: newRepairObj.group,
    },
    { label: "public", value: "public" },
  ];

  const availableBoardTypes = [
    {
      label: `original: ${newRepairObj.boardType}`,
      value: newRepairObj.group,
    },
    { label: "Cat 70 pin", value: "cat70" },
    { label: "Cat 40 pin", value: "cat40" },
    { label: "DDEC 2", value: "DDEC2" },
    { label: "DDEC 3", value: "DDEC3" },
    { label: "DDEC 4", value: "DDEC4" },
  ];

  const availableEngines = [
    {
      label: `original: ${newRepairObj.engineMake}`,
      value: newRepairObj.engineMake,
    },
    { label: "Caterpillar", value: "cat" },
    { label: "Cummins", value: "cummins" },
    { label: "Detroit", value: "detroit" },
  ];

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit}>
      <legend className=" gap-4 flex flex-col border-4 rounded-lg p-2 border-gray-600">
        <div className="flex w-full justify-around items-center align-middle">
          <div className="flex-1 flex justify-end">
            <span className="w-1/2 text-4xl">Title:</span>
          </div>
          <div className="flex-1 flex justify-start">
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                console.log("e", e.target.value);

                formDispatch({
                  type: RepairDispatchTypeEnum.UPDATE_FIELD,
                  payload: { formField: { title: e.target.value } },
                });
              }}
              className="text-2xl w-1/2"
              id="title"
              name="title"
              type="text"
              defaultValue={newRepairObj.title}
            />
          </div>
        </div>

        <div>
          <AvailableOptions
            title="Visibility group"
            options={availableGroups}
            callback={(group: string) => {
              formDispatch({
                type: RepairDispatchTypeEnum.UPDATE_FIELD,
                payload: { formField: { group } },
              });
            }}
          />
        </div>
        <div>
          <AvailableOptions
            title="Board Type"
            options={availableBoardTypes}
            callback={(boardType: string) => {
              formDispatch({
                type: RepairDispatchTypeEnum.UPDATE_FIELD,
                payload: { formField: { boardType } },
              });
            }}
          />
        </div>
        <div>
          <AvailableOptions
            callback={(engineMake: string) => {
              formDispatch({
                type: RepairDispatchTypeEnum.UPDATE_FIELD,
                payload: { formField: { engineMake } },
              });
            }}
            title="Engine make"
            options={availableEngines}
          />
        </div>
      </legend>

      <section>
        <h3 className="text-xl">Repair procedures</h3>
        <EditProcedureList
        // formDispatch={formDispatch}
        // list={currentProcedureList}
        />
        <section className="p-3 flex flex-col items-center">
          <h3>Edit Procedure list</h3>
          <div>
            <div
              onClick={() => {
                const newList = addProcedureAtIndex({
                  index: currentProcedureList.length,
                  list: currentProcedureList,
                  newItem: newProcedure,
                });

                setProcedureList(newList);
              }}
              className="btn">
              add procedure here
            </div>
          </div>
        </section>
      </section>
      {/* submit section */}
      <section className="p-3">
        <button
          type="submit"
          className="btn">
          Update
        </button>
      </section>
    </form>
  );
}

function addProcedureAtIndex({
  index,
  list,
  newItem,
}: {
  index: number;
  list: ProcedureT[];
  newItem: ProcedureT;
}) {
  const newList = [];

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    // console.log(" newItem", newItem);

    if (index - 1 == i) {
      newList.push(newItem);
    }

    newList.push(item);
  }

  console.log("newList", newList);

  return newList;
}
