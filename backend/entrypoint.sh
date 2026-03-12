#!/bin/sh
if [ ! -f /database/database.db ]; then
  cp /workdir/database/database.db /database/
fi
exec java -jar backend_build.jar