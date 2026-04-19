#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Running script in a container
if [ -f "/.dockerenv" ]; then
    echo "Reseeding database in a container..."
    DATABASE_DIRECTORY="/database"
else
    echo "Reseeding database locally..."
    DATABASE_DIRECTORY="$SCRIPT_DIR/../database"
fi

# Ensure the database directory exists before creating the database file
if [ ! -d "$DATABASE_DIRECTORY" ]; then
     mkdir -p "$DATABASE_DIRECTORY"
fi

SCHEMA_FILE="$SCRIPT_DIR/schema.sql"
SEED_DIR="$SCRIPT_DIR/finnishWords"
DATABASE_FILE="$DATABASE_DIRECTORY/database.db"

# Check that schema file exists
if [ ! -f "$SCHEMA_FILE" ]; then
    echo "Database schema not found at $SCHEMA_FILE. Skipping creation."
    exit 1
fi

# Remove database file if exists
if [ -f "$DATABASE_FILE" ]; then
    rm "$DATABASE_FILE"
fi

# Create and seed database
sqlite3 "$DATABASE_FILE" < "$SCHEMA_FILE"

for WORD_FILE in 5 6 7; do
    SEED_FILE="$SEED_DIR/finnish-${WORD_FILE}-letter-words.sql"
    if [ -f "$SEED_FILE" ]; then
        sqlite3 "$DATABASE_FILE" < "$SEED_FILE"
    else
        echo "Seed file not found: $SEED_FILE"
    fi
done

ROW_COUNT=$(sqlite3 "$DATABASE_FILE" "SELECT COUNT(*) FROM finnish_words;")
echo "Database created and seeded with ${ROW_COUNT} rows."