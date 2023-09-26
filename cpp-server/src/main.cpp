#include <iostream>
#include <cpprest/http_listener.h>
#include <cpprest/json.h>
#include "../include/monte_carlo_option.hpp"
#include "../include/black_scholes.hpp"

using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;

void handleMonteCarloCallOption(const http_request &request)
{
    // Enable CORS
    http_response response;
    response.headers().add("Access-Control-Allow-Origin", "*");
    response.headers().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers().add("Access-Control-Allow-Headers", "Content-Type");
    response.headers().add("Content-Type", "application/json");
    response.headers().add("Access-Control-Allow-Credentials", "true");
    response.headers().add("Access-Control-Max-Age", "86400");

    if (request.method() == methods::OPTIONS)
    {
        // Respond to preflight requests
        response.headers().add("Allow", "GET, POST, OPTIONS");
        response.headers().add("Content-Length", "0");
        // response set status code
        response.set_status_code(status_codes::OK);
        request.reply(response);
        return;
    }

    json::value responseJson;

    json::value requestBody = request.extract_json().get();

    // console log the request body
    std::cout << "requestBody: " << requestBody << std::endl;

    // Retrieve the required parameters from the request
    double S, K, r, sigma, T;
    int numSimulations;
    try
    {
        S = requestBody["stockPrice"].as_double();
        K = requestBody["strikePrice"].as_double();
        r = requestBody["interestRate"].as_double();
        sigma = requestBody["volatility"].as_double();
        T = requestBody["timeToMaturity"].as_double();
        numSimulations = requestBody["numSimulations"].as_integer();
    }
    catch (const std::exception &e)
    {
        std::cout << "Error retrieving request parameters: " << e.what() << std::endl;
        // You can choose to handle the error here, e.g., by setting an appropriate response and returning
        return;
    }

    // Calculate the call option price using Monte Carlo simulation
    double optionPrice = monteCarloCallOption(S, K, r, sigma, T, numSimulations);

    // Set the response JSON object
    responseJson[U("optionPrice")] = json::value::number(optionPrice);

    response.set_status_code(status_codes::OK);
    response.set_body(responseJson);

    // Send the response
    request.reply(response);
}

void handleBlackScholes(const http_request &request)
{
    // Enable CORS
    http_response response;
    response.headers().add("Access-Control-Allow-Origin", "*");
    response.headers().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers().add("Access-Control-Allow-Headers", "Content-Type");
    response.headers().add("Content-Type", "application/json");

    if (request.method() == methods::OPTIONS)
    {
        // Respond to preflight requests
        response.headers().add("Content-Length", "0");
        // response set status code
        response.set_status_code(status_codes::OK);
        request.reply(response);
        return;
    }

    json::value responseJson;

    json::value requestBody; 
    request.extract_json().then([&](pplx::task<json::value> task) {
        try {
            requestBody = task.get();
            std::cout << "requestBodyAsync: " << requestBody << std::endl;
        } catch(const std::exception &e) {
            std::cout << "Error extracting json: " << e.what() << std::endl;
        }
    }).wait();

    // Retrieve the required parameters from the request
    double S, K, r, sigma, T;
    int numSimulations;
    try
    {
        S = requestBody["stockPrice"].as_double();
        K = requestBody["strikePrice"].as_double();
        r = requestBody["interestRate"].as_double();
        sigma = requestBody["volatility"].as_double();
        T = requestBody["timeToMaturity"].as_double();
    }
    catch (const std::exception &e)
    {
        std::cout << "Error retrieving request parameters: " << e.what() << std::endl;
        return;
    }

    // print all variables
    std::cout << "S: " << S << std::endl;
    std::cout << "K: " << K << std::endl;
    std::cout << "r: " << r << std::endl;
    std::cout << "sigma: " << sigma << std::endl;
    std::cout << "T: " << T << std::endl;

    // Calculate the call option price using the Black-Scholes formula
    double optionPrice = blackScholesCallOption(S, K, r, sigma, T);

    // Set the response JSON object
    responseJson[U("optionPrice")] = json::value::number(optionPrice);

    response.set_status_code(status_codes::OK);
    response.set_body(responseJson);

    // Send the response
    request.reply(response);
}

int main()
{
    // Create listener for monte_carlo endpoint
    utility::string_t monte_carlo_address = U("http://0.0.0.0:2000/monte_carlo");
    http_listener listener1(monte_carlo_address);

    // Create listener for black_scholes endpoint
    utility::string_t black_scholes_address = U("http://0.0.0.0:2000/black_scholes");
    http_listener listener2(black_scholes_address);

    listener1.support(methods::POST, handleMonteCarloCallOption);
    listener1.support(methods::OPTIONS, handleMonteCarloCallOption);

    listener2.support(methods::POST, handleBlackScholes);
    listener2.support(methods::OPTIONS, handleBlackScholes);

    // Start the listener
    try
    {
        listener1.open().wait();
        listener2.open().wait();
        std::cout << "Server is listening..." << std::endl;
        while (true)
            ;
    }
    catch (const std::exception &e)
    {
        std::cout << e.what() << std::endl;
    }

    return 0;
}