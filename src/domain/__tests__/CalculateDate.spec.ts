import { DateObjectUnits, DateTime } from "luxon";
import { CountriesZoneType } from "../interfaces";
import { CalculateDate, BusinessTime } from "../entities";
import { HolidayByCountryService } from "@/infraestructure/services";

const holidayService = new HolidayByCountryService("COL");
const businessTime = new BusinessTime(holidayService)
const timeZone = CountriesZoneType["COL"];

interface TestArray {
  mockInitDate: DateObjectUnits;
  mockResultDate: DateObjectUnits;
  testName: string;
  addDays?: number;
  addHours?: number;
}

describe("CalculateDate", () => {
  const arrayTests: TestArray[] = [
    {
      testName: "should add 1 business day from Monday without holidays",
      mockInitDate: { year: 2025, month: 9, day: 1, hour: 8 },
      mockResultDate: { year: 2025, month: 9, day: 2, hour: 8 },
      addDays: 1, //paso
    },
    {
      testName:
        "should skip weekend when adding 1 day from Friday (return Monday)",
      mockInitDate: { year: 2025, month: 9, day: 5, hour: 8 },
      mockResultDate: { year: 2025, month: 9, day: 8, hour: 8 },
      addDays: 1, //paso
    },
    {
      testName:
        "should add 1 hour on Friday 17:00 and return next Monday 09:00",
      mockInitDate: { year: 2025, month: 9, day: 5, hour: 17 },
      mockResultDate: { year: 2025, month: 9, day: 8, hour: 9 },
      addHours: 1, // paso
    },
    {
      testName:
        "should add 1 hour on Saturday afternoon and return next Monday 09:00",
      mockInitDate: { year: 2025, month: 9, day: 20, hour: 14 },
      mockResultDate: { year: 2025, month: 9, day: 22, hour: 9 },
      addHours: 1, // paso
    },
    {
      testName: "should add 1 day and 4 hours skipping holiday in between",
      mockInitDate: { year: 2025, month: 9, day: 16, hour: 15 },
      mockResultDate: { year: 2025, month: 9, day: 18, hour: 10 },
      addDays: 1,
      addHours: 4, //paso
    },
    {
      testName:
        "should add 1 day starting Sunday night and return next business day afternoon",
      mockInitDate: { year: 2025, month: 9, day: 21, hour: 18 },
      mockResultDate: { year: 2025, month: 9, day: 22, hour: 17 },
      addDays: 1, //paso
    },
    {
      testName: "should add 8 working hours within the same business day",
      mockInitDate: { year: 2025, month: 9, day: 22, hour: 8 },
      mockResultDate: { year: 2025, month: 9, day: 22, hour: 17 },
      addHours: 8, // paso
    },
    {
      testName:
        "should add 1 business day from Monday morning to Tuesday morning",
      mockInitDate: { year: 2025, month: 9, day: 22, hour: 8 },
      mockResultDate: { year: 2025, month: 9, day: 23, hour: 8 },
      addDays: 1, //paso
    },
    {
      testName: "should add 1 day from Monday noon and keep same hour next day",
      mockInitDate: { year: 2025, month: 9, day: 22, hour: 12, minute: 30 },
      mockResultDate: { year: 2025, month: 9, day: 23, hour: 12 },
      addDays: 1, //paso
    },
    {
      testName:
        "should add 3 working hours from morning and finish same day afternoon",
      mockInitDate: { year: 2025, month: 9, day: 22, hour: 11, minute: 30 },
      mockResultDate: { year: 2025, month: 9, day: 22, hour: 15, minute: 30 },
      addHours: 3, // este esta raro, el enunciado dice 11 pm a 3pm del mismo dia, no tiene sentido, debe ser 11am a 3 pm
    },
  ];
  
  
  for (let index = 0; index < arrayTests.length; index++) {
    const { 
      mockInitDate, 
      mockResultDate, 
      testName, 
      addDays, 
      addHours,
     } = arrayTests[index];

    it(testName, () => {
      const customDate = DateTime.fromObject(mockInitDate, {
        zone: timeZone,
      }).toJSDate();

      const resultDate = DateTime.fromObject(mockResultDate, {
        zone: timeZone,
      }).toISO();

      const calculateDate = new CalculateDate(
        businessTime,
        customDate
      );
      calculateDate.addDays(addDays);
      calculateDate.addHours(addHours);

      const result = calculateDate.toString();

      expect(result).toEqual(resultDate);
    });
  }

   it("should add 5 days and 4 hours across long holiday period", () => {

      const date = new Date('2025-04-10T15:00:00.000Z')
      const resultDate = '2025-04-21T20:00:00.000Z';

      const calculateDate = new CalculateDate(
        businessTime,
        date
      );
      calculateDate.addDays(5);
      calculateDate.addHours(4);

      const result = calculateDate.toUTCString()

      expect(result).toEqual(resultDate);
    });
});
