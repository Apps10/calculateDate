import { Response } from "express";

export class ResponseHandler {
  static success(res: Response, data: string | Object, status: number = 200) {
    const dataResponse = typeof data === "string" ? { date: data } : data;
    return res.json(dataResponse).status(status);
  }

  static error(res: Response, data: string | Object, status: number = 400) {
    const dataResponse = typeof data === "string" ? { message: data } : data;
    return res.json(dataResponse).status(status);
  }
}
