import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../models/errors/database.error.model";
import userRepository from "../repositories/user.repository";

const usersRoute = Router();

//  GET-get/users
usersRoute.get(
  "/users",
  async (request: Request, response: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    response.status(StatusCodes.OK).send({ users });
  }
);

//  GET-get/users/:uuid
usersRoute.get(
  "/users/:uuid",
  async (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const uuid = request.params.uuid;
      const users = await userRepository.findById(uuid);

      response.status(StatusCodes.OK).send({ uuid });
    } catch (error) {
      next(error);
    }
  }
);

//  POST-post/users
usersRoute.post(
  "/users",
  async (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction
  ) => {
    const newUser = request.body;
    const uuid = await userRepository.createUser(newUser);
    response.status(StatusCodes.CREATED).send(newUser);
  }
);

//  PUT-put/users/:uuid
usersRoute.put(
  "/users/:uuid",
  async (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction
  ) => {
    const uuid = request.params.uuid;
    //BD
    const modifiedUser = request.body;

    modifiedUser.uuid = uuid;

    await userRepository.updateUser(modifiedUser);

    response.status(StatusCodes.OK).send({});
  }
);

//  DELETE-delete/users/:uuid
usersRoute.delete(
  "/users/:uuid",
  async (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction
  ) => {
    const uuid = request.params.uuid;
    await userRepository.removeUser(uuid);
    response.sendStatus(StatusCodes.OK);
  }
);

export default usersRoute;
