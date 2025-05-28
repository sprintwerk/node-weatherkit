import type { WeatherResponse } from '../types';
import { UVIndexCategory } from './capacitor-types';

// Capacitor plugin types
interface WeatherDescription {
  value: string;
  description: string;
  accessibilityDescription: string;
}

enum PressureTrend {
  Falling = "falling",
  Rising = "rising",
  Steady = "steady"
}

interface PressureTrendInfo {
  value: PressureTrend;
  description: string;
  accessibilityDescription: string;
}

// interface WindCompassDirection {
//   value: string;
//   abbreviation: string;
//   description: string;
//   accessibilityDescription: string;
// }

interface Wind {
  speed: number;
  // compassDirection: WindCompassDirection;
  direction: number;
  gust: number | null;
}

interface CloudCoverByAltitude {
  low: number;
  medium: number;
  high: number;
}

interface UVIndex {
  value: number;
  category: UVIndexCategory;
}

interface WeatherMetadata {
  date: string;
  expirationDate: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

interface WeatherData {
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

interface MoonData {
  moonRise: string | null;
  moonSet: string | null;
  phase: string;
}

interface SunTimes {
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

interface DailyForecast {
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

function getUVIndexCategory(value: number): UVIndexCategory {
  if (value >= 11) return UVIndexCategory.Extreme;
  if (value >= 8) return UVIndexCategory.VeryHigh;
  if (value >= 6) return UVIndexCategory.High;
  if (value >= 3) return UVIndexCategory.Moderate;
  return UVIndexCategory.Low;
}

// function getWindCompassDirection(degrees: number): WindCompassDirection {
//   // Simple conversion for now - could be expanded with more precise directions
//   const directions = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'];
//   const index = Math.round(((degrees % 360) / 45)) % 8;
//   const value = directions[index];

//   return {
//     value,
//     abbreviation: value.substring(0, 2).toUpperCase(),
//     description: value,
//     accessibilityDescription: `Wind from the ${value}`
//   };
// }

function getPressureTrendInfo(trend: string): PressureTrendInfo {
  const value = trend.toLowerCase() as PressureTrend;
  return {
    value,
    description: trend,
    accessibilityDescription: `Pressure is ${trend}`
  };
}

function getWeatherDescription(conditionCode: string): WeatherDescription {
  return {
    value: conditionCode,
    description: conditionCode,
    accessibilityDescription: `Weather condition is ${conditionCode}`
  };
}

export function isWeatherResponse(data: any): data is WeatherResponse {
  return 'currentWeather' in data;
}

function transformCurrentWeather(current: NonNullable<WeatherResponse['currentWeather']>): WeatherData {
  return {
    apparentTemperature: current.temperatureApparent,
    dewPoint: current.temperatureDewPoint,
    humidity: current.humidity,
    temperature: current.temperature,
    pressure: current.pressure,
    pressureTrend: getPressureTrendInfo(current.pressureTrend),
    wind: {
      speed: current.windSpeed,
      direction: current.windDirection,
      gust: current.windGust || null,
      // compassDirection: getWindCompassDirection(current.windDirection)
    },
    cloudCover: current.cloudCover,
    cloudCoverByAltitude: {
      low: current.cloudCoverLowAltPct,
      medium: current.cloudCoverMidAltPct,
      high: current.cloudCoverHighAltPct
    },
    condition: getWeatherDescription(current.conditionCode),
    date: current.asOf,
    isDaylight: current.daylight,
    uvIndex: {
      value: current.uvIndex,
      category: getUVIndexCategory(current.uvIndex)
    },
    visibility: current.visibility,
    metadata: {
      date: current.metadata.readTime,
      expirationDate: current.metadata.expireTime,
      location: {
        latitude: current.metadata.latitude,
        longitude: current.metadata.longitude
      }
    },
    symbolName: current.conditionCode.toLowerCase(),
    precipitationIntensity: current.precipitationIntensity
  };
}

function transformDailyForecast(day: NonNullable<WeatherResponse['forecastDaily']>['days'][0]): DailyForecast {
  return {
    date: new Date(day.forecastStart).getTime(),
    highTemperature: day.temperatureMax,
    lowTemperature: day.temperatureMin,
    precipation: getWeatherDescription(day.precipitationType || 'clear'),
    precipitationChance: day.precipitationChance,
    moon: {
      moonRise: day.moonrise || null,
      moonSet: day.moonset || null,
      phase: day.moonPhase || 'unknown'
    },
    sun: {
      astronomicalDawn: null, // Not provided by WeatherKit
      astronomicalDusk: null, // Not provided by WeatherKit
      civilDawn: day.sunriseCivil || null,
      civilDusk: day.sunsetCivil || null,
      nauticalDawn: day.sunriseNautical || null,
      nauticalDusk: day.sunsetNautical || null,
      solarMidnight: day.solarMidnight || null,
      solarNoon: day.solarNoon || null,
      sunrise: day.sunrise || null,
      sunset: day.sunset || null
    },
    wind: {
      speed: day.windSpeedAvg || 0,
      direction: day.daytimeForecast?.windDirection || 0,
      gust: day.windGustSpeedMax || null,
      // compassDirection: getWindCompassDirection(day.windDirection || 0)
    },
    condition: getWeatherDescription(day.conditionCode),
    uvIndex: {
      value: day.maxUvIndex,
      category: getUVIndexCategory(day.maxUvIndex)
    },
    symbolName: day.conditionCode.toLowerCase()
  };
}

export function transformToCapacitorSchema<T>(data: T): T {
  if (!isWeatherResponse(data)) return data;

  const result: any = { ...data };

  if (data.currentWeather) {
    result.currentWeather = transformCurrentWeather(data.currentWeather);
  }

  if (data.forecastDaily) {
    result.forecastDaily = {
      ...data.forecastDaily,
      days: data.forecastDaily.days.map(transformDailyForecast)
    };
  }

  return result;
} 