#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Check if correct directories exists
if [[ ! -d "backend" ]]; then echo "ERROR: backend directory not found"; exit 1; fi
if [[ ! -d "frontend" ]]; then echo "ERROR: frontend directory not found"; exit 1; fi

# Run backend formatter
format_backend() {
    (cd backend && ./gradlew spotlessApply)
}

# Run frontend formatter and eslint
format_frontend() {
    (cd frontend && npx prettier . --write && npx eslint . --fix)
}

# Run formatters and linter
format_backend && echo && format_frontend