import { v4 as uuid4 } from "uuid";
import { ImageObjT, ProcedureT } from "../../types";
import { ImageObj } from "./ImageObj";

export class Procedure implements ProcedureT {
  public images: string[] = [];
  public imageObjs: ImageObj[] = [];
  public imagesIdArr: string[] = [];
  public instructions = "";
  public procedureNum = 0;
  public thumbs: string[] = [];
  public _id = uuid4();

  constructor();
  constructor(procedure: ProcedureT);
  constructor(procedure?: ProcedureT) {
    if (procedure) {
      this.images = procedure?.images ? procedure.images : this.images;

      this.imageObjs = Procedure.intializeImageObjs(
        procedure.imageObjs,
        procedure?.images
      );

      this.imagesIdArr = procedure?.imagesIdArr
        ? procedure.imagesIdArr
        : this.imagesIdArr;

      this.instructions = procedure?.instructions
        ? procedure.instructions
        : this.instructions;

      this.procedureNum = procedure?.procedureNum
        ? procedure.procedureNum
        : this.procedureNum;

      this.thumbs = procedure?.thumbs ? procedure.thumbs : this.thumbs;

      this._id = procedure?._id ? procedure._id : this._id;
      return;
    }

    console.log("no procedure", procedure);
    return;
  }

  //accept ImageObjT type and create ImageObj instances
  static intializeImageObjs(
    imageData: ImageObjT[] | undefined,
    imageUrls: string[] | undefined
  ): ImageObj[] {
    //if already new format imageobjs instantiate them
    if (imageData && imageData?.length > 0) {
      console.log("image objs exist");
      return imageData.map((data) => {
        return new ImageObj(data);
      });
    } else if (imageUrls && imageUrls.length > 0) {
      console.log("image objs missing deriving from urls");
      //case older format repair with only imageUrls derive imageObjs from string url
      return imageUrls.map((url) => Procedure.deriveImageObj(url));
    }
    //else nothing to instantiate so send back empty []
    else {
      console.log("no imageobj or urls return empty []");
      return [];
    }
  }

  //utility used for deriving imageObjs from image Url
  static deriveImageObj(url: string) {
    const newImageObj = new ImageObj();

    //TODO create imageObj from just the url
    newImageObj.imageUrl = url;
    newImageObj.imageThumb = url;
    newImageObj.imageId = url
      .split(".com")[1]
      .split("upload")[1]
      .split("/")
      .slice(2)
      .join("/")
      .slice(0, -4);
    newImageObj.folder = url
      .split(".com")[1]
      .split("upload")[1]
      .split("/")
      .slice(2)
      .join("/")
      .slice(0, -4)
      .split("/")[0];

    return newImageObj;
  }
}
