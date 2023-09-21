# Builder stage
FROM node:19-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Testing stage
FROM node:19-alpine as tester
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# No CMD here since we'll override it when we run the container

# Production stage
FROM nginx:1.19.0
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]