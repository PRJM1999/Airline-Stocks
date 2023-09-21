# Use an official Node.js runtime as a parent image
FROM node:19-alpine as builder

# Set the working directory to /app
WORKDIR /app

# Copy the package.json file to the working directory
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the frontend application
RUN npm run build

# Use an official Nginx runtime as a parent image
FROM nginx:1.19.0

# Copy the custom nginx conf file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the builder image to the Nginx root directory
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]