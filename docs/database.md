<a id="top"></a>

# Database Documentation

<ol>
    <li>
      <a href="#overview">Overview</a>
    </li>
    <li>
      <a href="#structure">Structure</a>
    </li>
    <li>
      <a href="#initialization">Initialization</a>
    </li>
    <li>
      <a href="#container-and-app-configuration">Container and App Configuration</a>
    </li>
    <li>
      <a href="#data-source">Data Source</a>
    </li>
</ol>

## Overview

This documentation describes the current database setup for the **Sanaboksi** project. The application uses **SQLite**, which stores the game word data in a single file instead of a separate database server.

The current setup includes:
- one SQLite database file
- one table for Finnish words
- seed SQL files for 5, 6, and 7-letter words
- one script for creating and reseeding the database

<p align="right">(<a href="#top">back to top</a>)</p>

## Structure

**Database file**: `backend/src/main/resources/database/database.db`

**Schema file**: [backend/src/main/resources/databaseInit/schema.sql](../backend/src/main/resources/databaseInit/schema.sql)

The schema creates one table:

```sql
CREATE TABLE IF NOT EXISTS finnish_words
(
    id      INTEGER PRIMARY KEY,
    word    VARCHAR NOT NULL UNIQUE CHECK (LENGTH(word) >= 5 AND LENGTH(word) <= 7)
);
```

The `finnish_words` table stores unique Finnish words used by the backend.

<p align="right">(<a href="#top">back to top</a>)</p>

## Initialization

**Script**: [backend/src/main/resources/databaseInit/reseed_database.sh](../backend/src/main/resources/databaseInit/reseed_database.sh)

Run the script from the `databaseInit` directory to create and seed the database:

```bash
cd backend/src/main/resources/databaseInit
./reseed_database.sh
```

The script:
1. removes the old database
2. creates the schema from `schema.sql`
3. seeds the database from the SQL word lists

Directory handling in the script is environment-aware:
- local run: `backend/src/main/resources/database`
- container run: `/database`
- GitHub Actions run: `DATABASE_DIRECTORY` environment variable

<p align="right">(<a href="#top">back to top</a>)</p>

## Container and App Configuration

The backend container uses a named volume and a bind mount so the SQLite file is available inside the container:

```yaml
# Production, named volume
volumes:
- database:/database
```

```yaml
# Development, bind mount
volumes:
  - ./backend/src/main/resources/database:/database
```

This is configured in:
- [compose.yaml](../compose.yaml)
- [compose.dev.yaml](../compose.dev.yaml)

The backend container entrypoint script (`backend/entrypoint.sh` or `backend/entrypoint.dev.sh`) runs the reseed script if `/database/database.db` does not exist.

Spring Boot connects to the database with:

```yaml
spring:
  datasource:
    url: jdbc:sqlite:${SQLITE_DB_PATH:/database/database.db}
    driver-class-name: org.sqlite.JDBC
  jpa:
    database-platform: org.hibernate.community.dialect.SQLiteDialect
```

This is defined in:
- [backend/src/main/resources/application.yaml](../backend/src/main/resources/application.yaml)
- [backend/src/main/resources/application-dev.yaml](../backend/src/main/resources/application-dev.yaml)

Integration tests use [backend/src/test/resources/application-test.yaml](../backend/src/test/resources/application-test.yaml), where the default datasource path is:

```yaml
spring:
  datasource:
    url: jdbc:sqlite:${SQLITE_DB_PATH:src/main/resources/database/database.db}
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Data Source

The seed data is based on the Kotus Finnish word list and filtered for the game.

Seed files:
- [backend/src/main/resources/databaseInit/finnishWords/finnish-5-letter-words.sql](../backend/src/main/resources/databaseInit/finnishWords/finnish-5-letter-words.sql)
- [backend/src/main/resources/databaseInit/finnishWords/finnish-6-letter-words.sql](../backend/src/main/resources/databaseInit/finnishWords/finnish-6-letter-words.sql)
- [backend/src/main/resources/databaseInit/finnishWords/finnish-7-letter-words.sql](../backend/src/main/resources/databaseInit/finnishWords/finnish-7-letter-words.sql)

<p align="right">(<a href="#top">back to top</a>)</p>

*Docs have been written with the help of AI*
