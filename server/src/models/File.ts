import { model, Schema, Types } from "mongoose";
import type { IFile } from "../types";

const File = new Schema<IFile>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  accessLink: { type: String },
  size: { type: Number, default: 0 },
  path: { type: String, default: "" },
  date: { type: Date, default: Date.now() },
  user: { type: Types.ObjectId, ref: "User" },
  parent: { type: Types.ObjectId, ref: "File" },
  childs: { type: [Types.ObjectId], ref: "File" }
});

export default model("File", File);
