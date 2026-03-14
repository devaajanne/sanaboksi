#!/bin/sh

if [ ! -f /database/database.db ]; then
  if [ -f /workdir/databaseInit/reseed_database.sh ]; then
    chmod +x /workdir/databaseInit/reseed_database.sh
    cd /workdir/databaseInit
    ./reseed_database.sh
    cd /workdir
  else
    echo "Error: reseed_database.sh not found in /workdir/databaseInit, cannot initialize database."
    exit 1
  fi
fi

./gradlew classes --continuous --no-daemon & ./gradlew bootRun --no-daemon --args='--spring.profiles.active=dev'