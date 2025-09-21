import { Countries } from "../../domain/interfaces/countryInterface";
import { HolidayService } from "../../domain/services/holidayService";
import { HolidaysCOL } from "../provider/holidays/Col";

export const countryholidaysRecord: Record<Countries, string[]> = {
  COL: HolidaysCOL,
};

export class HolidayByCountryService implements HolidayService {
  countryHolidays: Array<Date> = [];

  constructor(country: Countries = "COL") {
    this.countryHolidays = countryholidaysRecord[country].map(
      (h) => new Date(h)
    );
    if (this.countryHolidays.length === 0)
      throw Error("HolidayService: invalid country");
  }

  getCountOfHolidayBetweenDays(initDate: Date, endDate: Date) {
    return this.countryHolidays.filter((holiday) => {
      const t = holiday.getTime();
      return t >= initDate.getTime() && t <= endDate.getTime();
    }).length;
  }

  isHoliday(date: Date): boolean {
    return this.countryHolidays.includes(date)
  }

}
