import { Response } from "express";

export class ResponseHandler {
  static success(res: Response, data: string | Object, status: number = 200) {
    const dataResponse = typeof data === "string" ? { date: data } : data;
    return res.status(status).json(dataResponse);
  }

  static error(res: Response, data: string | Object, status: number = 400) {
    const dataResponse = typeof data === "string" ? { message: data } : data;
    return res.status(status).json(dataResponse);
  }
}
