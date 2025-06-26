import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

async function jwtAuthenticationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = request.headers["authorization"];
    if (!authorizationHeader) {
      throw new ForbiddenError("Credenciais não informadas!");
    }

    const [authenticationType, token] = authorizationHeader.split("");

    if (authenticationType !== "bearer" || !token) {
      throw new ForbiddenError("Tipo de autenticação inválido!");
    }

    try{
    const tokenPayload = JWT.verify(token, "my_secret_key");

    if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
      throw new ForbiddenError("Token Inválido!");
    }

    const uuid = tokenPayload.sub;
    const user = {
        uuid: tokenPayload.sub,
        username: tokenPayload.username
    };
    request.user = user;
    next();
  }catch (error) {
    throw new ForbiddenError('Token Inválido!');
  }
  } catch (error) {
    next(error);
  }
}

export default jwtAuthenticationMiddleware;
