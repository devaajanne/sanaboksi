#!/bin/sh
set -e

ACTIVE_SPRING_PROFILE="${SPRING_PROFILES_ACTIVE}"
echo "Active Spring profile: $ACTIVE_SPRING_PROFILE"

# Reseed database if running local development containers
if [ "$ACTIVE_SPRING_PROFILE" = "local-dev" ]; then
  # Export SQLite path to reseed script
  export SQLITE_DB_PATH
  mkdir -p "$(dirname "$SQLITE_DB_PATH")"

  if [ ! -f "$SQLITE_DB_PATH" ]; then
    echo "Initializing and seeding SQLite database for active Spring profile..."
    /bin/bash /workdir/src/main/resources/databaseInit/reseed_database.sh
  else
    echo "SQLite database already exists at $SQLITE_DB_PATH"
  fi

  # Set command to run development container
  RUN_COMMAND="./gradlew classes --continuous --no-daemon & ./gradlew bootRun --no-daemon"
fi

# Reseed database if running local production containers
if [ "$ACTIVE_SPRING_PROFILE" = "local-prod" ] || [ "$ACTIVE_SPRING_PROFILE" = "test" ]; then
  # Export SQLite path to reseed script
  export SQLITE_DB_PATH
  mkdir -p "$(dirname "$SQLITE_DB_PATH")"

  if [ ! -f "$SQLITE_DB_PATH" ]; then
    echo "Initializing and seeding SQLite database for active Spring profile..."
    /bin/bash /workdir/databaseInit/reseed_database.sh
  else
    echo "SQLite database already exists at $SQLITE_DB_PATH"
  fi

  # Set command to run production container
  RUN_COMMAND="java -jar backend_build.jar"
fi

# Check that Azure SQL Database variables exists
if [ "$ACTIVE_SPRING_PROFILE" = "azure" ]; then
  echo "Checking required database variables for active Spring profile..."
  for var in SPRING_DATASOURCE_URL SPRING_DATASOURCE_USERNAME SPRING_DATASOURCE_PASSWORD; do
    eval "value=\${$var:-}"
    if [ -z "$value" ]; then
      echo "Missing required database variable $var for active Spring profile!"
      exit 1
    fi
  done
  
  echo "All required database variables set!"
  # Set command to run production container
  RUN_COMMAND="java -jar backend_build.jar"
fi

# Execute correct run command
exec sh -c "$RUN_COMMAND"