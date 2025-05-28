export interface WeatherDescription {
  value: string;
  description: string;
  accessibilityDescription: string;
}

export enum PressureTrend {
  Falling = "falling",
  Rising = "rising",
  Steady = "steady"
}

export interface PressureTrendInfo {
  value: PressureTrend;
  description: string;
  accessibilityDescription: string;
}

export interface WindCompassDirection {
  value: string;
  abbreviation: string;
  description: string;
  accessibilityDescription: string;
}

export interface Wind {
  speed: number;
  compassDirection: WindCompassDirection;
  direction: number;
  gust: number | null;
}

export interface CloudCoverByAltitude {
  low: number;
  medium: number;
  high: number;
}

export enum UVIndexCategory {
  Low = "low",
  Moderate = "moderate",
  High = "high",
  VeryHigh = "veryHigh",
  Extreme = "extreme"
}

export interface UVIndex {
  value: number;
  category: UVIndexCategory;
}

export interface WeatherMetadata {
  date: string;
  expirationDate: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface WeatherData {
  apparentTemperature: number;
  dewPoint: number;
  humidity: number;
  temperature: number;
  pressure: number;
  pressureTrend: PressureTrendInfo;
  wind: Wind;
  cloudCover: number;
  cloudCoverByAltitude?: CloudCoverByAltitude;
  condition: WeatherDescription;
  date: string;
  isDaylight: boolean;
  uvIndex: UVIndex;
  visibility: number;
  metadata: WeatherMetadata;
  symbolName: string;
  precipitationIntensity: number;
}

export interface MoonData {
  moonRise: string | null;
  moonSet: string | null;
  phase: string;
}

export interface SunTimes {
  astronomicalDawn: string | null;
  astronomicalDusk: string | null;
  civilDawn: string | null;
  civilDusk: string | null;
  nauticalDawn: string | null;
  nauticalDusk: string | null;
  solarMidnight: string | null;
  solarNoon: string | null;
  sunrise: string | null;
  sunset: string | null;
}

export interface DailyForecast {
  date: number;
  highTemperature: number;
  lowTemperature: number;
  precipation: WeatherDescription;
  precipitationChance: number;
  moon: MoonData;
  sun: SunTimes;
  wind: Wind;
  condition: WeatherDescription;
  uvIndex: UVIndex;
  symbolName: string;
} 