#!/bin/bash

# Check if all required environment variables are set
if [ -z "$WEATHERKIT_KEY_ID" ] || [ -z "$WEATHERKIT_TEAM_ID" ] || [ -z "$WEATHERKIT_SERVICE_ID" ] || [ -z "$WEATHERKIT_PRIVATE_KEY" ]; then
    echo "Error: Missing required environment variables"
    echo "Please set the following environment variables:"
    echo "  WEATHERKIT_KEY_ID       - Your Apple Developer Key ID"
    echo "  WEATHERKIT_TEAM_ID      - Your Apple Developer Team ID"
    echo "  WEATHERKIT_SERVICE_ID   - Your WeatherKit Service ID"
    echo "  WEATHERKIT_PRIVATE_KEY  - Your private key from Apple Developer portal"
    exit 1
fi

# Build the project
npm run build

# Run the example
node dist/examples/basic.js 