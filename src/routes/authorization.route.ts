import { Request, Response, NextFunction, Router } from "express";
import ForbiddenError from "../modules/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";
import JWT, { SignOptions } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";


const authorizationRoute = Router();

authorizationRoute.post(
  "/token/validate",
  jwtAuthenticationMiddleware,
  (request: Request, response: Response, next: NextFunction) => {
    response.sendStatus(StatusCodes.OK);
  }
);

authorizationRoute.post(
  "/token",
  jwtAuthenticationMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = request.user;

      if (!user) {
        throw new ForbiddenError("Usuário não informado!");
      }

      const jwtPayload = { username: user.username };
      const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: '10m' };
      const secretKey = "my_secret_key";

      const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);
      response.status(StatusCodes.OK).json({ token: jwt });
    } catch (error) {
      next(error);
    }
  }
);

export default authorizationRoute;
