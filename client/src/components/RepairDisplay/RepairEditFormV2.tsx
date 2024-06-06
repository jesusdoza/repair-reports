import React, { ChangeEvent, useContext, useEffect, useState } from "react";
// import useRepairFormState from "../../hooks/useRepairFormState";
import AvailableOptions, {
  OptionT,
} from "../AvailableOptions/AvailableOptions";
import AvailableOptionsMulti from "../AvailableOptions/AvailableOptionsMulti";
import { Repair } from "../../classes/Repair";
import EditProcedureList from "../ProcedureList/EditProcedureList";
import ModalConfirm from "../Modals/ModalConfirm";
import { RepairDataT } from "../../../types";
import { RepairFormDataContext } from "../../context/RepairFormContext";

export default function RepairEditForm({
  repair,
  onSubmit,
  enabled = true,
  submitType,
}: {
  repair?: RepairDataT | undefined;
  onSubmit?: (repair: Repair) => Promise<void>;
  enabled?: boolean;
  submitType: string;
}) {
  //context will provide all data from now on
  // const intialData = repair ? new Repair(repair) : new Repair();

  const { repairFormData, initializeRepairFormData, formAction } = useContext(
    RepairFormDataContext
  );

  //intialize data for form from context
  // const { currentFormState, formDispatch } = useRepairFormState(repairFormData);

  //have individual state
  const [title, setTitle] = useState(repair ? repair.title : "new title here");
  const [engineMake, setEngineMake] = useState(
    repair ? repair.engineMake : "engine Make"
  );

  const [submitAllowed, setSubmitAllowed] = useState(enabled);

  useEffect(() => {
    if (repair) {
      //sync form data only
      initializeRepairFormData(repair);
    }
    console.log("initializing repair data");
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // console.log("repairFormData", repairFormData);
    try {
      if (onSubmit) {
        // onSubmit(currentFormState);
        console.log("repairFormData", repairFormData);
      }
    } catch (error) {
      setSubmitAllowed(true);
      console.log("error handleUpdate @RepairPage ", error);
    }
  };

  const availableGroups: OptionT[] = [
    {
      label: `original: ${repair?.group}`,
      value: repair?.group ? repair?.group : "group",
    },
    { label: "public", value: "public" },
  ];

  const availableBoardTypes: OptionT[] = [
    {
      label: `original: ${repair?.boardType}`,
      value: repair?.boardType ? repair.boardType : "boardType",
    },
    { label: "Cat70 IK", value: "IK" },
    { label: "Cat40 CA", value: "CA" },
    { label: "DDEC 2", value: "DDEC2" },
    { label: "DDEC 3", value: "DDEC3" },
    { label: "DDEC 4", value: "DDEC4" },
  ];

  const availableEngines: OptionT[] = [
    {
      label: `original: ${engineMake}`,
      value: engineMake,
    },
    { label: "Caterpillar", value: "cat" },
    { label: "Cummins", value: "cummins" },
    { label: "Detroit", value: "detroit" },
  ];

  //first option is always the default
  const availableTags: OptionT[] = [
    {
      label: "repair",
      value: "repair",
    },
    {
      label: "parts",
      value: "parts",
    },
    {
      label: "diagram",
      value: "diagram",
    },
    {
      label: "Pin out",
      value: "pinout",
    },
  ];

  return (
    <form
      className="w-full bg-slate-300"
      onSubmit={handleSubmit}>
      <legend className=" gap-4 flex flex-col rounded-lg p-2 border-gray-600 w-full">
        <div className="flex flex-col w-full justify-around items-center align-middle ">
          <div className="flex-1 flex justify-end">
            <span className="text-4xl w-full text-right">Title:</span>
          </div>
          <div className="flex-1 flex justify-start">
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const title = e.target.value;
                formAction.updateTitle(title);
                setTitle(e.target.value);
              }}
              className="text-2xl w-full bg-white"
              id="title"
              name="title"
              type="text"
              defaultValue={title}
            />
          </div>
        </div>

        <div className="">
          <AvailableOptions
            title="Visibility group"
            options={availableGroups}
            callback={(group: string) => {
              console.log("changed group", group);
            }}
          />
        </div>
        <div>
          <AvailableOptions
            title="Board Type"
            options={availableBoardTypes}
            callback={(boardType: string) => {
              // formDispatch({
              //   type: "UPDATE_FIELD",
              //   payload: { formField: { boardType } },
              // });
            }}
          />
        </div>
        <div>
          <AvailableOptions
            callback={(engineMake: string) => {
              setEngineMake(engineMake);
            }}
            title="Engine make"
            options={availableEngines}
          />
        </div>
        <div>
          <AvailableOptionsMulti
            callback={(searchTags: string[]) => {
              formDispatch({
                type: "UPDATE_SEARCH_TAGS",
                payload: { searchTags },
              });
            }}
            // defaultValue={currentFormState.searchTags}
            // defaultValue={}
            title="Search tags"
            options={availableTags}
          />
        </div>
      </legend>

      <section>
        <h3 className="text-xl">Repair procedures</h3>
        <EditProcedureList
          procedureList={repair?.procedureArr ? repair.procedureArr : []}
        />
      </section>
      {/* submit section */}
      <section className={`p-3`}>
        <ModalConfirm label={submitType ? submitType : "Create Repair"}>
          <div>
            <span>Please confirm: </span>
            <button
              type="submit"
              className="btn"
              disabled={!submitAllowed}>
              {submitType ? submitType : "Create Repair"}
            </button>
          </div>
        </ModalConfirm>
      </section>
    </form>
  );
}
