import { Procedure } from "./Procedure";
import { v4 as uuidv4 } from "uuid";

type visibilityT = "public" | "organization";
type statusT = "pending" | "completed" | "in_progress";

export class Repair {
  public searchTags: string[] = [];
  public type = "other";
  public category = "other";
  public group = "public";
  public procedures: Procedure[] = [];
  public title = "New Repair";
  public status: statusT = "pending";
  public manufacturer = "other";
  public visibility: visibilityT = "public";
  public description = "";
  public _id = uuidv4();

  constructor();
  constructor(repairData: Partial<Repair>);
  constructor(repairData?: Partial<Repair>) {
    if (repairData) {
      this.procedures = repairData?.procedures
        ? repairData.procedures
        : this.procedures;
      this.title = repairData?.title ? repairData.title : this.title;
      this.type = repairData?.type ? repairData.type : this.type;
      this.category = repairData?.category
        ? repairData.category
        : this.category;
      this.group = repairData?.group ? repairData.group : this.group;
      this.status = repairData?.status ? repairData.status : this.status;
      this.manufacturer = repairData?.manufacturer
        ? repairData.manufacturer
        : this.manufacturer;
      this.visibility = repairData?.visibility
        ? repairData.visibility
        : this.visibility;
      this.description = repairData?.description
        ? repairData.description
        : this.description;
      this._id = repairData?._id ? repairData._id : this._id;
    }
  }

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  setType(type: string) {
    this.type = type;
    return this;
  }
  setCategory(category: string) {
    this.category = category;
    return this;
  }
  setGroup(group: string) {
    this.group = group;
    return this;
  }
  setProcedures(procedures: Procedure[]) {
    this.procedures = procedures;
    return this;
  }

  setAdditionalTags(tags: string[]) {
    this.searchTags = [...this.searchTags, ...tags];
    return this;
  }

  setManufacturer(manufacturer: string) {
    this.manufacturer = manufacturer;
    return this;
  }

  setDescription(description: string) {
    this.description = description;
    return this;
  }

  setVisibility(visibility: visibilityT) {
    this.visibility = visibility;
    return this;
  }

  setStatus(status: statusT) {
    this.status = status;
    return this;
  }
}
