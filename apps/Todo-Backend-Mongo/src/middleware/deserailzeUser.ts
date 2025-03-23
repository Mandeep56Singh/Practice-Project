import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import { UserService } from "../services/user.service.js";
import { verifyJwt } from "../utils/jwt.js";
import setAuthCookies from "../utils/setAuthCookies.js";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies?.accessToken || "";
  const refreshToken = req.cookies?.refreshToken || "";
  const userService = new UserService();
  req.log.debug("deserilaize middleware called");

  if (accessToken) {
    const decoded = verifyJwt(accessToken);
    res.locals.user = decoded;
    req.log.debug(`Accesstooken verified with data ${decoded.userId}`);
    return next();
  }

  if (refreshToken) {
    
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await userService.refreshTokens(refreshToken);

    setAuthCookies(req ,res, newAccessToken, newRefreshToken);

    const decoded = verifyJwt(newAccessToken);

    res.locals.user = decoded;
    res.log.debug("successfuly generate new access token");
  }

  next();
};
export default deserializeUser;
