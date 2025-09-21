import { DateTime } from "luxon";
import { CountriesZoneType } from "../interfaces/countryInterface";
import { BusinessTime } from "./businessTime";

export class CalculateDate {
  private FRIDAY_IN_WEEKDAY = 5;
  private SATURDAY_IN_WEEKDAY = 6;
  private SUNDAY_IN_WEEKDAY = 7;

  private timeZone = CountriesZoneType["COL"];

  private dateInstance: DateTime;
  private lastDate: Date;

  constructor(private readonly businessTime: BusinessTime, currentDate?: Date) {
    this.dateInstance = currentDate
      ? DateTime.fromJSDate(currentDate, { zone: this.timeZone })
      : DateTime.now().setZone(this.timeZone);

    this.lastDate = this.dateInstance.toJSDate();

    if (!this.dateInstance.isValid) {
      throw new Error("Calculate error");
    }
  }

  addDays(numberOfDaysToAdd?: number) {
    if (!numberOfDaysToAdd || numberOfDaysToAdd == 0) return;

    this.ensureIsAnPositiveNumber(numberOfDaysToAdd);

    this.lastDate = this.dateInstance.toJSDate();
    this.adjustmentIsAnInvalidDate(this.dateInstance);

    //sumar a un proximo dia valido
    while(numberOfDaysToAdd !== 0){
      numberOfDaysToAdd-= 1
      this.dateInstance = this.businessTime.SetNextBusinessDate(
        this.dateInstance
      );
    }
  }

  addHours(numberOfHoursToAdd?: number) {
    if (!numberOfHoursToAdd || numberOfHoursToAdd == 0) return;

    this.ensureIsAnPositiveNumber(numberOfHoursToAdd);
    //evitar las horas no laborales
    this.lastDate = this.dateInstance.toJSDate();
    this.adjustmentIsAnInvalidDate(this.dateInstance);

    //sumar a una proxima hora valida
    while(numberOfHoursToAdd !== 0){
      numberOfHoursToAdd -= 1
      this.dateInstance = this.businessTime.SetNextBusinessHour(
        this.dateInstance
      );
    }
  }

  // public adjustmentIfIsAnInvalidHour(dateInstance: DateTime){
  //   let daysToAddAvoidingInvalidHour = 0;
  //   const hour = dateInstance.hour
  //   const minute = dateInstance.minute

  //   //si es menor que la hora de inicio
  //   if ( hour < this.WORK_START_HOUR ) {
  //     dateInstance.set({
  //       hour: this.WORK_START_HOUR
  //     })
  //   }

  //   if(hour > this.WORK_END_HOUR || (hour === this.WORK_END_HOUR && minute > 0)){
  //     const nextDaty
  //   }
  // }

  private adjustmentIsAnInvalidDate(dateInstance: DateTime) {
    // la hora debe ser entre el horario laboral
    // el dia debe ser entre el lunes y el viernes
    // si hay festivos entre esas fechas
    this.fixDateIfIsAnInvalidHour(dateInstance);
    this.fixDateIfIsNotABusinessDay(dateInstance);
  }

  public fixDateIfIsNotABusinessDay(dt: DateTime) {
    if (this.businessTime.isBusinessDay(dt)) return;
    this.dateInstance = this.businessTime.SetBeforeBusinessDay(dt);
  }

  public fixDateIfIsAnInvalidHour(dateInstance: DateTime) {
    if (this.businessTime.isBusinessHour(dateInstance) && this.businessTime.isBusinessDay(dateInstance)) return;
    this.dateInstance = this.businessTime.SetBeforeBusinessHour(dateInstance);
  }

  toDate() {
    return this.dateInstance.toJSDate();
  }

  toString(): string {
    return this.dateInstance.toISO() ?? ""; //TODO: revisar, debe retornar lo que piden
  }

  private ensureIsAnPositiveNumber(value: number) {
    if (isNaN(value)) {
      throw new Error(`is not a number`);
    }

    if (value <= 0) {
      throw new Error(`is not a positive number`);
    }
  }

  private ensureIsCurrentDateValid(date: string) {}
}
