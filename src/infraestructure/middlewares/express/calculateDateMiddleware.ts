import { NextFunction, Request, Response } from "express";
import * as z from 'zod' 
import { ResponseHandler } from "@/infraestructure/helpers/express";
import { paramsValidator } from "@/infraestructure/httpDto/express";


export function CalculateDateMiddleware(req: Request, res:Response, next: NextFunction) {
  const { error, data } = paramsValidator.safeParse(req.query)
  
  if(error){
    return ResponseHandler.error(res, 'InvalidParameters', z.treeifyError(error), 400)
  }
  req.body = data

  return next()
}