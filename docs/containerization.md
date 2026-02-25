<a id="top"></a>

# Containerization Documentation

<ol>
    <li>
      <a href="#overview">Overview</a>
    </li>
    <li>
      <a href="#environment-variables">Environment Variables</a>
    </li>
    <li>
      <a href="#docker-compose-configurations">Docker Compose Configurations</a>
    </li>
    <li>
      <a href="#production-dockerfiles">Production Dockerfiles</a>
    </li>
    <li>
      <a href="#development-dockerfiles">Development Dockerfiles</a>
    </li>
    <li>
      <a href="#hot-reloading-in-development">Hot Reloading in Development</a>
    </li>
    <li>
      <a href="#best-practices">Best Practices</a>
    </li>
</ol>

## Overview

This documentation describes the containerization strategy for the **Sanaboksi** project, which consists of a Java Spring Boot backend, React frontend, and PostgreSQL database. The project uses Docker and Docker Compose with separate configurations for production and development environments.

The containerization setup provides:
- **Production** (`compose.yaml`): Optimized multi-stage builds for deployment
- **Development** (`compose.dev.yaml`): Hot reloading with file watching for rapid development

<p align="right">(<a href="#top">back to top</a>)</p>

## Environment Variables

Environment variables are used to include sensitive and/or configurable data, and are therefore not included in version control. Below, you can find the variables and what values can be assigned to them.

**Location**: `.env` file in repository root (create using variables below if not existing)

**Contents**:
```env
### Database configurations
DATABASE_HOST_NAME=<database host name>
DATABASE_HOST_NAME_DEV=<database host name for development environment>
DATABASE_NAME=<database name>
DATABASE_NAME_DEV=<database name for development environment>
DATABASE_USER=<database user>
DATABASE_PASSWORD=<database password>

# Cors
CORS_ALLOWED_ORIGIN=<allowed origin for cors, frontend url>

### Vite configurations
VITE_USE_POLLING=<true/false>
VITE_SERVER_URL=<server url>

# Spring datasource configurations
SPRING_DATASOURCE_URL=jdbc:postgresql://${DATABASE_HOST_NAME}:5432/${DATABASE_NAME}
SPRING_DATASOURCE_URL_DEV=jdbc:postgresql://${DATABASE_HOST_NAME_DEV}:5432/${DATABASE_NAME_DEV}
```

## Docker Compose Configurations

The `Sanaboksi` project has two containerization configurations: one for production, and one for development.

### Production Configuration

Production configuration is meant to build an immutable image which can be used to run the project in a container or to deploy the project to a cloud deployment platform.

**Location**: [compose.yaml](../compose.yaml)

#### Services

**1. Database (`database`)**
- **Image**: `postgres:18.1`
- **Container Name**: `sanaboksi_database`
- **Port**: 5432
- **Volume**: Named volume `data` for persistence
- **Healthcheck**: PostgreSQL readiness check every 10s

**2. Backend (`backend`)**
- **Build Context**: `./backend`
- **Dockerfile**: `Dockerfile` (multi-stage production build)
- **Container Name**: `sanaboksi_backend`
- **Port**: 8080
- **Environment**: environment variables from `.env` for Spring Boot
- **Dependencies**: Waits for database health check
- **Healthcheck**: Actuator health endpoint check every 10s

**3. Frontend (`frontend`)**
- **Build Context**: `./frontend`
- **Dockerfile**: `Dockerfile` (Nginx-based production build)
- **Container Name**: `sanaboksi_frontend`
- **Args**: args from `.env` for Vite
- **Port**: 80
- **Dependencies**: Waits for backend health check

#### Usage
```bash
# To start containers
docker compose up --build
```
```bash
# To stop and remove containers and volumes
docker compose down -v
```
```bash
# To stop and remove containers, created images and volumes
docker compose down --rmi local -v
```

### Development Configuration

Development configuration is designed to allow changes in local source code and to reflect those changes in running containers without requiring manual rebuilds.

**Location**: [compose.dev.yaml](../compose.dev.yaml)

#### Services

**1. Database Dev (`database_dev`)**
- Same as production but with service name `database_dev`
- **Container Name**: `sanaboksi_database_dev`
- **Volume**: Named volume `data_dev` for isolation from production

**2. Backend Dev (`backend_dev`)**
- **Build Context**: `./backend`
- **Dockerfile**: `Dockerfile.dev` (JDK with continuous compilation)
- **Container Name**: `sanaboksi_backend_dev`
- **Port**: 8080
- **Environment**: environment variables from `.env` for Spring Boot
- **Hot Reloading**: Enabled via Docker Compose `watch` feature
  - Syncs `./backend/src` to `/workdir/src`
  - Ignores `**/*.class` files
- **Dependencies**: Waits for database_dev health check
- **Healthcheck**: Longer start period (30s) for dev environment

**3. Frontend Dev (`frontend_dev`)**
- **Build Context**: `./frontend`
- **Dockerfile**: `Dockerfile.dev` (Node with Vite dev server)
- **Container Name**: `sanaboksi_frontend_dev`
- **Port**: 5173
- **Hot Reloading**: Enabled via Docker Compose `watch` feature
  - Syncs `./frontend` to `/workdir`
  - Ignores `node_modules/`
- **Dependencies**: Waits for backend_dev health check

#### Usage
```bash
# To start containers in watch mode
docker compose -f compose.dev.yaml up --watch
```
```bash
# To stop and remove containers and volumes
docker compose -f compose.dev.yaml down -v
```
```bash
# To stop and remove containers, created images and volumes
docker compose -f compose.dev.yaml down --rmi local -v
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Production Dockerfiles

### Backend Production Build

**Location**: [backend/Dockerfile](../backend/Dockerfile)

#### Multi-stage Build Process

**Stage 1: Build**
- **Base Image**: `eclipse-temurin:25-jdk`
- **Purpose**: Compiles and builds the Spring Boot application
- **Steps**:
  1. Copies Gradle wrapper and build files for caching
  2. Downloads dependencies in separate layer
  3. Copies source code
  4. Runs `./gradlew bootJar` to create executable JAR

**Stage 2: Run**
- **Base Image**: `eclipse-temurin:25-jre`
- **Purpose**: Runs the Spring Boot application
- **Steps**:
  1. Installs curl for healthchecks
  2. Copies built JAR from build stage
  3. Exposes port 8080 (Spring Boot default)
  4. Runs application with `java -jar`

### Frontend Production Build

**Location**: [frontend/Dockerfile](../frontend/Dockerfile)

#### Multi-stage Build Process

**Stage 1: Build**
- **Base Image**: `node:24-alpine`
- **Purpose**: Builds the React application
- **Steps**:
  1. Copies package files for caching
  2. Runs `npm ci` to install dependencies
  3. Copies source code and adds env variables
  4. Runs `npm run build` to create production bundle

**Stage 2: Run**
- **Base Image**: `nginx:1.29.5-alpine`
- **Purpose**: Serves static files
- **Steps**:
  1. Removes default Nginx welcome page
  2. Copies built files from build stage to `/usr/share/nginx/html`
  3. Exposes port 80 (Nginx default)
  4. Starts Nginx in foreground mode

<p align="right">(<a href="#top">back to top</a>)</p>

## Development Dockerfiles

### Backend Development Build

**Location**: [backend/Dockerfile.dev](../backend/Dockerfile.dev)

#### Features
- **Base Image**: `eclipse-temurin:25-jdk` (full JDK for compilation)
- **Hot Reloading**: Runs two parallel Gradle processes:
  1. `./gradlew classes --continuous --no-daemon` - Watches and recompiles Java files
  2. `./gradlew bootRun --no-daemon --args='--spring.profiles.active=dev'` - Runs Spring Boot with DevTools and the active `dev` profile
- **Port**: port 8080 (Spring Boot default)
- **DevTools**: Spring Boot DevTools detects `.class` file changes and automatically restarts

#### Command
```bash
CMD ["sh", "-c", "./gradlew classes --continuous --no-daemon & ./gradlew bootRun --no-daemon --args='--spring.profiles.active=dev'"]
```

### Frontend Development Build

**Location**: [frontend/Dockerfile.dev](../frontend/Dockerfile.dev)

#### Features
- **Base Image**: `node:24-alpine`
- **Hot Reloading**: Runs Vite development server
- **Port**: 5173 (Vite default)
- **Polling**: Enabled via environment variable for file watching in containers

#### Command
```bash
CMD ["npm", "run", "dev", "--", "--port", "5173"]
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Application Properties

**Production**: [backend/src/main/resources/application.yaml](../backend/src/main/resources/application.yaml)
- Uses environment variables from `compose.yaml`

**Development**: [backend/src/main/resources/application-dev.yaml](../backend/src/main/resources/application-dev.yaml)
- Uses environment variables from `compose.dev.yaml`

**application.yaml contents**
```yaml
spring:
  application:
    name: backend
  server:
    address: 0.0.0.0
  datasource:
    # Datasource variables from compose
    url: ${SPRING_DATASOURCE_URL}
    username: ${SPRING_DATASOURCE_USERNAME}
    password: ${SPRING_DATASOURCE_PASSWORD}
    driver-class-name: org.postgresql.Driver
  sql:
    init:
      mode: <always/never>
      schema-locations:
        - classpath:<path to schema>
      data-locations:
        - classpath:<path to sql script files>

# Cors allowed origin from compose
CorsAllowedOrigin: ${CORS_ALLOWED_ORIGIN}
```

**application-dev.yaml contents**
```yaml
spring:
  application:
    name: backend
  server:
    address: 0.0.0.0
  datasource:
    # Datasource variables from compose
    url: ${SPRING_DATASOURCE_URL}
    username: ${SPRING_DATASOURCE_USERNAME}
    password: ${SPRING_DATASOURCE_PASSWORD}
    driver-class-name: org.postgresql.Driver
  sql:
    init:
      mode: <always/never>
      schema-locations:
        - classpath:<path to schema>
      data-locations:
        - classpath:<path to sql script files>
  devtools:
    restart:
      enabled: <true/false>
      poll-interval: 2s
      quiet-period: 1s

# Cors allowed origin from compose
CorsAllowedOrigin: ${CORS_ALLOWED_ORIGIN}
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Hot Reloading in Development

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
- DevTools enabled in `application-dev.yaml` (create if not existing, see above)
- DevTools dependency: `developmentOnly` scope in [build.gradle](../backend/build.gradle)
- File syncing: `develop.watch` in [compose.dev.yaml](../compose.dev.yaml)

### Frontend Hot Reloading

**Method**: Vite Dev Server + File Polling

**How it works**:
1. Developer edits source file on host machine
2. Docker Compose `watch` syncs file to container
3. Vite detects change via polling (enabled for containers)
4. Browser hot-reloads automatically

**Configuration**:
- Polling enabled via `VITE_USE_POLLING=true` in your `.env` file
- Vite config: [vite.config.ts](../frontend/vite.config.ts)
- File syncing: `develop.watch` in [compose.dev.yaml](../compose.dev.yaml)

<p align="right">(<a href="#top">back to top</a>)</p>

## Best Practices

1. **Use separate compose files** for production and development environments
2. **Never commit `.env` files** containing sensitive credentials to version control
3. **Use multi-stage builds** in production to minimize image size
4. **Leverage Docker layer caching** by copying dependency files before source code
5. **Use named volumes** for database persistence to prevent data loss
6. **Implement health checks** to ensure services are ready before dependent services start
7. **Use Docker Compose `watch`** instead of volume mounts for better hot reloading in development
8. **Keep build directories internal** to containers to avoid file locking conflicts
9. **Use specific image versions** (e.g., `postgres:18.1`) instead of `latest` for reproducibility

<p align="right">(<a href="#top">back to top</a>)</p>

*Docs have been written with the help of AI*