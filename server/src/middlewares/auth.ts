import jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    if (!req.headers?.authorization) {
      return res.status(400).json({ message: "Invalid authorization" });
    }

    const user = jwt.verify(req.headers?.authorization.split(" ")[1], String(process.env.SECRET_JWT));

    //@ts-expect-error
    req.user = user;
    next();
  } catch (e) {
    return res.status(400).json({ message: "Token had died" });
  }
};
