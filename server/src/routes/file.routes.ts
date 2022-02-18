import Router from "express";

import { auth } from "../middlewares/auth";
import FileController from "../controller/FileController";

const router = Router();

router.post("/createFile", auth, FileController.createDir);
router.post("/upload", auth, FileController.uploadFiles);
router.get("", auth, FileController.getFiles);
router.get("/download", auth, FileController.downloadFile);
router.get("/search", auth, FileController.searchFiles);
router.delete("/delete", auth, FileController.deleteFile);

export default router;
