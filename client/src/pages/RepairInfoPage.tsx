import { useParams } from "react-router-dom";
// import { repairDataT } from "../hooks/useGetLatest";
import { useLocation } from "react-router-dom";
import { repairDataT } from "../hooks/useGetLatest";
export const RepairInfoPage = () => {
  const { repair_id } = useParams();
  const { state: data }: { state: repairDataT } = useLocation();
  console.log("data at repair info page", data);

  return (
    <section>
      <legend className=" border-4 rounded-lg p-2 border-gray-600">
        <h1 className=" text-4xl">{data.title}</h1>
        <h3>repair info</h3>
        <div>
          <span>Repair Id:</span>
          <div className="badge badge-neutral"> {data._id}</div>
        </div>
        <div>
          <span>created by user:</span>
          <div className="badge badge-neutral"> {data.createdBy}</div>
        </div>
        <div>
          <span>engine make:</span>
          <div className="badge badge-neutral"> {data.engineMake}</div>
        </div>
        <div>
          <span>user group:</span>
          <div className="badge badge-neutral"> {data.group}</div>
        </div>
        <div>
          <span>board type:</span>
          <div className="badge badge-neutral"> {data.boardType}</div>
        </div>
      </legend>
      <section>
        <span>Repair procedures</span>
      </section>
      <section>repair edit tools</section>
      <section>
        <span>comments section</span>
      </section>
    </section>
  );
};
