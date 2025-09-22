import { Countries } from "../../domain/interfaces/countryInterface";
import { HolidayService } from "../../domain/services/holidayService";
import { HolidaysCOL } from "../provider/holidays/Col";

export const countryholidaysRecord: Record<Countries, string[]> = {
  COL: HolidaysCOL,
};

export class HolidayByCountryService implements HolidayService {
  countryHolidays: Array<String> = [];

  constructor(country: Countries = "COL") {
    this.countryHolidays = countryholidaysRecord[country];
    if (this.countryHolidays.length === 0)
      throw Error("HolidayService: invalid country");
  }

  isHoliday(date: Date): boolean {
    return this.countryHolidays.includes(`${date.toISOString().split('T')[0]}`)
  }

}
