import bcrypt from "bcryptjs";
import { SignOptions } from "jsonwebtoken";
import { default as _ } from "lodash";
import prisma from "../config/prisma.js";
import { Payloadtype, Tokentype } from "../dtos/todo.types.js";
import ApiError from "../utils/apiError.js";
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from "../utils/jwt.js";
import { loginType } from "../validators/login.schema.js";
import { CreateUserType } from "../validators/user.schema.js";
const accessTokenExpireTime = process.env
  .ACCESS_TOKEN_EXPIRE as SignOptions["expiresIn"];
const refreshTokenExpireTime = process.env
  .REFRESH_TOKEN_EXPIRE as SignOptions["expiresIn"];

export class UserRepository {
  async createUser(data: CreateUserType["body"]) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const response = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        username: data.username,
      },
    });

    return _.omit(response, ["password"]);
  }

  async getUser(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        password: true,
        id: true,
      },
    });

    return user;
  }

  async invalidateTokenByHash(refreshToken: string) {
    const tokenHash = hashToken(refreshToken);
    await prisma.tokens.updateMany({
      where: {
        tokenHash,
      },
      data: {
        valid: false,
      },
    });
  }
  async findTokenByHash(tokenHash: string) {
    const response = await prisma.tokens.findUnique({
      where: {
        tokenHash,
      },
    });
    if (!response) {
      throw new ApiError(404, "Token has doesn't exist");
    }
    return response;
  }
  async invalidateTokensByUserId(userId: string) {
    await prisma.tokens.updateMany({
      where: { userId },
      data: { valid: false },
    });
  }
  async invalidateToken(tokenId: string) {
    await prisma.tokens.update({
      where: { id: tokenId },
      data: {
        usedAt: new Date().toISOString(),
        valid: false,
      },
    });
  }
  async createToken(userId: string, refreshToken: string) {
    const tokenHash = hashToken(refreshToken);
    const expireDate = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString();
    await prisma.tokens.create({
      data: {
        tokenHash,
        userId,
        valid: true,
        expiresAt: expireDate,
      },
    });
  }
}
