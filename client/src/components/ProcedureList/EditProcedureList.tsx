import EditProcedureCard from "./EditProcedureCard";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ProcedureT } from "../../../types";
// import { Procedure } from "../../classes/Procedure";
// import { ImageObj } from "../../classes/ImageObj";
import { Procedure } from "../../classes/Procedure";

import { addItem } from "../../hooks/utils/addItem";

type ProcedureListItemT = {
  _id: string;
  component: React.ReactNode;
};

export default function EditProcedureList({
  procedureList,
}: {
  procedureList: ProcedureT[];
}): React.ReactNode {
  //starting out procedures state
  const [ProcedureList, setProcedureList] = useState<
    {
      _id: string;
      component: React.ReactNode;
    }[]
  >([]);

  useEffect(() => {
    setProcedureList(() => {
      return initializeProcedures({
        procs: procedureList,
        setter: setProcedureList,
      });
    });
  }, []);

  return (
    <div>
      <div
        onClick={() => {
          const _id = uuidv4();
          addAtBegining({
            setter: setProcedureList,
            itemToAdd: {
              _id,
              component: createProcedureCard({
                id: _id,
                setter: setProcedureList,
              }),
            },
          });
        }}
        className="btn">
        Add new Procedure at begining
      </div>
      <ul className="w-full flex flex-col gap-2 overflow-hidden">
        {ProcedureList.map((proc) => proc.component)}
      </ul>
    </div>
  );
}

function initializeProcedures({
  procs,
  setter,
}: {
  procs: ProcedureT[];
  updateFormData?: object;
  setter: React.Dispatch<
    React.SetStateAction<
      {
        _id: string;
        component: React.ReactNode;
      }[]
    >
  >;
}): {
  _id: string;
  component: React.ReactNode;
}[] {
  const procedureComponents = procs.map((procedureData) => {
    const _id = procedureData?._id ? procedureData?._id : uuidv4();
    return {
      _id,
      component: createProcedureCard({ id: _id, setter }),
    };
  });

  return procedureComponents;
}

function addAtBegining({
  setter,
  itemToAdd,
}: {
  setter: React.Dispatch<React.SetStateAction<ProcedureListItemT[]>>;
  itemToAdd: ProcedureListItemT;
}) {
  setter((state) => {
    const newState = addItem({
      pos: "begining",
      arr: state,
      item: itemToAdd,
    });

    return newState;
  });
}

function addProcedureAfter({
  setter,
  itemToAdd,
  id,
}: {
  setter: React.Dispatch<React.SetStateAction<ProcedureListItemT[]>>;
  itemToAdd?: ProcedureListItemT;
  id: string;
}) {
  const _id = uuidv4();

  const newItem = itemToAdd
    ? itemToAdd
    : {
        _id,
        component: createProcedureCard({ id: _id, setter }),
      };

  setter((state) => {
    const newState = addItem({
      pos: "after",
      arr: state,
      item: newItem,
      id,
    });

    return newState;
  });
}

function createProcedureCard({
  id,
  setter,
}: {
  id: string;
  setter: React.Dispatch<
    React.SetStateAction<
      {
        _id: string;
        component: React.ReactNode;
      }[]
    >
  >;
}) {
  return (
    <li
      key={id}
      className="">
      <EditProcedureCard
        key={id}
        procedureData={new Procedure()}
        id={id ? id : uuidv4()}
      />
      <div
        onClick={() => {
          addProcedureAfter({ id, setter });
          //todo set form data aswell
        }}
        className="btn">
        Add new Procedure here
      </div>
    </li>
  );
}
