export const CountriesType = {
  COL: "Col",
} as const;

export const CountriesZoneType = {
  COL: 'America/Bogota',
} as const;

export type Countries = keyof typeof CountriesType;
export type CountriesZone = keyof typeof CountriesType;