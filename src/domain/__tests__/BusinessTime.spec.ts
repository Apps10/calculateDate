import { DateTime as dt } from 'luxon'
import { HolidayByCountryService } from '@/infraestructure/services/holidaysByCountryService';
import { BusinessTime } from '../entities/BusinessTime';

const holidayService = new HolidayByCountryService("COL");
const businessTime = new BusinessTime(holidayService)

describe('isBusinessHour', () => {
 
  it('should return false before the workday starts', () => {
    expect(businessTime.isBusinessHour(dt.fromObject({hour: 7, minute: 59}))).toBe(false);
  });

  it('should return true during business hours', () => {
    expect(businessTime.isBusinessHour(dt.fromObject({hour: 10, minute: 0}))).toBe(true);
  });

  it('should return false during lunch hour', () => {
    expect(businessTime.isBusinessHour(dt.fromObject({hour: 12, minute: 30}))).toBe(false);
  });

  it('should return false after the workday ends', () => {
    expect(businessTime.isBusinessHour(dt.fromObject({hour: 17, minute: 1}))).toBe(false);
  });
});

