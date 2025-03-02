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
  res.cookie("accessToken", accessToken, {
    maxAge: accessTokenMaxAge, 
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: refreshTokenMaxAge, 
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
}
export default setAuthCookies;
