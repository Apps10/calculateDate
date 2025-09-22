import { NextFunction, Request, Response } from "express";
import * as z from 'zod' 
import { ResponseHandler } from "@/infraestructure/helpers/express";

  const paramsValidator = z.object({
    date: z.iso.datetime().optional(),
    hours: z.coerce.number().min(1, { error: 'the minimun value is 1'}).optional(),
    days: z.coerce.number().min(1, { error: 'the minimun value is 1'}).optional(),
  })

export type calculateDateDto = z.infer<typeof paramsValidator>

export function CalculateDateHttpDtoMiddleware(req: Request, res:Response, next: NextFunction) {
  const { error, data } = paramsValidator.safeParse(req.query)
  
  if(error){
    return ResponseHandler.error(res, { error: 'InvalidParameters', message: z.treeifyError(error) }, 400)
  }
  req.body = data
  
  return next()

}