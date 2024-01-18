# Website Project

## Overview
This project is a website for analyzing airline stocks. It can be reached at [airlinestock.co.uk](https://airlinestock.co.uk). It consists of a frontend and a backend. The frontend is written in TypeScript using React and Redux with Tailwind and is served using Nginx. The backend is written in Python and is served using Gunicorn. Its main function is to provide information on airline stocks around the world, provide articles discuss mergers and growth of major airlines, and also produce predictions using a vector autoregression model.

[Note: airlinestock.co.uk is no longer operational due to personal server costs. The project remains as a showcase of the work done and can be used as a reference or starting point for similar projects.]

### Frontend (React Container)
The frontend is built using Vite and React and features four main pages:

1. **Home Page**: The default landing page provides an interactive map with aviation statistics, graphs comparing aviation stocks, oil prices, and S&P historical index, and an Aviation Insights section displaying fleet size by airline and aviation stock price performance for 2023.

2. **VAR (Vector Autoregression) Page**: Located at `/var`, this page displays the VAR model results used for forecasting daily updates based on data from the S&P 500 Index, global oil prices, and American Airlines stock.

3. **Options Page**: This page allows users to input data about a derivative and calculate its call price using either the Black-Scholes or Black-Scholes with Monte Carlo methods.

4. **Case Study Page**: Featuring clickable cards, this page provides historical information about different airlines. It includes a continent selection feature on the home page.

The frontend also includes unit testing using Jest for components.

### Python Backend Container

The Python Backend Container serves as the core of the application, responsible for handling data retrieval, modeling, and serving API endpoints. This container is built using Flask and provides essential functionality for the airline stock analysis project.

## Initialization (__init__.py)
- The `__init__.py` file initializes the Flask application and sets up API routes.
- It imports the `model_handler` and `file_saver` modules to initialize API endpoints.
- CORS (Cross-Origin Resource Sharing) is enabled to allow requests from different origins.

### Test Route
- The `/` route is a test route used to check if the server is running.

## Data Retrieval (data_retrieval.py)
The `data_retrieval.py` module provides data fetching functionalities using different APIs.

### PricesFetcher (Abstract Class)
- An abstract class `PricesFetcher` defines a common interface for fetching prices.

### QuandlPricesFetcher
- The `QuandlPricesFetcher` class fetches data from the Quandl API.
- It reads the API key from the environment variable and fetches historical data.
- Data is cleaned and formatted into a pandas DataFrame.

### AlphaVantagePricesFetcher
- The `AlphaVantagePricesFetcher` class fetches data from the Alpha Vantage API.
- It reads the API key from the environment variable and fetches daily time series data.
- Data is cleaned and formatted into a pandas DataFrame.

## File Saver (file_saver.py)
The `file_saver.py` module is responsible for saving forecast data to a JSON file.

### ForecastFileSaver
- The `ForecastFileSaver` class manages the saving of forecast data.
- It saves forecast data to a JSON file in the same folder as the current Python file.
- The file includes both the forecast data and the date and time of the forecast.

### InitialData API Endpoint
- The `/initial_data` API endpoint retrieves forecast data from the JSON file.
- It provides access to previously saved forecast data.

## Model Handling (modelhandler.py)
The `modelhandler.py` module handles the forecasting model and exposes an API endpoint for data analysis.

### ModelForcast API Endpoint
- The `/model` API endpoint runs the VAR (Vector Autoregression) model analysis.
- It fetches data using the `AlphaVantagePricesFetcher`, preprocesses it, and fits the VAR model.
- The forecast is saved using the `ForecastFileSaver`.
- The API response includes the forecast data and the date and time of the forecast.

## VAR Model (var_model.py)
The `var_model.py` module contains the implementation of the VAR (Vector Autoregression) model for time series forecasting.

### TimeSeriesModel (Abstract Class)
- An abstract class `TimeSeriesModel` defines a common interface for time series models.

### VARModel
- The `VARModel` class implements the VAR model.
- It allows for the fitting of the model with an optimal lag order selected using AIC.
- The model can be used for forecasting future data points.

## Docker Configuration (Dockerfile)
- The Dockerfile specifies the environment setup for the Python Backend Container.
- It includes both a testing stage and a production-ready stage.
- Dependencies are installed using `pip`.
- The Gunicorn web server is installed to serve the Flask application.
- The container exposes port 3000 for external access.

## Unit Testing
The Python Backend Container includes unit testing using the `pytest` framework to ensure the reliability and correctness of the code.

For more details on each module and its functionalities, refer to the respective Python files in the repository.

### C++ Container

The C++ Container contains the backend logic for the Airline Stocks Server. This container is responsible for calculating call option prices using both the Black-Scholes formula and Monte Carlo simulations. It exposes HTTP endpoints for making these calculations.

## Black-Scholes Calculation

### Source Files
- [black_scholes.hpp](include/black_scholes.hpp): Header file containing the Black-Scholes call option price calculation function.
- [src/black_scholes.cpp](src/black_scholes.cpp): Implementation of the Black-Scholes call option price calculation.

#### Constants
- `PI`: Mathematical constant π (pi).

#### Function
- `double blackScholesCallOption(double S, double K, double r, double sigma, double T)`: Calculates the Black-Scholes call option price using the given parameters.

## Monte Carlo Simulation

### Source Files
- [monte_carlo_option.hpp](include/monte_carlo_option.hpp): Header file containing the Monte Carlo call option price calculation function.
- [src/monte_carlo.cpp](src/monte_carlo.cpp): Implementation of the Monte Carlo call option price calculation.

#### Function
- `double monteCarloCallOption(double S, double K, double r, double sigma, double T, int numSimulations)`: Calculates the call option price using Monte Carlo simulation with the given parameters.

## Web Server

### Source Files
- [src/main.cpp](src/main.cpp): Main server application file responsible for handling HTTP requests and responses.

### Dependencies
- [cpprestsdk](https://github.com/microsoft/cpprestsdk): C++ library for building HTTP services.
- [OpenSSL](https://www.openssl.org/): Required for secure communication.

### API Endpoints

#### Monte Carlo Calculation
- `/monte_carlo`: Accepts POST requests to calculate call option prices using Monte Carlo simulations.

#### Black-Scholes Calculation
- `/black_scholes`: Accepts POST requests to calculate call option prices using the Black-Scholes formula.

### Build and Run

#### CMake Configuration
- [CMakeLists.txt](CMakeLists.txt): CMake configuration file for building the project.

#### Docker Configuration
- [Dockerfile](dockerfile): Docker configuration file to create a container for running the C++ server.

### Build Instructions

To build the C++ container, follow these steps:

1. Install required packages: The Dockerfile specifies the necessary dependencies, including the C++ development tools and libraries.

2. Copy Source Code: The Dockerfile copies the CMakeLists.txt file and the source code (src/ and include/) into the container.

3. Build the Project: The Dockerfile creates a build directory, runs CMake to configure the project, and then builds the project using `make`.

### Running the Server

The server listens on port 2000 inside the container. To run the server, execute the following command inside the container:

```bash
./build/AirlineStocksServer
```

## Development
To start the development environment for the frontend, run `npm run dev`. To run tests for the frontend, use `npm run test`.

To run tests for the backend, use the `pytest` module.

Both the frontend and backend use Docker to build containers. These containers are available on Docker Hub.

The frontend image is called `pmontgomery27/docker-react-i`.

The backend image is called `pmontgomery27/python-backend-docker`.

A main Docker Compose file runs them. To start the entire application using Docker Compose, navigate to the directory containing the `docker-compose.yml` file and run `docker-compose up`.

## API Bottleneck
The free version of the Alpha Vantage Api only allows a certain number of api requests in a time period. Due to this there may be console log error messages when trying to fetch VAR data from the backend.

## Subdomains
This project also includes subdomains for specific purposes:
- `api.airlinestock.co.uk`: This subdomain is used for API endpoints and serves data to the frontend.
- `cpp.airlinestock.co.uk`: This subdomain hosts a C++ server that handles specific tasks.

## SSL/TLS Certificates
This project uses SSL/TLS certificates to secure communication. Certificates are managed using Certbot for automatic renewal. The certificates ensure secure connections for `airlinestock.co.uk`, `api.airlinestock.co.uk`, and `cpp.airlinestock.co.uk`.

## Future Development
A foundation for the website is almost complete except server side rendering (SSR). Progression of more advanced VAR models, use of further APIs, Black Scholes derivatives are areas for further development.

## CI/CD with GitHub Actions

### Continuous Integration:

- **Frontend (React App):**
   - Build a Docker image for testing.
   - Execute React app tests using `npm run test`.

- **Backend (Python Server):**
   - Build a Docker image for backend testing.
   - Execute Python server tests using `pytest`.

- **Cpp-Server:**
   - Build a Docker image.

### Continuous Deployment:

- **Docker Images:**
   - Build and push production-ready Docker images for frontend and backend to Docker Hub.

- **Deployment to EC2:**
   - Pull the latest Docker images.
   - Deploy on an EC2 instance using Docker Compose.
   - Command to pprune docker images due to 8GB server storage limit.

Note: For more details on the CI/CD process, refer to the GitHub Actions workflow in the repository.
