import { NextFunction, Request, Response } from "express";
const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  
  if (!res.locals.user) {
    res.status(401).json({
      error: "Unauthorized: Please log in",
    });
    return
  }
  req.log.debug("requireAuth executed successfully")
  next();
};
export default requireAuth;
