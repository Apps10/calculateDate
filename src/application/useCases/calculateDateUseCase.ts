import { BusinessTime } from "../../domain/entities/BusinessTime";
import { CalculateDateDto } from "../dtos/calculateDateDto";
import { CalculateDate } from "../../domain/entities/CalculateDate";

export class CalculateDateUseCase {
  constructor(
    private readonly businessTime: BusinessTime
  ) {}

  execute({ date, days, hours }: CalculateDateDto): string {
    const tempCurrentDate = new Date();

    date = date ?? tempCurrentDate;
    const calculateDate = new CalculateDate(this.businessTime, date);

    calculateDate.addDays(days);
    calculateDate.addHours(hours);

    return calculateDate.toUTCString();
  }
}
