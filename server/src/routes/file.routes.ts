import Router from "express";

import { auth } from "../middlewares/auth";
import FileController from "../controller/FileController";

const router = Router();

router.post("/createFile", auth, FileController.createDir);
router.get("", auth, FileController.getFiles);

export default router;
