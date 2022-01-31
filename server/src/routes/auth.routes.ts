import Router from "express";
import { body } from "express-validator";

import { auth as authMiddleware } from "../middlewares/auth";
import AuthController from "../controller/AuthController";

const router = Router();

router.post("/registration", body("email").isEmail(), AuthController.registration);
router.post("/login", AuthController.login);
router.post("", authMiddleware, AuthController.auth);

export default router;
