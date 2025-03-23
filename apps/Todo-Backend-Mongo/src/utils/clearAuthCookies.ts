import { Request, Response } from "express";
import getDomainFromOrigin from "./getDomainFromOrigin.js";
function clearAuthCookies(req: Request, res: Response) {
  const isProduction = process.env.NODE_ENV === "production";
  const cookieDomain = getDomainFromOrigin(req.headers.origin);
  res.clearCookie("accessToken", {
    path: "/",
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    domain: cookieDomain,
  });
  res.clearCookie("refreshToken", {
    path: "/",
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    domain: cookieDomain,
  });
}
export default clearAuthCookies;
