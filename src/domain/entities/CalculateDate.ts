import { DateTime } from "luxon";
import { CountriesZoneType } from "../interfaces/countryInterface";
import { BusinessTime } from "./businessTime";

export class CalculateDate {
  private timeZone = CountriesZoneType["COL"];

  private dateInstance: DateTime;

  constructor(private readonly businessTime: BusinessTime, currentDate?: Date) {
    this.dateInstance = currentDate
      ? DateTime.fromJSDate(currentDate, { zone: this.timeZone })
      : DateTime.now().setZone(this.timeZone);

    if (!this.dateInstance.isValid) {
      throw new Error("Calculate error");
    }
  }

  addDays(numberOfDaysToAdd?: number) {
    if (!numberOfDaysToAdd || numberOfDaysToAdd == 0) return;

    this.ensureIsAnPositiveNumber(numberOfDaysToAdd);

    this.dateInstance = this.businessTime.adjustmentIfIsAnInvalidDate(this.dateInstance);

    //sumar a un proximo dia valido
    while(numberOfDaysToAdd !== 0){
      numberOfDaysToAdd-= 1
      this.dateInstance = this.businessTime.setNextBusinessDate(
        this.dateInstance
      );
    }
  }

  addHours(numberOfHoursToAdd?: number) {
    if (!numberOfHoursToAdd || numberOfHoursToAdd == 0) return;

    this.ensureIsAnPositiveNumber(numberOfHoursToAdd);
    //evitar las horas no laborales
    this.dateInstance = this.businessTime.adjustmentIfIsAnInvalidDate(this.dateInstance);

    //sumar a una proxima hora valida
    while(numberOfHoursToAdd !== 0){
      numberOfHoursToAdd -= 1
      this.dateInstance = this.businessTime.setNextBusinessHour(
        this.dateInstance
      );
    }
  }

  toDate() {
    return this.dateInstance.toJSDate();
  }

  toString(): string {
    return this.dateInstance.toISO() ?? ""; //TODO: revisar, debe retornar lo que piden
  }

  toUTCString(): string {
    return this.dateInstance.toUTC(0, { keepLocalTime: false}).toISO() ?? ""; //TODO: revisar, debe retornar lo que piden
  }

  private ensureIsAnPositiveNumber(value: number) {
    if (isNaN(value)) {
      throw new Error(`is not a number`);
    }

    if (value <= 0) {
      throw new Error(`is not a positive number`);
    }
  }

}
