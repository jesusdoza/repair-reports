import { v4 as uuid4 } from "uuid";
import { RepairImage } from "./RepairImage";

export class Procedure {
  public images: RepairImage[] = [];
  public instructions = "";
  public procedureNum = 0;
  public thumbs: string[] = [];
  public _id = uuid4();

  constructor();
  constructor(procedureData: Partial<Procedure>);
  constructor(procedureData?: Partial<Procedure>) {
    if (procedureData) {
      this.images = procedureData?.images ? procedureData.images : this.images;
      this.instructions = procedureData?.instructions
        ? procedureData.instructions
        : this.instructions;

      this.procedureNum = procedureData?.procedureNum
        ? procedureData.procedureNum
        : this.procedureNum;

      this.thumbs = procedureData?.thumbs ? procedureData.thumbs : this.thumbs;

      this._id = procedureData?._id ? procedureData._id : this._id;
      return;
    }

    return;
  }
}
