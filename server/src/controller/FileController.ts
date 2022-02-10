import path from "path";
import fs from "fs";
import type { UploadedFile } from "express-fileupload";
import type { Request, Response } from "express";

import { createPath } from "../helpers/createPath";
import FileService from "../service/FileService";
import File from "../models/File";
import User from "../models/User";
import type { TFileRequest } from "../types";

class FileController {
  async createDir(req: Request<{}, {}, TFileRequest>, res: Response) {
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
      return res.json(true);
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

  async uploadFiles(req: Request<{}, {}, Pick<TFileRequest, "parent">>, res: Response) {
    try {
      //@ts-expect-error
      const file = req.files.file as UploadedFile;
      //@ts-expect-error
      const user = await User.findOne({ _id: req.user.id });
      //@ts-expect-error
      const parentFolder = await File.findOne({ _id: req.body.parent, user: req.user.id });

      if (!user) return res.status(400).json({ message: "The user is not been" });

      if (user.usedSpace + file.size > user.diskSpace) return res.status(404).json({ message: "The disk space exceeded" });

      user.diskSpace = user.usedSpace + file.size;

      let path = parentFolder ? createPath(parentFolder.path, file.name) : createPath(user._id.toString(), file.name);

      if (fs.existsSync(path)) return res.status(200).json({ message: "The file is exists" });

      file.mv(path);

      const dbFile = new File({
        name: file.name,
        type: file.name.split(".").pop(),
        size: file.size,
        path,
        parent: parentFolder?._id,
        user: user._id
      });

      await dbFile.save();
      await user.save();

      res.status(200).json(dbFile);
    } catch (e) {
      return res.status(500).json({ message: "Upload error" });
    }
  }

  async downloadFile(req: Request<{}, {}, {}, { id: string }>, res: Response) {
    try {
      //@ts-expect-error
      const file = await File.findOne({ _id: req.query.id, user: req.user.id });

      if (!file) return res.status(500).json({ message: "The file was not found" });

      if (fs.existsSync(file.path)) return res.download(file.path, file.name);

      return res.status(500).json({ message: "The path is not found" });
    } catch (e) {
      return res.status(500).json({ message: "download error" });
    }
  }
}

export default new FileController();
