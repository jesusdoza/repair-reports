import React, { ChangeEvent, useEffect, useState } from "react";
import AvailableOptions from "../components/AvailableOptions/AvailableOptions";
import EditProcedureList from "../components/RepairEdit/EditProcedureList";
import { repairDataT } from "../hooks/useGetLatest";
import useRepairApi from "../hooks/useRepairApi";

const newRepairState = {
  boardType: "other",
  engineMake: "other",
  group: "public",
  procedureArr: [],
  title: "New Repair",
};

export type NewRepairT = typeof newRepairState;

export default function RepairFormPage(): React.ReactNode {
  // const { state: data }: { state: repairDataT } = useLocation();

  //duplicate state incase user wants to revert to original

  const [updatedData, setUpdatedData] = useState<NewRepairT>(newRepairState);

  //delegate proceduresArr to substate
  const [newProceds, setNewProceds] = useState(updatedData.procedureArr);

  const { createRepair } = useRepairApi();

  useEffect(() => {
    console.log("updatedData", updatedData);
  }, [updatedData]);

  useEffect(() => {
    updateState({ procedureArr: newProceds }, setUpdatedData);
  }, [newProceds]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("updatedData", updatedData.procedureArr);

    try {
      // const res = await updateRepair(updatedData);
      // console.log("res update repair", res);
    } catch (error) {
      console.log("error handleUpdate @EditRepairPage ", error);
    }
  };

  const availableGroups = [
    {
      label: `original: ${updatedData.group}`,
      value: updatedData.group,
    },
    { label: "public", value: "public" },
  ];

  const availableBoardTypes = [
    {
      label: `original: ${updatedData.boardType}`,
      value: updatedData.group,
    },
    { label: "public", value: "public" },
  ];

  const availableEngines = [
    {
      label: `original: ${updatedData.engineMake}`,
      value: updatedData.engineMake,
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
        <span className=" text-4xl">Title:</span>
        <div>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              // console.log("e", e.target.value);
              setUpdatedData((state) => {
                return { ...state, title: e.target.value };
              });
            }}
            className="text-2xl w-full"
            id="title"
            name="title"
            type="text"
            defaultValue={updatedData.title ? updatedData.title : ""}
          />
        </div>

        <div>
          <AvailableOptions
            title="User group"
            name="group"
            options={availableGroups}
          />
        </div>
        <div>
          <AvailableOptions
            title="Board Type"
            name="boardType"
            options={availableBoardTypes}
          />
        </div>
        <div>
          <AvailableOptions
            callback={(engine: string) => {
              updateState({ engineMake: engine }, setUpdatedData);
            }}
            title="Engine make"
            name="engine"
            options={availableEngines}
          />
        </div>
      </legend>
      <section>
        <h3 className="text-xl">Repair procedures</h3>
        <EditProcedureList
          updateFn={setNewProceds}
          list={updatedData.procedureArr}
        />
      </section>
      <button
        type="submit"
        className="btn">
        Update
      </button>
    </form>
  );
}

function updateState(
  fieldUpdate: object,
  setState: React.Dispatch<React.SetStateAction<NewRepairT>>
) {
  setState((state) => {
    return { ...state, ...fieldUpdate };
  });
}
