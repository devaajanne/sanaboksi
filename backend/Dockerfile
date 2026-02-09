# Java JDK base image for build
FROM eclipse-temurin:25-jdk AS build
# Working directory inside the image
WORKDIR /app
# Copy source code to working directory
COPY . /app
# Build the app
RUN chmod +x ./gradlew && ./gradlew clean bootJar

# Java JRE base image for run
FROM eclipse-temurin:25-jre AS run
# Working directory inside the image
WORKDIR /app
# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
# Copy built .jar file from build stage
COPY --from=build /app/build/libs/*.jar backend_build.jar
# Expose port
ARG BACKEND_CONTAINER_PORT
ENV BACKEND_CONTAINER_PORT=${BACKEND_CONTAINER_PORT}
EXPOSE ${BACKEND_CONTAINER_PORT}
# Command to run the build
CMD ["java", "-jar", "backend_build.jar"]