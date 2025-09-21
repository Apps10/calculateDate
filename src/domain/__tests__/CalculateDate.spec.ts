import { DateObjectUnits, DateTime } from "luxon";
import { CountriesZoneType } from "../interfaces/countryInterface";
import { CalculateDate } from "../entities/calculateDate";
import { BusinessTime } from "../entities/businessTime";
import { HolidayByCountryService } from "@/infraestructure/services/holidaysByCountryService";

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
    // {
    //   testName: "should add 1 business day from Monday without holidays",
    //   mockInitDate: { year: 2025, month: 9, day: 1, hour: 8 },
    //   mockResultDate: { year: 2025, month: 9, day: 2, hour: 8 },
    //   addDays: 1, //paso
    // },
    // {
    //   testName:
    //     "should skip weekend when adding 1 day from Friday (return Monday)",
    //   mockInitDate: { year: 2025, month: 9, day: 5, hour: 8 },
    //   mockResultDate: { year: 2025, month: 9, day: 8, hour: 8 },
    //   addDays: 1, //paso
    // },
    // {
    //   testName:
    //     "should add 1 hour on Friday 17:00 and return next Monday 09:00",
    //   mockInitDate: { year: 2025, month: 9, day: 5, hour: 17 },
    //   mockResultDate: { year: 2025, month: 9, day: 8, hour: 9 },
    //   addHours: 1, // paso
    // },
    {
      testName:
        "should add 1 hour on Saturday afternoon and return next Monday 09:00",
      mockInitDate: { year: 2025, month: 9, day: 20, hour: 14 },
      mockResultDate: { year: 2025, month: 9, day: 22, hour: 9 },
      addHours: 1,
    },
    // {
    //   testName: "should add 1 day and 4 hours skipping holiday in between",
    //   mockInitDate: { year: 2025, month: 9, day: 16, hour: 15 },
    //   mockResultDate: { year: 2025, month: 9, day: 18, hour: 10 },
    //   addDays: 1,
    //   addHours: 4,
    // },
    // {
    //   testName:
    //     "should add 1 day starting Sunday night and return next business day afternoon",
    //   mockInitDate: { year: 2025, month: 9, day: 21, hour: 18 },
    //   mockResultDate: { year: 2025, month: 9, day: 18, hour: 15 }, // <-- Revisa este resultado (parece inconsistente)
    //   addDays: 1,
    // },
    // {
    //   testName: "should add 8 working hours within the same business day",
    //   mockInitDate: { year: 2025, month: 9, day: 22, hour: 8 },
    //   mockResultDate: { year: 2025, month: 9, day: 22, hour: 17 },
    //   addHours: 8,
    // },
    // {
    //   testName:
    //     "should add 1 business day from Monday morning to Tuesday morning",
    //   mockInitDate: { year: 2025, month: 9, day: 22, hour: 8 },
    //   mockResultDate: { year: 2025, month: 9, day: 23, hour: 8 },
    //   addDays: 1, //paso
    // },
    // {
    //   testName: "should add 1 day from Monday noon and keep same hour next day",
    //   mockInitDate: { year: 2025, month: 9, day: 22, hour: 12, minute: 30 },
    //   mockResultDate: { year: 2025, month: 9, day: 23, hour: 12 },
    //   addDays: 1, //paso
    // },
    // {
    //   testName:
    //     "should add 3 working hours from late night and finish next day afternoon",
    //   mockInitDate: { year: 2025, month: 9, day: 22, hour: 23, minute: 30 },
    //   mockResultDate: { year: 2025, month: 9, day: 23, hour: 15, minute: 30 },
    //   addHours: 3,
    // },
    // {
    //   testName: "should add 5 days and 4 hours across long holiday period",
    //   mockInitDate: { year: 2025, month: 4, day: 10 },
    //   mockResultDate: { year: 2025, month: 4, day: 21, hour: 15 },
    //   addDays: 5,
    //   addHours: 4,
    // },
  ];
  
  for (let index = 0; index < arrayTests.length; index++) {
    const { 
      mockInitDate, 
      mockResultDate, 
      testName, 
      addDays, 
      addHours
     } = arrayTests[index];

    it(testName, () => {
      const currentDate = DateTime.fromObject(mockInitDate, {
        zone: timeZone,
      }).toJSDate();

      const resultDate = DateTime.fromObject(mockResultDate, {
        zone: timeZone,
      }).toISO();

      const calculateDate = new CalculateDate(
        businessTime,
        currentDate
      );
      calculateDate.addDays(addDays);
      calculateDate.addHours(addHours);

      const result = calculateDate.toString();

      expect(result).toEqual(resultDate);
    });
  }
});
