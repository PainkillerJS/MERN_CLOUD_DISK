import type { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";

import User from "../models/User";
import File from "../models/File";
import FileService from "../service/FileService";
import { genetateJWT } from "../helpers/generateJWT";
import type { IUser } from "../types";
class AuthController {
  async registration(req: Request<{}, {}, IUser>, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    if (await User.findOne({ email })) return res.status(400).json({ message: "The email is registered" });

    const hashPassword = bcryptjs.hashSync(password, Number(process.env.saltHash));
    const user = new User({ email, password: hashPassword });

    await user.save();
    await FileService.createDir(new File({ user: user.id, name: "" }));

    const jwt = genetateJWT(user._id);

    return res.status(200).json({ user, jwt });
  }

  async login(req: Request<{}, {}, IUser>, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "The user is not been" });

    const isValidPassword = bcryptjs.compareSync(password, user.password);

    if (!isValidPassword) return res.status(400).json({ message: "The password had not corrected" });

    const jwt = genetateJWT(user._id);

    return res.status(200).json({ jwt, user });
  }

  async auth(req: Request, res: Response) {
    //@ts-expect-error
    const user = await User.findById({ _id: req.user.id });

    if (!user) return res.status(400).json({ message: "The user is not been" });

    return res.status(200).json({ user });
  }
}

export default new AuthController();
