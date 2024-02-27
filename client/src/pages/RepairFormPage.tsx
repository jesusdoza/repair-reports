import React, { ChangeEvent, useEffect } from "react";
import AvailableOptions from "../components/AvailableOptions/AvailableOptions";
import EditProcedureList from "../components/RepairEdit/EditProcedureList";
// import { repairDataT } from "../hooks/useGetLatest";
// import useRepairApi from "../hooks/useRepairApi";
import useRepairFormState, { DispatchType } from "../hooks/useRepairFormState";

const LOC = "@RepairFormPage.tsx";

export default function RepairFormPage(): React.ReactNode {
  const { state: currentFormState, dispatch: formDispatch } =
    useRepairFormState();

  useEffect(() => {
    console.log(`currentFormState useEffect ln41 ${LOC}`, currentFormState);
  }, [currentFormState]);

  // useEffect(() => {
  //   updateState({ procedureArr: newProceds }, setUpdatedData);
  // }, [newProceds]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("currentFormState submit", currentFormState);

    try {
      // const res = await updateRepair(updatedData);
      // console.log("res update repair", res);
    } catch (error) {
      console.log("error handleUpdate @EditRepairPage ", error);
    }
  };

  const availableGroups = [
    {
      label: `original: ${currentFormState.group}`,
      value: currentFormState.group,
    },
    { label: "public", value: "public" },
  ];

  const availableBoardTypes = [
    {
      label: `original: ${currentFormState.boardType}`,
      value: currentFormState.group,
    },
    { label: "Cat 70 pin", value: "cat70" },
    { label: "Cat 40 pin", value: "cat40" },
    { label: "DDEC 2", value: "DDEC2" },
    { label: "DDEC 3", value: "DDEC3" },
    { label: "DDEC 4", value: "DDEC4" },
  ];

  const availableEngines = [
    {
      label: `original: ${currentFormState.engineMake}`,
      value: currentFormState.engineMake,
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
              console.log("e", e.target.value);
              // formDispatch({ type: DispatchType.UPDATE_INTRUC });
              // setUpdatedData((state) => {
              //   return { ...state, title: e.target.value };
              // });
            }}
            className="text-2xl w-full"
            id="title"
            name="title"
            type="text"
            defaultValue={currentFormState.title}
          />
        </div>

        <div>
          <AvailableOptions
            title="Visibility group"
            options={availableGroups}
            callback={(group: string) => {
              formDispatch({
                type: DispatchType.UPDATE_FIELD,
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
                type: DispatchType.UPDATE_FIELD,
                payload: { formField: { boardType } },
              });
            }}
          />
        </div>
        <div>
          <AvailableOptions
            callback={(engineMake: string) => {
              formDispatch({
                type: DispatchType.UPDATE_FIELD,
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
          updateFn={(newProcList) => {
            formDispatch({
              type: DispatchType.UPDATE_PROCEDURES,
              payload: { allProcedures: newProcList },
            });
          }}
          list={currentFormState.procedureArr}
        />
        {/* edit procedure list section */}
        <section className="p-3">
          <h3>Edit Procedure list</h3>
          <div>
            <button className="btn">add procedure</button>
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
