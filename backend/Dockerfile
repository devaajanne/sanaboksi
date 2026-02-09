# Java JDK base image for build
FROM eclipse-temurin:25-jdk AS build
# Working directory inside the image
WORKDIR /app
# Copy Gradle wrapper and build configuration first for better caching
COPY gradlew ./
COPY gradle ./gradle/
COPY build.gradle* settings.gradle* ./
# Download dependencies in a separate layer to leverage Docker cache
RUN chmod +x ./gradlew && ./gradlew --no-daemon dependencies
# Copy source code to working directory
COPY . .
# Build the app without running clean to preserve build caches
RUN ./gradlew --no-daemon bootJar

# Java JRE base image for run
FROM eclipse-temurin:25-jre AS run
# Working directory inside the image
WORKDIR /app
# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
# Copy built .jar file from build stage
COPY --from=build /app/build/libs/*.jar backend_build.jar
# Expose port
EXPOSE 8080
# Command to run the build
CMD ["java", "-jar", "backend_build.jar"]