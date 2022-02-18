import path from "path";
import fs from "fs";

import type { UploadedFile } from "express-fileupload";
import type { Request, Response } from "express";

import { createPath } from "../helpers/createPath";
import FileService from "../service/FileService";
import File from "../models/File";
import User from "../models/User";
import type { TFileRequest, IFile } from "../types";

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

  async getFiles(req: Request<{}, {}, {}, { name: string }>, res: Response) {
    try {
      //@ts-expect-error
      const files = await File.find({ user: req.user.id, parent: req.query?.parent });
      return res.status(200).json({ files });
    } catch (e) {
      return res.status(500).json({ message: "The files not definded" });
    }
  }

  async uploadFiles(req: Request<{}, {}, {}, { parent: string }>, res: Response) {
    try {
      //@ts-expect-error
      const file = req.files.file as UploadedFile;
      //@ts-expect-error
      const user = await User.findOne({ _id: req.user.id });
      //@ts-expect-error
      const parentFolder = await File.findOne({ _id: req.body.parent, user: req.user.id });

      if (!user) return res.status(400).json({ message: "The user is not been" });
      if (user.usedSpace + file.size > user.diskSpace) return res.status(404).json({ message: "The disk space exceeded" });

      const path = parentFolder
        ? createPath(user._id.toString(), parentFolder.path, file.name)
        : createPath(user._id.toString(), file.name);

      if (fs.existsSync(path)) return res.status(200).json({ message: "The file is exists" });

      const dbFile = new File({
        name: file.name,
        type: file.name.split(".").pop(),
        size: file.size,
        path,
        parent: parentFolder?._id,
        user: user._id
      });

      if (parentFolder) {
        parentFolder.childs.push(dbFile._id);
        await parentFolder.save();
      }

      file.mv(path);

      user.files.push(dbFile._id);
      user.usedSpace += file.size;

      await dbFile.save();
      await user.save();

      res.status(200).json({ message: "The file is upload" });
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

  async deleteFile(req: Request<{}, {}, {}, { id: string; parent: string }>, res: Response) {
    try {
      const parent = await File.findOne({ _id: req.query.parent });
      //@ts-expect-error
      const user = await User.findOne({ _id: req.user.id });

      if (!user) return res.status(404).json({ message: "The user is not found" });

      const file = await FileService.rescueMemory(req.query.id, user);

      await user.save();

      if (parent) {
        parent.childs = parent.childs.filter((childId) => childId !== file._id);
        await parent.save();
      }

      return res.status(200).json({ message: "The file was successfully deleted from DB" });
    } catch (e) {
      return res.status(500).json({ message: "The delete failed" });
    }
  }

  async searchFiles(req: Request<{}, {}, {}, { name: string; parent: string }>, res: Response) {
    try {
      const files = await new Promise<IFile[]>(async (resolve, reject) => {
        try {
          //@ts-expect-error
          const files = await File.find({ user: req.user.id });
          resolve(files);
        } catch (err) {
          reject(err);
        }
      }).then((files) => files.filter(({ name }) => name.includes(name)));

      res.status(200).json({ files });
    } catch (e) {
      res.status(500).json({ message: "The search is not supported" });
    }
  }
}

export default new FileController();
