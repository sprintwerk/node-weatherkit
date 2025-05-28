import { config } from 'dotenv';
import { WeatherKitClient } from '../src/index.js';

// Load environment variables from .env file
config();

// Initialize the client with your Apple Developer credentials from environment variables
const client = new WeatherKitClient({
  keyId: process.env.WEATHERKIT_KEY_ID!,
  teamId: process.env.WEATHERKIT_TEAM_ID!,
  serviceId: process.env.WEATHERKIT_SERVICE_ID!,
  privateKey: process.env.WEATHERKIT_PRIVATE_KEY!
});

// Example coordinates (can be overridden by environment variables)
const location = {
  latitude: parseFloat(process.env.WEATHERKIT_LAT ?? '49.719965'),
  longitude: parseFloat(process.env.WEATHERKIT_LON ?? '11.057919')
};

async function main(): Promise<void> {
  try {
    // Get current weather
    const availability = await client.getAvailability(location, 'DE');
    console.log('Availability:', availability);

    // Get weather forecast
    const forecast = await client.getWeather(location);
    console.log('Forecast:', forecast);
  } catch (error) {
    console.error('Error:', error);
  }
}

main().catch(console.error); 