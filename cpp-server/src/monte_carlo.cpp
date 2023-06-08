#include <iostream>
#include <cmath>
#include <random>

// Function to calculate the price of a European put option using Monte Carlo simulation
double monteCarloPutOption(double S, double K, double r, double sigma, double T, int numSimulations) {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::normal_distribution<> distribution(0.0, 1.0);

    double sumPayoff = 0.0;
    for (int i = 0; i < numSimulations; ++i) {
        double epsilon = distribution(gen);
        double ST = S * std::exp((r - 0.5 * sigma * sigma) * T + sigma * std::sqrt(T) * epsilon);
        double payoff = std::max(K - ST, 0.0);
        sumPayoff += payoff;
    }

    double optionPrice = std::exp(-r * T) * (sumPayoff / numSimulations);
    return optionPrice;
}

int main() {
    double S = 30.0;      // Stock price
    double K = 40.0;      // Strike price
    double r = 0.01;       // Risk-free interest rate
    double sigma = 0.3;    // Volatility
    double T = 240.0 / 365;        // Time to maturity
    int numSimulations = 1000000;

    double optionPrice = monteCarloPutOption(S, K, r, sigma, T, numSimulations);
    std::cout << "Put option price: " << optionPrice << std::endl;

    return 0;
}

