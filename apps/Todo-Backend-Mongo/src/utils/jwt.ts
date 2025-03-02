import crypto from "crypto";
import jwt, { SignOptions } from "jsonwebtoken";
import { Payloadtype } from "../dtos/todo.types.js";
import ApiError from "./apiError.js";
const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY as string;
const accessTokenExpireTime = process.env
  .ACCESS_TOKEN_EXPIRE as SignOptions["expiresIn"];
const refreshTokenExpireTime = process.env
  .REFRESH_TOKEN_EXPIRE as SignOptions["expiresIn"];

export function generateAccessToken(payload: Payloadtype) {
  return jwt.sign(payload, privateKey, {
    expiresIn: accessTokenExpireTime,
    algorithm: "RS256",
  });
}
export function generateRefreshToken(payload: Payloadtype) {
  return jwt.sign(payload, privateKey, {
    expiresIn: refreshTokenExpireTime,
    algorithm: "RS256",
  });
}
export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey as string) as Payloadtype;
    return decoded;
  } catch (err) {
    throw new ApiError(401, "AccessToken Expired");
  }
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
