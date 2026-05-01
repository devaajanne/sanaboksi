<a id="top"></a>

# Containerization Documentation

<ol>
  <li>
    <a href="#overview">Overview</a>
  </li>
  <li>
    <a href="#production-dockerfiles">Production Dockerfiles</a>
  </li>
  <li>
    <a href="#production-docker-compose-configuration">Production Docker Compose Configuration</a>
  </li>
  <li>
    <a href="#development-dockerfiles">Development Dockerfiles</a>
  </li>
  <li>
    <a href="#development-docker-compose-configuration">Development Docker Compose Configuration</a>
  </li>
  <li>
    <a href="#hot-reloading-in-development">Hot Reloading In Development</a>
  </li>
  <li>
    <a href="#backend-entrypoint-script">Backend Entrypoint Script</a>
  </li>
</ol>

## Overview

This documentation describes the containerization strategy for the **Sanaboksi** project, which consists of a Java Spring Boot backend, React frontend, and SQLite database for local development and Azure SQL database for cloud deployment. The project uses Docker and Docker Compose with separate configurations for production and development environments.

<p align="right">(<a href="#top">back to top</a>)</p>

## Production Dockerfiles
Defines the multi-stage Docker build process for creating production-ready backend and frontend images.

### Backend Production Build
**Location**: [`backend/Dockerfile`](../backend/Dockerfile)

#### Multi-stage Build Process
**Stage 1: Build**
- **Base Image**: `eclipse-temurin:25-jdk`
- **Purpose**: Compiles and builds the Spring Boot application
- **Steps**:
  1. Sets working directory to `/workdir`
  2. Copies Gradle wrapper, build files, and settings for caching
  3. Downloads dependencies in a separate layer
  4. Copies the full source tree
  5. Builds the executable JAR with `./gradlew bootJar`

**Stage 2: Run**
- **Base Image**: `eclipse-temurin:25-jre`
- **Purpose**: Runs the Spring Boot application
- **Steps**:
  1. Sets working directory to `/workdir` and creates `/database` directory
  2. Installs `curl` for health checks and `sqlite3` for database support
  3. Copies the built JAR from the build stage as `backend_build.jar`
  4. Copies `databaseInit` resources and `entrypoint.sh`
  5. Normalizes line endings for shell scripts
  6. Sets executable permissions for scripts
  7. Exposes port 8080
  8. Starts the application using `entrypoint.sh`, which handles DB initialization and profile selection

### Frontend Production Build
**Location**: [`frontend/Dockerfile`](../frontend/Dockerfile)

#### Multi-stage Build Process
**Stage 1: Build**
- **Base Image**: `node:24-alpine`
- **Purpose**: Builds the React application
- **Steps**:
  1. Sets working directory to `/workdir`
  2. Copies `package*.json` for dependency caching
  3. Installs dependencies with `npm ci`
  4. Copies the full source code
  5. Sets build-time environment variable `VITE_SERVER_URL`
  6. Builds the app with `npm run build`

**Stage 2: Run**
- **Base Image**: `nginx:1.29.5-alpine`
- **Purpose**: Serves static files
- **Steps**:
  1. Sets working directory to `/usr/share/nginx/html`
  2. Removes the default Nginx welcome page
  3. Copies built frontend files from the build stage
  4. Exposes port 80
  5. Starts Nginx in foreground mode

<p align="right">(<a href="#top">back to top</a>)</p>

## Production Docker Compose Configuration
Production configuration is meant to build an immutable image which can be used to run the project in a container or to deploy the project to a cloud deployment platform.

**Location**: [`compose.yaml`](../compose.yaml)

### Services
**Backend (`backend`)**
- **Container Name**: `sanaboksi_backend`
- **Build Context**: `./backend`
- **Build Dockerfile**: [`Dockerfile`](../backend/Dockerfile)
- **Port**: Host `8080` mapped to container port `8080` (`8080:8080`)
- **Environment**: environment variables for Spring Boot
- **Healthcheck**: Actuator health endpoint check

**Frontend (`frontend`)**
- **Container Name**: `sanaboksi_frontend`
- **Build Context**: `./frontend`
- **Build Dockerfile**: [`Dockerfile`](../frontend/Dockerfile)
- **Build Args**: build arguments for Vite
- **Ports**: Host `5173` mapped to container port `80` (`5173:80`)
- **Dependencies**: Waits for cbackend` health check

### Usage
```bash
# To start containers
docker compose -f compose.yaml up --build
```
```bash
# To stop and remove containers
docker compose -f compose.yaml down
```
```bash
# To stop and remove containers, remove created images
docker compose -f compose.yaml down --rmi local
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Development Dockerfiles
Describes the Docker build setup for local development with hot reloading for both backend and frontend.

### Backend Development Dockerfile
**Location**: [`backend/Dockerfile.dev`](../backend/Dockerfile.dev)

#### Build Process
- **Base Image**: `eclipse-temurin:25-jdk`
- **Purpose**: Provides a development environment for the Spring Boot backend with hot reloading and local database support
- **Steps**:
1. Sets working directory to `/workdir`
2. Copies Gradle wrapper, build files, and settings for caching
3. Downloads dependencies in a separate layer
4. Installs `curl` for health checks and `sqlite3` for local database
5. Copies the full source code
6. Creates `/database` directory
7. Normalizes line endings for shell scripts
8. Sets executable permissions for scripts
9. Exposes port 8080
10. Starts the application using `entrypoint.sh`, which seeds the database if needed and runs two Gradle processes in parallel:
 - `./gradlew classes --continuous --no-daemon`
 - `./gradlew bootRun --no-daemon`

### Frontend Development Dockerfile
**Location**: [`frontend/Dockerfile.dev`](../frontend/Dockerfile.dev)

#### Features
- **Base Image**: `node:24-alpine`
- **Purpose**: Provides a development environment for the React frontend with hot reloading
- **Steps**:
1. Sets working directory to `/workdir`
2. Copies `package*.json` for dependency caching
3. Installs dependencies with `npm ci`
4. Copies the full source code
5. Exposes port 5173
6. Starts the Vite development server with hot reloading
7. File watching/polling is enabled via environment variable for container compatibility

<p align="right">(<a href="#top">back to top</a>)</p>

## Development Docker Compose Configuration
Development configuration is designed to allow changes in local source code and to reflect those changes in running containers without requiring manual rebuilds.

**Location**: [`compose.dev.yaml`](../compose.dev.yaml)

### Services
**Backend Dev (`backend_dev`)**
- **Container Name**: `sanaboksi_backend_dev`
- **Build Context**: `./backend`
- **Build Dockerfile**: [`Dockerfile.dev`](../backend/Dockerfile.dev)
- **Port**: Host `8080` mapped to container port `8080` (`8080:8080`)
- **Environment**: environment variables for Spring Boot
- **Healthcheck**: Actuator health endpoint check
- **Hot Reloading**: Enabled via Docker Compose `watch` feature
  - Syncs `./backend/src` to `/workdir/src`
  - Ignores `**/*.class` files

**Frontend Dev (`frontend_dev`)**
- **Container Name**: `sanaboksi_frontend_dev`
- **Build Context**: `./frontend`
- **Build Dockerfile**: [`Dockerfile.dev`](../frontend/Dockerfile.dev)
- **Port**: Host `5173` mapped to container port `5173` (`5173:5173`)
- **Environment**: environment variables for Vite
- **Dependencies**: Waits for `backend_dev` health check
- **Hot Reloading**: Enabled via Docker Compose `watch` feature
  - Syncs `./frontend` to `/workdir`
  - Ignores `node_modules/`

### Usage
```bash
# To start containers in watch mode
docker compose -f compose.dev.yaml up --watch
```
```bash
# To stop and remove containers
docker compose -f compose.dev.yaml down
```
```bash
# To stop and remove containers, remove created images
docker compose -f compose.dev.yaml down --rmi local
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Hot Reloading In Development
Hot reloading enables developers to make changes in local source code and have them reflected in the running containers.

### Backend Hot Reloading
**Method**: Spring Boot DevTools + Gradle Continuous Compilation

**How it works**:
1. Developer edits `.java` file on host machine
2. Docker Compose `watch` syncs file to container
3. Gradle's `--continuous` mode detects change and recompiles to `.class`
4. Spring Boot DevTools detects new `.class` file
5. Application automatically restarts

**Configuration**:
- DevTools enabled in `application-dev.yaml`
- DevTools dependency: `developmentOnly` scope in [`build.gradle`](../backend/build.gradle)
- File syncing: `develop.watch` in [`compose.dev.yaml`](../compose.dev.yaml)

### Frontend Hot Reloading
**Method**: Vite Dev Server + File Polling

**How it works**:
1. Developer edits source file on host machine
2. Docker Compose `watch` syncs file to container
3. Vite detects change via polling (enabled for containers)
4. Browser hot-reloads automatically

**Configuration**:
- Polling enabled via `VITE_USE_POLLING=true` in [`compose.dev.yaml`](../compose.dev.yaml)
- Vite config: [`vite.config.ts`](../frontend/vite.config.ts)
- File syncing: `develop.watch` in [`compose.dev.yaml`](../compose.dev.yaml)

<p align="right">(<a href="#top">back to top</a>)</p>

## Backend Entrypoint Script
The backend containers (both production and development) use an entrypoint script, [`entrypoint.sh`](../backend/entrypoint.sh), to handle environment setup, database initialization, and application startup logic. This script ensures the container starts with the correct Spring profile and database state for each environment.

### Spring Profile Detection
- Reads the `SPRING_PROFILES_ACTIVE` environment variable to determine which profile (`local-dev`, `local-prod`, `test`, or `azure`) is active

### Database Initialization
- For local development (`local-dev`), local production (`local-prod`), and test (`test`) profiles, the script checks if the SQLite database file exists at the path specified by `SQLITE_DB_PATH`
  - If the database does not exist, it runs the reseed script to initialize and seed the database
- For the `azure` profile, the script verifies that all required Azure SQL environment variables (`SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`) are set before starting the application

### Application Startup
- With development (`local-dev`) profile, starts two Gradle processes in parallel for hot reloading:
  - `./gradlew classes --continuous --no-daemon`
  - `./gradlew bootRun --no-daemon`
- With production (`local-prod` and `azure`) or test (`test`) profiles, starts the application with `java -jar backend_build.jar`

<p align="right">(<a href="#top">back to top</a>)</p>

*Docs have been written with the help of AI*