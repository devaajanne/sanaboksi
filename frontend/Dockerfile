# Node base image for build
FROM node:24-alpine AS build
# Working directory inside the image
WORKDIR /workdir
# Copy package files to working directory
COPY package*.json .
# Install npm dependencies
RUN npm ci
# Copy source code to working directory
COPY . .
# Build the app
RUN npm run build

# Nginx base image for run
FROM nginx:1.29.5-alpine AS run
# Working directory (nginx default document root) inside the image
WORKDIR /usr/share/nginx/html
# Remove nginx default welcome page
RUN rm -rf ./*
# Copy all built frontend files from build stage
COPY --from=build /workdir/dist .
# Expose nginx default HTTP port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]