import type { Response, Request, NextFunction } from "express";

const cors = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
};

export default cors;
