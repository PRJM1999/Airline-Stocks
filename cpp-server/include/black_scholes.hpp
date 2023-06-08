#ifndef BLACK_SCHOLES_H
#define BLACK_SCHOLES_H

#include <cmath>

// Constants
const double PI = 3.14159265358979323846;

// Option data structure
struct OptionData {
    double spotPrice;   // Current price of the underlying asset
    double strikePrice; // Strike price of the option
    double riskFreeRate; // Risk-free interest rate
    double volatility;  // Volatility of the underlying asset
    double timeToMaturity; // Time to option expiration (in years)
};

// Function to calculate the Black-Scholes call option price
double calculateCallOptionPrice(const OptionData& optionData);

// Function to calculate the Black-Scholes put option price
double calculatePutOptionPrice(const OptionData& optionData);

#endif // BLACK_SCHOLES_H
