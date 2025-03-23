import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import ApiError from "../utils/apiError.js";
import clearAuthCookies from "../utils/clearAuthCookies.js";
import setAuthCookies from "../utils/setAuthCookies.js";
import { loginType } from "../validators/login.schema.js";
import { CreateUserType } from "../validators/user.schema.js";

export class UserController {
  private userService = new UserService();

  createUser = async (
    req: Request<{}, {}, CreateUserType["body"]>,
    res: Response
  ): Promise<void> => {
    const data = req.body;
    req.log.debug({ body: data }, "Creating user");
    const user = await this.userService.createUser(data);
    req.log.info(`User created successfully with Id: ${user.id}`);
    res.status(201).json(user);
  };

  login = async (
    req: Request<{}, {}, loginType["body"]>,
    res: Response
  ): Promise<void> => {
    const data = req.body;

    req.log.debug({ body: data }, "Creating session");

    const { accessToken, refreshToken } =
      await this.userService.loginUser(data);

    setAuthCookies(req, res, accessToken, refreshToken);

    res.status(200).json({ message: "Token generated successfully" });
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new ApiError(404, "Refresh Token invalid");
    }
    await this.userService.logoutUser(refreshToken);

    clearAuthCookies(req, res);
    res.status(200).json({ message: "Logged out successfully" });
  };
}
