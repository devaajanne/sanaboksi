# Java JDK base image for build
FROM eclipse-temurin:25-jdk AS build
# Working directory inside the image
WORKDIR /workdir
# Copy Gradle wrapper and build configuration first for better caching
COPY gradlew .
COPY build.gradle* .
COPY settings.gradle* .
COPY gradle ./gradle/
# Download dependencies in a separate layer for caching
RUN chmod +x ./gradlew && ./gradlew --no-daemon dependencies
# Copy source code to working directory
COPY . .
# Build the app without running clean to preserve build caches
RUN chmod +x ./gradlew && ./gradlew --no-daemon bootJar

# Java JRE base image for run
FROM eclipse-temurin:25-jre AS run
# Working directory and database directory inside the image
WORKDIR /workdir
RUN mkdir -p /database
# Install curl for healthcheck and SQLite for database
RUN apt update && apt install -y --no-install-recommends curl sqlite3 && rm -rf /var/lib/apt/lists/*
# Copy built .jar, database init file and entrypoint script from build stage
COPY --from=build /workdir/build/libs/*.jar backend_build.jar
COPY --from=build /workdir/src/main/resources/databaseInit ./databaseInit
COPY entrypoint.sh ./entrypoint.sh
# Normalize line endings
RUN sed -i 's/\r$//' /workdir/entrypoint.sh /workdir/databaseInit/reseed_database.sh
# Grant needed permissions
RUN chmod +x /workdir/entrypoint.sh /workdir/databaseInit/reseed_database.sh
# Expose port
EXPOSE 8080
# Start with correct profile
CMD ["./entrypoint.sh"]