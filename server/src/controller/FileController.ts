import path from "path";
import type { Request, Response } from "express";

import FileService from "../service/FileService";
import File from "../models/File";
import type { IFileRequest } from "../types";

class FileController {
  async createDir(req: Request<{}, {}, IFileRequest>, res: Response) {
    try {
      const { name, parent, type } = req.body;
      //@ts-expect-error
      const file = new File({ name, type, parent, user: req.user.id });
      const parentFile = await File.findOne({ _id: parent });

      if (!parentFile) {
        file.path = name;
        await FileService.createDir(file);
      } else {
        file.path = path.join(parentFile.path, file.name);
        await FileService.createDir(file);
        parentFile.childs.push(file._id);
        await parentFile.save();
      }

      await file.save();
      return res.json({ file });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e });
    }
  }

  async getFiles(req: Request, res: Response) {
    try {
      //@ts-expect-error
      const files = await File.find({ user: req.user.id, parent: req.query?.parent });
      return res.status(200).json({ files });
    } catch (e) {
      return res.status(500).json({ message: "The files not definded" });
    }
  }
}

export default new FileController();
