import Router from "express";
import { body } from "express-validator";

import { auth as authMiddleware } from "../middlewares/auth";
import AuthController from "../controller/AuthController";

const router = Router();

router.post("/registration", body("email").isEmail(), body("password").isLength({ min: 8 }), AuthController.registration);

router.post("/login", AuthController.login);

router.post("/auth", authMiddleware, AuthController.auth);

export default router;
