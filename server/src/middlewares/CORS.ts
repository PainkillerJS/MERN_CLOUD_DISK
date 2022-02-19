import type { Response, Request, NextFunction } from "express";

const cors = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type, accept, Authorization");

  next();
};

export default cors;
