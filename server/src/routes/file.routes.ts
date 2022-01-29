import Router from "express";

import { auth } from "../middlewares/auth";
import FileController from "../controller/FileController";
import type { IFileRequest } from "../types";

const router = Router();

router.post("", auth, FileController.createDir);
router.get("", auth, FileController.getFiles);

export default router;
