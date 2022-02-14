import fs from "fs";
import type { Types, Document } from "mongoose";

import { createPath } from "../helpers/createPath";
import File from "../models/File";
import type { IFile, IUser } from "../types";

export type FileResponse = Document<any, any, IFile> &
  IFile & {
    _id: Types.ObjectId;
  };

class FileService {
  createDir(file: IFile) {
    const filePath = createPath(file.user.toString(), file.path);

    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: "The file had already been created" });
        } else {
          return reject({ message: "File is exists" });
        }
      } catch (e) {
        return reject({ message: "File error" });
      }
    });
  }

  deleteFile(file: IFile) {
    return new Promise((resolve, reject) => {
      try {
        fs.rmSync(file.path);
        return resolve({ message: "The file was successfully deleted" });
      } catch (e) {
        return reject({ message: "The delete is failed" });
      }
    });
  }

  rescueMemory(idFile: string | Types.ObjectId, user: IUser) {
    return new Promise<FileResponse>(async (resolve, reject) => {
      try {
        const file = await File.findOne({ _id: idFile, user: user._id });

        if (!file) return reject({ message: "The file is not found" });
        if (!fs.existsSync(file.path)) return reject({ message: "The found in disk" });

        if (file.type === "dir" && file.childs.length) {
          file.childs.forEach(async (fileChild) => await this.rescueMemory(fileChild, user));
        } else {
          user.usedSpace -= file.size;
          user.files = user.files.filter((fileId) => fileId !== file._id);
        }

        await this.deleteFile(file);
        await file.remove();

        return resolve(file);
      } catch (e) {
        console.log(e);
        return reject(e);
      }
    });
  }
}

export default new FileService();
