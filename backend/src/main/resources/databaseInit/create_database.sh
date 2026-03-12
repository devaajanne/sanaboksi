#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

DATABASE_FILE="../database/database.db"

if [ -f "$DATABASE_FILE" ]; then
    echo "Database already exists. Remove and reseed database? (y/n)"
    read -r answer
    if [[ "$answer" != "y" && "$answer" != "Y" ]]; then
        echo "Database removal and reseed aborted."
        exit 0
    fi
    rm "$DATABASE_FILE"
fi

sqlite3 "$DATABASE_FILE" < schema.sql
sqlite3 "$DATABASE_FILE" < finnishWords/finnish-5-letter-words.sql
sqlite3 "$DATABASE_FILE" < finnishWords/finnish-6-letter-words.sql
sqlite3 "$DATABASE_FILE" < finnishWords/finnish-7-letter-words.sql

echo "Database created and seeded."