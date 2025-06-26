import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../modules/errors/database.error.model";
import ForbiddenError from "../modules/errors/forbidden.error.model";


function errorHandler(error:any, request: Request, response: Response, next: NextFunction){
    if (error instanceof DatabaseError) {
        response.sendStatus(StatusCodes.BAD_REQUEST);
      }else if (error instanceof ForbiddenError){
        response.sendStatus(StatusCodes.FORBIDDEN);
      }else {
        response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      }
}

export default errorHandler;