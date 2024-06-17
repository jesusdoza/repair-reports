import { ImageObjT, ProcedureT } from "../../types";
import { Repair } from "../classes/Repair";

const reason: string[] = [];
export class FormTestResult {
  public isValid: boolean = false;
  public invalidProcedures: ProcedureT[] = [];
  public reason: string[] = [];
  constructor() {}
}

export function isValidForm(formData: Repair): FormTestResult {
  const procedures = formData.procedureArr;
  const testResult: FormTestResult = new FormTestResult();

  // go through all procedures and check its images
  //return true if all images are valid {isValid:boolean, invalidImages:ImageObj[] = []}
  //return false and any image id not valid {isValid:false, invalidImages:ImageObj[] = [ImageObj]}

  //test all procedures images
  const failedProcedures = procedures.filter((procedure) => {
    const result = !isValidProcedure(procedure);

    return result;
  });

  // console.log("failedProcedures", failedProcedures);

  if (failedProcedures.length > 0) {
    testResult.isValid = false;
    testResult.invalidProcedures = failedProcedures;
    testResult.reason = reason;
  }

  return testResult;
}

export function isValidProcedure(procedure: ProcedureT): boolean {
  const imageObjectsToCheck = procedure.imageObjs;

  //filter passing and return only fails
  const invalidImages = imageObjectsToCheck.filter((imageData) => {
    const result = !isImageValidState(imageData);

    return result;
  });

  //invalidImages exist this procedure fails check
  if (invalidImages.length > 0) return false;

  return true;
}

//verify image objects have been uploaded
export function isImageValidState(image: ImageObjT): boolean {
  //image status is correct but url is wrong
  if (
    (image.uploadStatus == "SUCCESS" || image.uploadStatus == "IDLE") &&
    !image.imageUrl.includes("data:")
  ) {
    reason.push(
      `image id: ${image.imageId} invalid url ${image.imageUrl.slice(0, 10)}`
    );
    return true;
  }

  return false;
}
