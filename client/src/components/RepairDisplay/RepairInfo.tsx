import { RepairDataT } from "../../../types";
import Comments from "../Comments/Comments";
import EditTools from "../ProcedureList/EditTools";
import ProcedureList from "../ProcedureList/ProcedureList";

type RepairInfoPageProps = {
  repair: RepairDataT;
  userId: string | undefined;
};

export default function RepairInfo({ repair, userId }: RepairInfoPageProps) {
  return (
    <section className="print:flex print:flex-col">
      <section className="w-full">
        <legend className=" border-4 rounded-lg p-2 border-gray-600">
          <h1 className=" text-4xl">{repair.title ? repair.title : ""}</h1>
          <h3>repair info</h3>
          <div>
            <span>Repair Id:</span>
            <div className="badge badge-neutral"> {repair._id}</div>
          </div>
          <div>
            <span>created by user:</span>
            <div className="badge badge-neutral"> {repair.createdBy}</div>
          </div>
          <div>
            <span>engine make:</span>
            <div className="badge badge-neutral"> {repair.engineMake}</div>
          </div>
          <div>
            <span>user group:</span>
            <div className="badge badge-neutral"> {repair.group}</div>
          </div>
          <div>
            <span>board type:</span>
            <div className="badge badge-neutral"> {repair.boardType}</div>
          </div>
        </legend>
      </section>

      <section className="w-full">
        {/* <h3 className="text-xl">Repair procedures</h3> */}
        <ProcedureList list={repair.procedureArr} />
      </section>
      {/* if user id matches created by field user can use edit tools */}
      <section className="w-full">
        {userId == repair.createdBy && <EditTools id={repair._id} />}
      </section>
      <section>{/* <Comments /> */}</section>
    </section>
  );
}
