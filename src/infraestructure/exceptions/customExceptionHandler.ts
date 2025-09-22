import {
  BadRequestException,
  InternalServerErrorByDomainException,
  ResourceNotFoundException,
} from "@/domain/exceptions/exceptions";
import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../helpers/express";

export class CustomExceptionHandler {
  static catch(err: Error, req: Request, res: Response, next: NextFunction) {
    if (
      err instanceof InternalServerErrorByDomainException ||
      err instanceof ResourceNotFoundException || 
      err instanceof BadRequestException
    ) {
      if (err instanceof InternalServerErrorByDomainException)
        console.log(`❌ Domain Error: ${JSON.stringify(err)}`);
      return ResponseHandler.error(res, err.categoryError, err.messageError, err.statusCode);
    }

    console.log(`❌ Unsupported Error: ${JSON.stringify(err)}`);
    return res.status(500).send("Internal Server Error");
  }
}
