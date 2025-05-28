# node-weatherkit

A modern TypeScript client for Apple's WeatherKit REST API.

## Installation

```bash
npm install @sprintwerk/node-weatherkit
```

## Prerequisites

To use this package, you'll need:

1. An Apple Developer Account
2. A configured Service ID with WeatherKit access
3. A private key downloaded from Apple Developer portal

## Usage

```typescript
import { WeatherKitClient } from "@sprintwerk/node-weatherkit";

const client = new WeatherKitClient({
  keyId: "YOUR_KEY_ID",
  teamId: "YOUR_TEAM_ID",
  serviceId: "YOUR_SERVICE_ID",
  privateKey: "YOUR_PRIVATE_KEY",
});

// Get current weather
const weather = await client.getCurrentWeather({
  latitude: 37.323,
  longitude: -122.0322,
});

// Get weather forecast
const forecast = await client.getForecast({
  latitude: 37.323,
  longitude: -122.0322,
  days: 7,
});
```

## Features

- Full TypeScript support with type definitions
- Modern ES Modules support
- Comprehensive error handling
- Support for all WeatherKit endpoints:
  - Current weather
  - Daily forecast
  - Hourly forecast
  - Weather alerts
  - Historical weather data
  - Availability

## API Documentation

[Detailed API documentation will be added here]

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Manuel Heidrich
