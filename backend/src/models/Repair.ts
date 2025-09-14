import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    caption: { type: String },
    folder: { type: String },
    imageId: { type: String },
    thumbnail: { type: String },
  },
  { _id: true }
);

const ProcedureSchema = new mongoose.Schema(
  {
    images: [ImageSchema],
    instructions: { type: String },
  },
  { _id: true }
); // Keep _id for procedures so you can update/delete them individually

const RepairSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    type: {
      type: String,
    },
    category: { type: String },
    manufacturer: { type: String },
    visibility: {
      type: String,
      enum: ["public", "private", "organization"],
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
    timestamps: { createdAt: true, updatedAt: true },
  }
);

export const Repair = mongoose.model("Repair", RepairSchema);
export const Image = mongoose.model("Image", ImageSchema);
export const Procedure = mongoose.model("Procedure", ProcedureSchema);
