#include <iostream>
#include <cmath>
#include <random>

// Function to calculate the price of a European call option using Monte Carlo simulation
double monteCarloCallOption(double S, double K, double r, double sigma, double T, int numSimulations) {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::normal_distribution<> distribution(0.0, 1.0);

    double sumPayoff = 0.0;
    for (int i = 0; i < numSimulations; ++i) {
        double epsilon = distribution(gen);
        double ST = S * std::exp((r - 0.5 * sigma * sigma) * T + sigma * std::sqrt(T) * epsilon);
        double payoff = std::max(ST - K, 0.0);
        sumPayoff += payoff;
    }

    double optionPrice = std::exp(-r * T) * (sumPayoff / numSimulations);
    return optionPrice;
}