# @sprintwerk/node-weatherkit

A Node.js client for Apple's WeatherKit REST API. Optionally returns data in a schema compatible to [@sprintwerk/capacitor-weatherkit](https://github.com/sprintwerk/capacitor-weatherkit).

### Package author

This package is actively being developed and maintained by [Sprintwerk](https://sprintwerk.de/). We are experts in all things Angular and NodeJS and provide tailored solutions from consulting to full stack development. Have a project? Need some support? Just drop us a line.

Pull requests, featrue requests or any constructive feedback for this package are always appreciated!

## Installation

```bash
npm install @sprintwerk/node-weatherkit
```

## Configuration

You'll need to set up your Apple Developer account and obtain the following credentials:

1. Team ID
1. Service ID
1. Key ID
1. Private Key (from Apple Developer Portal)

When using dotenv for example, you can just add the private key to your .env file and replace the line breaks with `\n`:

```bash
WEATHERKIT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\none-line\nwith-line-breaks\n-----END PRIVATE KEY-----"
```

## Usage

```typescript
import { WeatherKitClient } from "@sprintwerk/node-weatherkit";

const client = new WeatherKitClient({
  keyId: "YOUR_KEY_ID",
  teamId: "YOUR_TEAM_ID",
  serviceId: "YOUR_SERVICE_ID",
  privateKey: "YOUR_PRIVATE_KEY",
});

// Get current weather and daily forecast
const weather = await client.getWeather({
  latitude: 52.520008,
  longitude: 13.404954,
});

console.log(weather.currentWeather);
console.log(weather.forecastDaily);

// Check availability for a location
const availability = await client.getAvailability(
  {
    latitude: 52.520008,
    longitude: 13.404954,
  },
  "DE"
);
```

## API

### `WeatherKitClient`

#### Constructor Options

```typescript
interface WeatherKitConfig {
  keyId: string; // Your Key ID from Apple Developer Portal
  teamId: string; // Your Team ID from Apple Developer Portal
  serviceId: string; // Your Service ID from Apple Developer Portal
  privateKey: string; // Your Private Key from Apple Developer Portal
  enableCapacitorPluginSchema?: boolean; // Optional: Transform response to Capacitor plugin schema
}
```

#### Capacitor plugin

This package provides an option to return weather data in a format that is intended to be close to the schema [@sprintwerk/capacitor-weatherkit](https://github.com/sprintwerk/capacitor-weatherkit) returns. This helps to be a drop in replacement on other platforms like Android or web.

Just set `enableCapacitorPluginSchema` to `true` in `WeatherKitConfig`.

#### Methods

##### `getWeather(location, timezone?, language?, dataSets?)`

Get weather data for a specific location.

- `location`: `{ latitude: number, longitude: number }`
- `timezone`: Optional string (default: `'Etc/UTC'`)
- `language`: Optional string (default: `'en'`)
- `dataSets`: Optional array of `WeatherDataSet` (default: `['currentWeather', 'forecastDaily']`)

##### `getAvailability(location, country)`

Check WeatherKit data availability for a location.

- `location`: `{ latitude: number, longitude: number }`
- `country`: ISO Alpha-2 country code (e.g., 'US', 'DE', 'GB')

## Types

### WeatherDataSet

The `WeatherDataSet` type defines which weather data to include in the response. Available values are:

```typescript
type WeatherDataSet =
  | "currentWeather" // Current weather conditions
  | "forecastDaily" // Daily forecast for the next 10 days
  | "forecastHourly" // Hourly forecast for the next 24 hours
  | "forecastNextHour" // Minute-by-minute precipitation forecast for the next hour
  | "weatherAlerts"; // Active weather alerts for the location
```

You can request multiple datasets in a single API call:

```typescript
const weather = await client.getWeather(
  {
    latitude: 52.520008,
    longitude: 13.404954,
  },
  undefined, // timezone
  undefined, // language
  ["currentWeather", "forecastDaily", "forecastHourly"] // dataSets
);
```

## Requirements

- Node.js >= 18.0.0
- Valid Apple Developer account with WeatherKit access

## License

MIT
