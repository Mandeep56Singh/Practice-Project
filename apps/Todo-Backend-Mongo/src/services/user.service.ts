import bcrypt from "bcryptjs";
import { Payloadtype, UserResponse } from "../dtos/todo.types.js";
import { UserRepository } from "../repositories/user.repository.js";
import ApiError from "../utils/apiError.js";
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from "../utils/jwt.js";
import { loginType } from "../validators/login.schema.js";
import { CreateUserType } from "../validators/user.schema.js";

export class UserService {
  private userRepository = new UserRepository();

  async createUser(data: CreateUserType["body"]): Promise<UserResponse> {
    const user = await this.userRepository.getUser(data.email);

    if (user) {
      throw new ApiError(409, "Email already exists");
    }

    return await this.userRepository.createUser(data);
  }

  async loginUser(data: loginType["body"]) {
    const user = await this.userRepository.getUser(data.email);
    if (!user) {
      throw new ApiError(404, "Email doesn't Exist");
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);

    if (!isValidPassword) {
      throw new ApiError(401, "Wrong password");
    }

    const payload: Payloadtype = {
      userId: user.id,
    };
    // create access token
    const accessToken = generateAccessToken(payload);

    // create a refresh token
    const refreshToken = generateRefreshToken(payload);

    await this.userRepository.createToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(oldRefreshToken: string) {
    if (!oldRefreshToken) {
      throw new ApiError(401, "No refresh token provided");
    }

    // check validity of refresh token
    const tokenHash = hashToken(oldRefreshToken);

    const tokenRecord = await this.userRepository.findTokenByHash(tokenHash);

    if (
      !tokenRecord ||
      !tokenRecord.valid ||
      tokenRecord.expiresAt < new Date()
    ) {
      throw new ApiError(401, `Invalid or expired refresh token  `);
    }

    // Reuse Detection
    if (tokenRecord.usedAt) {
      await this.userRepository.invalidateTokensByUserId(tokenRecord.userId);
      throw new ApiError(401, "Token Reuse Detected");
    }

    // Invalidate  old token
    await this.userRepository.invalidateToken(tokenRecord.id);

    const payload: Payloadtype = {
      userId: tokenRecord.userId,
    };
    // Generate new tokens
    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    // Store new token in db
    await this.userRepository.createToken(tokenRecord.userId, newRefreshToken);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logoutUser(refreshToken: string) {
    await this.userRepository.invalidateTokenByHash(refreshToken);
  }
}
