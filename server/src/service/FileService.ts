import fs from "fs";
import path from "path";

import type { IFile } from "../types";

class FileService {
  createDir(file: IFile) {
    const filePath = path.resolve(__dirname, "..", "assets", "files", file.user.toString(), file.path);

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
}

export default new FileService();
