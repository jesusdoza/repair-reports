export class RepairImage {
  public url = "";
  public thumbnail = "";
  public caption = "";
  public imageId = "";
  public folder = "testFolder";
  constructor();
  constructor(imageData?: Partial<RepairImage>) {
    if (imageData) {
      this.url = imageData.url || "";
      this.thumbnail = imageData.thumbnail || "";
      this.caption = imageData.caption || "";
      this.imageId = imageData.imageId || "";
      this.folder = imageData.folder || "testFolder";
    }
  }

  setUrl(url: string) {
    this.url = url;
    return this;
  }

  setThumbnail(thumbnail: string) {
    this.thumbnail = thumbnail;
    return this;
  }

  setCaption(caption: string) {
    this.caption = caption;
    return this;
  }

  setImageId(imageId: string) {
    this.imageId = imageId;
    return this;
  }

  setFolder(folder: string) {
    this.folder = folder;
    return this;
  }
}
