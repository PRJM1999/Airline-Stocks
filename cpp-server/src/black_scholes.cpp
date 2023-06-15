#include "../include/black_scholes.hpp"
#include <iostream>
#include <cmath>

// Function to calculate the cumulative distribution function (CDF) of the standard normal distribution
double calculateCDF(double x) {
    return 0.5 * erfc(-x * M_SQRT1_2);
}

// Function to calculate the Black-Scholes call option price
double blackScholesCallOption(double S, double K, double r, double sigma, double T) {

    double d1 = (log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * sqrt(T));
    double d2 = d1 - sigma * sqrt(T);

    double callPrice = S * calculateCDF(d1) - K * exp(-r * T) * calculateCDF(d2);
    return callPrice;
}

