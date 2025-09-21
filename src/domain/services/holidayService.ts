export interface HolidayService {
   getCountOfHolidayBetweenDays(initDate: Date, endDate: Date): number
   isHoliday(date: Date): boolean
}