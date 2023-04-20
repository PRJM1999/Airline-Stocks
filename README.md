# Website Project

## Overview
This project is a website for analyzing airline stocks. It can be reached at [airlinestock.co.uk](https://airlinestock.co.uk). It consists of a frontend and a backend. The frontend is written in TypeScript using React and Redux with Tailwind and is served using Nginx. The backend is written in Python and is served using Gunicorn. Its main function is to provide information on airline stocks around the world, provide articles discuss mergers and growth of major airlines, and also produce predictions using a vector autoregression model.

## Development
To start the development environment for the frontend, run `npm run dev`. To run tests for the frontend, use `npm run test`.

To run tests for the backend, use the `pytest` module.

Both the frontend and backend use Docker to build containers. These containers are available on Docker Hub.

The frontend image is called `pmontgomery27/docker-react-i`.

The backend image is called `pmontgomery27/python-backend-docker`.

A main Docker Compose file runs them. To start the entire application using Docker Compose, navigate to the directory containing the `docker-compose.yml` file and run `docker-compose up`.

## SSL Certification
SSL certification has not been added at this point in order to maximize development productivity. However, it will be added in the future when the website reaches a certain quality.

## API Bottleneck
The free version of the Alpha Vantage Api only allows a certain number of api requests in a time period. Due to this there may be console log error when trying to fetch VAR data from the backend.

## Future Development
The app currently uses React and client-side rendering. Future development may address any problems this causes by implementing server-side rendering or using a static site generator.