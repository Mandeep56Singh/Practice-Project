import { Response } from "express";

function clearAuthCookies(res: Response) {
  res.clearCookie("accessToken", {
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.clearCookie("refreshToken", {
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
}
export default clearAuthCookies;
