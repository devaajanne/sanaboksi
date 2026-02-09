#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Start the backend service
startBackend() {
    (cd backend && ./gradlew bootRun --args='--spring.profiles.active=dev')
}

# Start the frontend service
startFrontend() {
    (cd frontend && npm run dev)
}

# Wait for all services to start, kill with CTRL+C
startBackend & startFrontend; trap "exit" SIGINT; wait