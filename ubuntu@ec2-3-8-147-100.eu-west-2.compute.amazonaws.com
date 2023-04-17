version: '3'

services:
  backend:
    image: pmontgomery27/python-backend-docker
    ports:
      - "3000:3000"
    replicas: 1
  frontend:
    container_name: docker-react-c
    image: pmontgomery27/docker-react-i
    ports:
      - "80:80"
    environment:
      - WATCHPACK_POLLING=true
    volumes:
      - /app/node_modules
      - .:/app
    replicas: 1
