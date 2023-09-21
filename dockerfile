# Builder stage
FROM node:19-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
# Exclude test files/directories when copying if needed
COPY . .
RUN npm run build

# Testing stage
FROM node:19-alpine as tester
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# No CMD here since we'll override it when we run the container for tests

# Production stage using nginx
FROM nginx:1.19.0 AS production-ready
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
