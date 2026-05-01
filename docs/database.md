<a id="top"></a>

# Database Documentation

<ol>
  <li>
    <a href="#overview">Overview</a>
  </li>
  <li>
    <a href="#database-schema">Database Schema</a>
  </li>
  <li>
    <a href="#database-initialization">Database Initialization</a>
  </li>
  <li>
    <a href="#data-source">Data Source</a>
  </li>
</ol>

## Overview

This documentation describes the current database setup for the **Sanaboksi** project. The setup documented here uses **SQLite** and covers the local database schema, seed data, and initialization process.

The current setup includes:
- one table for Finnish words
- seed SQL files for 5, 6, and 7-letter words
- one script for creating and reseeding the database

<p align="right">(<a href="#top">back to top</a>)</p>


## Database Schema

**Schema file**: [`backend/src/main/resources/databaseInit/schema.sql`](../backend/src/main/resources/databaseInit/schema.sql)

The schema creates one table and always drops the old table before creating a new one:

```sql
DROP TABLE IF EXISTS finnish_words;
CREATE TABLE IF NOT EXISTS finnish_words
(
  id      INTEGER PRIMARY KEY,
  word    VARCHAR NOT NULL UNIQUE CHECK (LENGTH(word) >= 5 AND LENGTH(word) <= 7)
);
```

The `finnish_words` table stores unique Finnish words used by the backend.

<p align="right">(<a href="#top">back to top</a>)</p>

## Database Initialization

The database initialization process is environment-aware and is triggered automatically by the backend container's entrypoint script, or can be run manually for local development and CI/CD.

**Script**: [`backend/src/main/resources/databaseInit/reseed_database.sh`](../backend/src/main/resources/databaseInit/reseed_database.sh)

### How Initialization Works
- **Automatic in Containers:**
  - The backend container's [`entrypoint.sh`](../backend/entrypoint.sh) checks if the SQLite database file exists at the path specified by the `SQLITE_DB_PATH` environment variable.
  - If the file does not exist, it runs the reseed script to create and seed the database for the `local-dev`, `local-prod`, and `test` Spring profiles, which use SQLite.
  - For the `azure` profile, this script does not run because Azure SQL Database is not initialized from the local SQLite seed files. The Azure database schema and data must be created and managed separately as part of the Azure deployment/provisioning process.

- **Manual Local Run:**
  - The script can be run directly from the `databaseInit` directory to create and seed the database for local testing:
    ```bash
    cd backend/src/main/resources/databaseInit
    ./reseed_database.sh
    ```
  - The script will use `backend/src/main/resources/database` as the database directory when run locally.

- **CI/CD Usage:**
  - In CI/CD environments (e.g., GitHub Actions), you can set the `DATABASE_DIRECTORY` environment variable to control where the database is created.

### What the Script Does
1. Detects the environment (container or local) and sets the database directory accordingly:
   - Container run: `/database`
   - Local run: `backend/src/main/resources/database`
   - CI/CD: `$DATABASE_DIRECTORY` if set
2. Ensures the database directory exists
3. Removes the old database file if it exists
4. Creates the schema from `schema.sql` (drops and recreates the table)
5. Seeds the database with word lists from the `finnishWords` directory (5, 6, and 7-letter words)
6. Prints the number of rows seeded

**Error and Warning Handling:**
- The script will exit with an error if the schema file is missing.
- For each word list, it will print a warning if the seed file is missing, but continue.

### Environment Variables
- `SQLITE_DB_PATH`: Path to the SQLite database file. Used by both the backend and the reseed script.
- `DATABASE_DIRECTORY`: (optional) Used by the reseed script to override the default database directory (useful in CI/CD).

### Inspecting the Database
After initialization, you can inspect the database using the `sqlite3` CLI:

```bash
sqlite3 backend/src/main/resources/database/database.db
sqlite> .tables
sqlite> SELECT COUNT(*) FROM finnish_words;
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Data Source
The seed data is based on the [Kotus Finnish word list](https://kotus.fi/sanakirjat/kielitoimiston-sanakirja/nykysuomen-sana-aineistot/nykysuomen-sanalista/) (page in Finnish) and filtered for the game.

Seed files:
- [`backend/src/main/resources/databaseInit/finnishWords/finnish-5-letter-words.sql`](../backend/src/main/resources/databaseInit/finnishWords/finnish-5-letter-words.sql)
- [`backend/src/main/resources/databaseInit/finnishWords/finnish-6-letter-words.sql`](../backend/src/main/resources/databaseInit/finnishWords/finnish-6-letter-words.sql)
- [`backend/src/main/resources/databaseInit/finnishWords/finnish-7-letter-words.sql`](../backend/src/main/resources/databaseInit/finnishWords/finnish-7-letter-words.sql)

<p align="right">(<a href="#top">back to top</a>)</p>

*Docs have been written with the help of AI*
