import type { Types } from "mongoose";
export interface IUser {
  email: string;
  password: string;
  diskSpace: number;
  usedSpace: number;
  avatar: string;
  files: Types.ObjectId;
}

export interface IFile {
  name: string;
  type: string;
  accessLink: string;
  size: number;
  path: string;
  user: Types.ObjectId;
  parent: Types.ObjectId;
  childs: Types.ObjectId[];
}

export type IFileRequest = Pick<IFile, "name" | "type" | "parent">;
