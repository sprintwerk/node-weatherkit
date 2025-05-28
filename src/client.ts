import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import fetch from 'node-fetch';
import type {
  AvailabilityResponse,
  WeatherResponse,
  Location,
  WeatherDataSet
} from './types.js';

export class WeatherKitClient {
  private readonly keyId: string;
  private readonly teamId: string;
  private readonly serviceId: string;
  private readonly privateKey: string;
  private readonly baseUrl = 'https://weatherkit.apple.com/api/v1';
  private readonly defaultTimezone = 'Etc/UTC';
  private readonly defaultLanguage = 'en';
  private readonly defaultDataSets: WeatherDataSet[] = ['currentWeather', 'forecastDaily'];

  constructor(config: {
    keyId: string;
    teamId: string;
    serviceId: string;
    privateKey: string;
  }) {
    this.keyId = config.keyId;
    this.teamId = config.teamId;
    this.serviceId = config.serviceId;
    this.privateKey = config.privateKey;
  }

  private generateToken(): string {
    const now = Math.floor(Date.now() / 1000);

    const headers = {
      alg: 'ES256',
      kid: this.keyId,
      id: `${this.teamId}.${this.serviceId}`,
    };

    return jwt.sign(
      {
        iss: this.teamId,
        iat: now,
        exp: now + 3600, // Token expires in 1 hour
        sub: this.serviceId,
      } as JwtPayload,
      this.privateKey,
      { algorithm: 'ES256', header: { ...headers } },
    );
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const token = this.generateToken();
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`WeatherKit API error: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  public async getWeather(
    location: Location,
    timezone?: string,
    language?: string,
    dataSets?: WeatherDataSet[]
  ): Promise<WeatherResponse> {
    const { latitude, longitude } = location;
    const tz = timezone || this.defaultTimezone;
    const lang = language || this.defaultLanguage;
    const datasets = dataSets || this.defaultDataSets;

    return this.makeRequest<WeatherResponse>(
      `/weather/${lang}/${latitude}/${longitude}?timezone=${tz}&dataSets=${datasets.join(',')}`
    );
  }

  public async getAvailability(
    location: Location,
    country: string,
  ): Promise<AvailabilityResponse> {
    if (country.length !== 2) {
      throw new Error('Country must be an ISO Alpha-2 code (e.g., "US", "DE", "GB")');
    }
    const { latitude, longitude } = location;
    return this.makeRequest<AvailabilityResponse>(
      `/availability/${latitude}/${longitude}?country=${country.toUpperCase()}`
    );
  }
}