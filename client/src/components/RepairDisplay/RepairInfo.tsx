import { RepairDataT } from "../../../types";
import EditTools from "../ProcedureList/EditTools";
import ProcedureList from "../ProcedureList/ProcedureList";

type RepairInfoPageProps = {
  repair: RepairDataT;
  userId: string | undefined;
};

export default function RepairInfo({ repair, userId }: RepairInfoPageProps) {
  return (
    <section className="print:flex print:flex-col w-full max-w-3xl mx-auto">
      <section className="w-full mb-6">
        <div className="bg-card border border-border rounded-xl shadow p-6">
          <h1 className="text-3xl font-bold text-primary mb-2">
            {repair.title ? repair.title : ""}
          </h1>
          <h3 className="text-lg text-muted-foreground mb-4">Repair Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-foreground">Repair Id:</span>
              <div className="badge bg-muted text-xs ml-2">{repair._id}</div>
            </div>
            <div>
              <span className="font-medium text-foreground">Created by:</span>
              <div className="badge bg-muted text-xs ml-2">
                {repair.createdBy}
              </div>
            </div>
            <div>
              <span className="font-medium text-foreground">Engine Make:</span>
              <div className="badge bg-muted text-xs ml-2">
                {repair.engineMake}
              </div>
            </div>
            <div>
              <span className="font-medium text-foreground">User Group:</span>
              <div className="badge bg-muted text-xs ml-2">{repair.group}</div>
            </div>
            <div>
              <span className="font-medium text-foreground">Board Type:</span>
              <div className="badge bg-muted text-xs ml-2">
                {repair.boardType}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full mb-6">
        <ProcedureList list={repair.procedureArr} />
      </section>
      {/* if user id matches created by field user can use edit tools */}
      <section className="w-full mb-6">
        {userId == repair.createdBy && <EditTools id={repair._id} />}
      </section>
      <section>{/* <Comments /> */}</section>
    </section>
  );
}
