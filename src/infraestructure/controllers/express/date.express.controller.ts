import { CalculateDateDto } from "@/application/dtos/calculateDateDto";
import { CalculateDateUseCase } from "@/application/useCases/calculateDateUseCase";
import { BusinessTime } from "@/domain/entities/BusinessTime";
import { ResponseHandler } from "@/infraestructure/helpers/express/ResponseCustom";
import { HolidayByCountryService } from "@/infraestructure/services/holidaysByCountryService";
import { Request, Response } from "express";

export class CalculateDateExpressController {
  private holidayService = new HolidayByCountryService()
  private businessTime = new BusinessTime(this.holidayService)
  
  run = (req: Request, res: Response ) => {
    const { date:dateString, days, hours } = req.body as CalculateDateDto
    const date = dateString ? new Date(dateString) : new Date() 
    const useCase = new CalculateDateUseCase(this.businessTime)
    const result = useCase.execute({date, days, hours})

    return ResponseHandler.success(res,result)
  }
}


