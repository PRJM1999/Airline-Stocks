#include "../include/black_scholes.hpp"
#include <iostream>
#include <cmath>

// Function to calculate the cumulative distribution function (CDF) of the standard normal distribution
double calculateCDF(double x) {
    return 0.5 * erfc(-x * M_SQRT1_2);
}

// Function to calculate the Black-Scholes call option price
double calculateCallOptionPrice(const OptionData& optionData) {
    double S = optionData.spotPrice;
    double K = optionData.strikePrice;
    double r = optionData.riskFreeRate;
    double sigma = optionData.volatility;
    double T = optionData.timeToMaturity;

    double d1 = (log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * sqrt(T));
    double d2 = d1 - sigma * sqrt(T);

    double callPrice = S * calculateCDF(d1) - K * exp(-r * T) * calculateCDF(d2);
    return callPrice;
}

// Function to calculate the Black-Scholes put option price
double calculatePutOptionPrice(const OptionData& optionData) {
    double S = optionData.spotPrice;
    double K = optionData.strikePrice;
    double r = optionData.riskFreeRate;
    double sigma = optionData.volatility;
    double T = optionData.timeToMaturity;

    double d1 = (log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * sqrt(T));
    double d2 = d1 - sigma * sqrt(T);

    double putPrice = K * exp(-r * T) * calculateCDF(-d2) - S * calculateCDF(-d1);
    return putPrice;
}

// int main() {
//     // Set up the option data
//     OptionData optionData;
//     optionData.spotPrice = 30.0;
//     optionData.strikePrice = 40.0;
//     optionData.riskFreeRate = 0.01;
//     optionData.volatility = 0.3;
//     optionData.timeToMaturity = 240.0 / 365.0;

//     // Calculate the call option price
//     double callPrice = calculateCallOptionPrice(optionData);
//     std::cout << "Call option price: " << callPrice << std::endl;

//     // Calculate the put option price
//     double putPrice = calculatePutOptionPrice(optionData);
//     std::cout << "Put option price: " << putPrice << std::endl;

//     return 0;
// }

