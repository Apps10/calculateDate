import { HolidayService } from "../services/holidayService";
import { DateProvider } from "../interfaces/DateProviderInterface";

export class BusinessTime {
  private WORK_START_HOUR = 8;
  private LUNCH_START_HOUR = 12;
  private LUNCH_END_HOUR = 13;
  private WORK_END_HOUR = 17;

  constructor(private readonly holidayService: HolidayService) {}

  
  adjustmentIfIsAnInvalidDate(dt: DateProvider) {
    if (this.isBusinessHour(dt) && this.isBusinessDay(dt)) return dt;
    
    dt = this.setBeforeBusinessHour(dt)

    return dt;
  }


  setNextBusinessDate(dt: DateProvider) {
    do {
      dt = dt.plus({ days: 1 });
    } while(!this.isBusinessDay(dt))

    return dt;
  }

  setNextBusinessHour(dt: DateProvider) {
    do {
      dt = dt.plus({ hours: 1 });
      if (!this.isBusinessDay(dt)) {
        dt = this.setNextBusinessDate(dt);
        continue;
      }
    } while (!this.isBusinessHour(dt) || !this.isBusinessDay(dt));

    if (dt.hour === 8) {
      dt = dt.plus({ hours: 1 });
    }
    return dt;
  }


  setBeforeBusinessHour(dt: DateProvider) {
    if (dt.minute > 0) dt = dt.set({ minute: 0 });

    while (!this.isBusinessHour(dt) || !this.isBusinessDay(dt)) {
      dt = dt.set({ minute: 0 }).minus({ hour: 1 });
    }

    return dt;
  }


  setBeforeBusinessDay(dt: DateProvider) {
    while (!this.isBusinessDay(dt)) {
      dt = dt.minus({ days: 1 });
    }

    return dt;
  }

  
  isBusinessDay(dt: DateProvider): boolean {
    const date = dt.toJSDate();
    return !this.holidayService.isHoliday(date) && !dt.isWeekend;
  }

  isBusinessHour(dt: DateProvider): boolean {
    const hour = dt.hour;
    const minute = dt.minute;

    // Antes del inicio de jornada
    if (hour < this.WORK_START_HOUR) return false;

    // Después de terminar la jornada
    if (hour > this.WORK_END_HOUR) return false;
    if (hour == this.WORK_END_HOUR && minute > 0) return false;

    // Hora exacta del almuerzo (inicio)
    if (hour === this.LUNCH_START_HOUR && minute > 0) return false;

    // Durante el almuerzo
    if (hour > this.LUNCH_START_HOUR && hour < this.LUNCH_END_HOUR)
      return false;

    // final el almuerzo
    if (hour === this.LUNCH_END_HOUR && minute === 0)  return false;

    return true;
  }

  
}
