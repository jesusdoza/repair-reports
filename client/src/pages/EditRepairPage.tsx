import { useLocation } from "react-router-dom";
import { repairDataT } from "../hooks/useGetLatest";
import { useEffect, useState } from "react";
import EditProcedureList from "../components/RepairEdit/EditProcedureList";

export default function EditRepairPage() {
  const { state: data }: { state: repairDataT } = useLocation();
  const [newData, setNewData] = useState(data);

  useEffect(() => {
    console.log("new data", newData);
  }, [newData]);

  return (
    <section>
      <legend className=" border-4 rounded-lg p-2 border-gray-600">
        <h1 className=" text-4xl">{newData.title ? newData.title : ""}</h1>
        <input
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
        <div>
          <span>engine make:</span>
          <div className="badge badge-neutral"> {newData.engineMake}</div>
          {/*//todo input for enginemake */}

          <section className="container blue-grey darken-1">
            <fieldset className="border engine-models">
              <legend>Choose Engine</legend>
              <span>
                <label htmlFor="cat">
                  <div className="badge badge-accent">
                    <input
                      id="cat"
                      name="model"
                      value="cat"
                      type="radio"
                      className=" model radio"
                    />
                    Caterpillar
                  </div>
                </label>
              </span>
              <span>
                <label htmlFor="detroit">
                  <div className="badge badge-accent">
                    <input
                      id="detroit"
                      name="model"
                      value="detroit"
                      type="radio"
                      className=" model radio"
                    />
                    Detroit
                  </div>
                </label>
              </span>

              <span>
                <label htmlFor="cummins">
                  <div className="badge badge-accent">
                    <input
                      id="cummins"
                      name="model"
                      value="cummins"
                      type="radio"
                      className=" model radio"
                    />
                    <span>Cummins</span>
                  </div>
                </label>
              </span>

              <span>
                <label htmlFor="other">
                  <div className="badge badge-accent">
                    <input
                      id="other"
                      name="model"
                      value="other"
                      type="radio"
                      className=" model radio"
                    />
                    <span>Other</span>
                  </div>
                </label>
              </span>
            </fieldset>
          </section>
          {/* end */}
        </div>
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
      {/* if user id matches created by field user can use edit tools */}
    </section>
  );
}
