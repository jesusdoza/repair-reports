import { useLocation } from "react-router-dom";
import { repairDataT } from "../hooks/useGetLatest";
import { FormEventHandler, useEffect, useState } from "react";
import EditProcedureList from "../components/RepairEdit/EditProcedureList";
import { AvailableEnginesSelect } from "../components/AvailableOptions/AvailableEngines";

export default function EditRepairPage() {
  const { state: data }: { state: repairDataT } = useLocation();
  const [newData, setNewData] = useState(data);

  useEffect(() => {
    console.log("new data", newData);
  }, [newData]);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = event.currentTarget;
    console.log("formdata", formdata);
  };

  return (
    <form onSubmit={handleUpdate}>
      <legend className=" border-4 rounded-lg p-2 border-gray-600">
        <span className=" text-4xl">Title:</span>
        <input
          className="text-4xl"
          id="title"
          name="title"
          type="text"
          defaultValue={newData.title ? newData.title : ""}
        />
        <h3>repair info</h3>
        <div>
          <span>Repair Id:</span>
          <div className="badge badge-neutral"> {newData._id}</div>
        </div>
        <div>
          <span>created by user:</span>
          <div className="badge badge-neutral"> {newData.createdBy}</div>
        </div>
        <AvailableEnginesSelect defaultValue={newData.engineMake} />
        <div>
          <span>user group:</span>
          <div className="badge badge-neutral"> {newData.group}</div>
        </div>
        <div>
          <span>board type:</span>
          <div className="badge badge-neutral"> {newData.boardType}</div>
        </div>
      </legend>
      <section>
        <h3 className="text-xl">Repair procedures</h3>
        <EditProcedureList list={newData.procedureArr} />
      </section>
      <button className="btn">Update</button>
    </form>
  );
}
