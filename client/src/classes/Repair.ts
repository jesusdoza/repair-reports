import { ProcedureT } from "../../types";
import { Procedure } from "./Procedure";

export class Repair {
  public searchtags: string[] = [];
  public boardType = "other";
  public engineMake = "other";
  public group = "public";
  public procedureArr: ProcedureT[] = [new Procedure()];
  public title = "New Repair";

  constructor() {}
}
