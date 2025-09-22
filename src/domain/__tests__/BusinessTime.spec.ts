import { DateTime as dt } from 'luxon'
import { HolidayByCountryService } from '@/infraestructure/services/holidaysByCountryService';
import { BusinessTime } from '../entities/BusinessTime';

const holidayService = new HolidayByCountryService("COL");
const businessTime = new BusinessTime(holidayService)

describe('isBusinessHour', () => {
 
  it('debería retornar false antes de iniciar jornada', () => {
    expect(businessTime.isBusinessHour(dt.fromObject({hour: 7, minute: 59}))).toBe(false);
  });

  it('debería retornar true en horario laboral', () => {
    expect(businessTime.isBusinessHour(dt.fromObject({hour: 10, minute: 0}))).toBe(true);
  });

  it('debería retornar false en hora de almuerzo', () => {
    expect(businessTime.isBusinessHour(dt.fromObject({hour: 12, minute: 30}))).toBe(false);
  });

  it('debería retornar false después de jornada', () => {
    expect(businessTime.isBusinessHour(dt.fromObject({hour: 5, minute: 1}))).toBe(false);
  });
});

