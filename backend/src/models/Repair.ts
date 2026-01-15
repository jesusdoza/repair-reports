import mongoose, { set } from "mongoose";

type ImageType = {
  url: string;
  caption?: string;
  folder?: string;
  imageId?: string;
  thumbnail?: string;
};

type ProcedureType = {
  images: ImageType[];
  instructions: string;
};

type RepairType = {
  title: string;
  status: "pending" | "in_progress" | "completed";
  type: string;
  category: string;
  manufacturer: string;
  visibility: "public" | "organization";
  createdBy: mongoose.Types.ObjectId;
  organization: mongoose.Types.ObjectId;
  removed: boolean;
  procedures: ProcedureType[];
  description?: string;
};

const ImageSchema = new mongoose.Schema<ImageType>(
  {
    url: { type: String, required: true },
    caption: { type: String },
    folder: { type: String },
    imageId: { type: String },
    thumbnail: { type: String },
  },
  { _id: true }
);

const ProcedureSchema = new mongoose.Schema<ProcedureType>(
  {
    images: [ImageSchema],
    instructions: { type: String },
  },
  { _id: true }
); // Keep _id for procedures so you can update/delete them individually

const RepairSchema = new mongoose.Schema<RepairType>(
  {
    title: { type: String, required: true, trim: true },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    //model of board or partnumber
    type: {
      type: String,
      default: "",
      //lowercase and no spaces
      set: (v: string) => v.toLowerCase().trim().replace(/\s+/g, "_"),
    },
    //brand of board or other name
    category: {
      type: String,
      default: "",
      set: (v: string) => v.toLowerCase().trim().replace(/\s+/g, "_"),
    },
    manufacturer: {
      type: String,
      default: "",
      set: (v: string) => v.toLowerCase().trim().replace(/\s+/g, "_"),
    },
    visibility: {
      type: String,
      enum: ["public", "organization"],
      default: "public",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    removed: { type: Boolean, default: false },
    procedures: {
      type: [ProcedureSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Repair = mongoose.model<RepairType>("repairs", RepairSchema);
export const Image = mongoose.model<ImageType>("Image", ImageSchema);
export const Procedure = mongoose.model<ProcedureType>(
  "Procedure",
  ProcedureSchema
);
