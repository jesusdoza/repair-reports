import { RepairDataT } from "../../types";
import { Procedure } from "./Procedure";

export class Repair {
  public searchTags: string[] = [];
  public boardType = "other";
  public engineMake = "other";
  public group = "public";
  public procedureArr: Procedure[] = [new Procedure()];
  public title = "New Repair";

  constructor(repair: RepairDataT);
  constructor();
  constructor(repair?: RepairDataT) {

    if(repair){
      this.searchTags =repair?.searchTags  ? repair. : this.searchTags 
      this.boardType = repair?.boardType  ? repair.boardType : this.boardType
      this.engineMake = repair?.engineMake  ? repair.engineMake : this.engineMake;
      this.group = repair?.group  ? repair.group : this.group
      this.procedureArr= repair?.procedureArr  ? this.intializeProcedures(repair.procedureArr) : this.procedureArr
      this.title = repair?.title  ? repair.title : this.title
    }
  }


  intializeProcedures(procedures: ProcedureT[]):Procedure[]{

    return procedures.map((proc)=>{
      return new Procedure(proc);
    })
  }
}
