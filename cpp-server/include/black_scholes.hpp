#ifndef BLACK_SCHOLES_H
#define BLACK_SCHOLES_H
#include <cmath>

// Constants
const double PI = 3.14159265358979323846;

// Function to calculate the Black-Scholes call option price
double blackScholesCallOption(double S, double K, double r, double sigma, double T);

#endif // BLACK_SCHOLES_H
