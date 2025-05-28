export interface WeatherKitConfig {
  keyId: string;
  teamId: string;
  serviceId: string;
  privateKey: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface WeatherRequest extends Location {
  dataSets?: WeatherDataSet[];
  currentAsOf?: string;
  timezone?: string;
}

export type WeatherDataSet = 'currentWeather' | 'forecastDaily' | 'forecastHourly' | 'forecastNextHour' | 'weatherAlerts';

export interface Temperature {
  value: number;
  unit: 'C' | 'F';
}

export interface Precipitation {
  value: number;
  type: 'rain' | 'snow' | 'sleet' | 'hail' | 'mixed';
  chance: number;
  intensity: 'none' | 'light' | 'medium' | 'heavy';
}

export interface Wind {
  speed: number;
  direction: number;
  gust: number;
}

export interface CurrentWeather {
  asOf: string;
  cloudCover: number;
  conditionCode: string;
  daylight: boolean;
  humidity: number;
  precipitation: Precipitation;
  pressure: number;
  pressureTrend: 'rising' | 'falling' | 'steady';
  temperature: Temperature;
  temperatureApparent: Temperature;
  uvIndex: number;
  visibility: number;
  wind: Wind;
}

export interface DayWeatherCondition {
  conditionCode: string;
  maxUvIndex: number;
  moonPhase: string;
  moonrise?: string;
  moonset?: string;
  precipitationAmount: number;
  precipitationChance: number;
  precipitationType: string;
  snowfallAmount: number;
  sunrise?: string;
  sunset?: string;
  temperatureMax: Temperature;
  temperatureMin: Temperature;
}

export interface HourWeatherCondition {
  cloudCover: number;
  conditionCode: string;
  daylight: boolean;
  humidity: number;
  precipitation: Precipitation;
  pressure: number;
  temperature: Temperature;
  temperatureApparent: Temperature;
  uvIndex: number;
  visibility: number;
  wind: Wind;
}

export interface WeatherAlert {
  detailsUrl: string;
  source: string;
  summary: string;
  areaId: string;
  areaName: string;
  certainty: string;
  effective: string;
  expires: string;
  severity: 'extreme' | 'severe' | 'moderate' | 'minor';
  urgency: 'immediate' | 'expected' | 'future';
}

export interface WeatherResponse {
  currentWeather: {
    temperature: number;
    temperatureApparent: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: number;
    windGust?: number;
    uvIndex: number;
    visibility: number;
    cloudCover: number;
    conditionCode: string;
    daylight: boolean;
  };
  forecastDaily?: {
    days: DayForecast[];
  };
  forecastHourly?: {
    hours: HourForecast[];
  };
}

export interface DayForecast {
  forecastStart: string;
  forecastEnd: string;
  conditionCode: string;
  maxUvIndex: number;
  temperatureMax: number;
  temperatureMin: number;
  precipitationChance: number;
  snowfallAmount?: number;
  moonPhase?: string;
  moonrise?: string;
  moonset?: string;
  sunrise?: string;
  sunset?: string;
}

export interface HourForecast {
  forecastStart: string;
  temperature: number;
  temperatureApparent: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  windGust?: number;
  uvIndex: number;
  visibility: number;
  cloudCover: number;
  conditionCode: string;
  precipitationChance: number;
}

export interface ForecastResponse {
  forecastDaily?: {
    days: DayForecast[];
  };
  forecastHourly?: {
    hours: HourForecast[];
  };
}

export interface AvailabilityResponse {
  currentWeather: boolean;
  forecastDaily: boolean;
  forecastHourly: boolean;
  forecastNextHour: boolean;
  weatherAlerts: boolean;
} 