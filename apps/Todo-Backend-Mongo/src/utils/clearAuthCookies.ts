import { Response } from "express";

function clearAuthCookies(res: Response) {
   const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("accessToken", {
    path: "/",
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  });
  res.clearCookie("refreshToken", {
    path: "/",
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  });
}
export default clearAuthCookies;
