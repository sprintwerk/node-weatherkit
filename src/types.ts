export interface WeatherKitConfig {
  keyId: string;
  teamId: string;
  serviceId: string;
  privateKey: string;
  enableCapacitorPluginSchema?: boolean;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface WeatherRequest extends Location {
  dataSets?: WeatherDataSet[];
  currentAsOf?: string;
  timezone?: string;
  language?: string;
}

export type WeatherDataSet = 'currentWeather' | 'forecastDaily' | 'forecastHourly' | 'forecastNextHour' | 'weatherAlerts';

export interface WeatherMetadata {
  attributionURL: string;
  expireTime: string;
  latitude: number;
  longitude: number;
  readTime: string;
  reportedTime: string;
  units: string;
  version: number;
  sourceType: string;
}

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
  metadata: WeatherMetadata;
  asOf: string;
  cloudCover: number;
  cloudCoverLowAltPct: number;
  cloudCoverMidAltPct: number;
  cloudCoverHighAltPct: number;
  conditionCode: string;
  daylight: boolean;
  humidity: number;
  precipitationIntensity: number;
  pressure: number;
  pressureTrend: 'rising' | 'falling' | 'steady';
  temperature: number;
  temperatureApparent: number;
  temperatureDewPoint: number;
  uvIndex: number;
  visibility: number;
  windDirection: number;
  windGust: number;
  windSpeed: number;
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

export interface DayPartForecast {
  forecastStart: string;
  forecastEnd: string;
  cloudCover: number;
  conditionCode: string;
  humidity: number;
  precipitationAmount: number;
  precipitationChance: number;
  precipitationType: string;
  snowfallAmount: number;
  temperatureMax: number;
  temperatureMin: number;
  windDirection: number;
  windGustSpeedMax: number;
  windSpeed: number;
  windSpeedMax: number;
}

export interface DayForecast {
  forecastStart: string;
  forecastEnd: string;
  conditionCode: string;
  maxUvIndex: number;
  moonPhase: string;
  moonrise?: string;
  moonset?: string;
  precipitationAmount: number;
  precipitationChance: number;
  precipitationType: string;
  snowfallAmount: number;
  solarMidnight?: string;
  solarNoon?: string;
  sunrise?: string;
  sunriseCivil?: string;
  sunriseNautical?: string;
  sunset?: string;
  sunsetCivil?: string;
  sunsetNautical?: string;
  temperatureMax: number;
  temperatureMin: number;
  windGustSpeedMax: number;
  windSpeedAvg: number;
  windSpeedMax: number;
  daytimeForecast?: DayPartForecast;
  overnightForecast?: DayPartForecast;
  restOfDayForecast?: DayPartForecast;
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

export interface WeatherResponse {
  currentWeather?: CurrentWeather;
  forecastDaily?: {
    metadata: WeatherMetadata;
    days: DayForecast[];
  };
  forecastHourly?: {
    metadata: WeatherMetadata;
    hours: HourForecast[];
  };
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