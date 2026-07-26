#!/bin/sh
set -e

ACTIVE_SPRING_PROFILE="${SPRING_PROFILES_ACTIVE}"
echo "Active Spring profile: $ACTIVE_SPRING_PROFILE"

# Export SQLite path to reseed script
export SQLITE_DB_PATH
mkdir -p "$(dirname "$SQLITE_DB_PATH")"

# Set SQLite seed file location and command to run the app in development container
if [ "$ACTIVE_SPRING_PROFILE" = "local-dev" ]; then
  # Set correct database seed script location
  SQLITE_SEED_FILE="/workdir/src/main/resources/databaseInit/seed_database.sh"
  # Set command to run development container
  RUN_COMMAND="./gradlew classes --continuous --no-daemon & ./gradlew bootRun --no-daemon"
fi

# Set SQLite seed file location and command to run the app in production container
if [ "$ACTIVE_SPRING_PROFILE" = "local-prod" ] || [ "$ACTIVE_SPRING_PROFILE" = "test" ] || [ "$ACTIVE_SPRING_PROFILE" = "azure" ]; then
  # Set correct database seed script location
  SQLITE_SEED_FILE="/workdir/databaseInit/seed_database.sh"
  # Set command to run production container
  RUN_COMMAND="java -jar backend_build.jar"
fi

if [ ! -f "$SQLITE_DB_PATH" ]; then
  echo "Initializing and seeding SQLite database for active Spring profile..."
  /bin/bash "$SQLITE_SEED_FILE"
else
  echo "SQLite database already exists at $SQLITE_DB_PATH"
fi

# Execute correct run command
exec sh -c "$RUN_COMMAND"