import { Response } from "express";
import parseTimeToMs from "./parseTimeToMs.js";
const accessTokenMaxAge = parseTimeToMs(
  process.env.ACCESS_TOKEN_EXPIRE || "1m"
);
const refreshTokenMaxAge = parseTimeToMs(
  process.env.REFRESH_TOKEN_EXPIRE || "7d"
);
function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string
): void {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    maxAge: accessTokenMaxAge,
    httpOnly: true,
    path: "/",
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: refreshTokenMaxAge,
    httpOnly: true,
    path: "/",
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  });
}
export default setAuthCookies;
