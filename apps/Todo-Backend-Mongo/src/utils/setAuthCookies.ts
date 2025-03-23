import { Request, Response } from "express";
import getDomainFromOrigin from "./getDomainFromOrigin.js";
import parseTimeToMs from "./parseTimeToMs.js";
const accessTokenMaxAge = parseTimeToMs(
  process.env.ACCESS_TOKEN_EXPIRE || "1m"
);
const refreshTokenMaxAge = parseTimeToMs(
  process.env.REFRESH_TOKEN_EXPIRE || "7d"
);
const isProduction = process.env.NODE_ENV === "production";

function setAuthCookies(
  req: Request,
  res: Response,
  accessToken: string,
  refreshToken: string
): void {
  const cookieDomain = getDomainFromOrigin(req.headers.origin);
  res.cookie("accessToken", accessToken, {
    maxAge: accessTokenMaxAge,
    httpOnly: true,
    path: "/",
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    domain: cookieDomain,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: refreshTokenMaxAge,
    httpOnly: true,
    path: "/",
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    domain: cookieDomain,
  });
}
export default setAuthCookies;
