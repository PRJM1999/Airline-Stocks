from flask import Flask, jsonify, request
from flask_restful import Api, Resource
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

rest_api_var = Api()

# Define the historical data for the stocks
data = {
    'RYAAY': pd.read_csv('RYAAY.csv', index_col='Date', parse_dates=True),
    'EJTTF': pd.read_csv('EJTTF.csv', index_col='Date', parse_dates=True),
    'AAL': pd.read_csv('AAL.csv', index_col='Date', parse_dates=True)
}

# Define the weights of the stocks in the portfolio
weights = {
    'RYAAY': 0.4,
    'EJTTF': 0.3,
    'AAL': 0.3
}

# Define the confidence level for the VaR calculation
conf_level = 0.95

class VarModel(Resource):

    def post(self):
        # Get the portfolio value and time horizon from the request
        data = request.get_json()
        value = data['value']
        time_horizon = data['time_horizon']

        # Calculate the daily returns for each stock
        daily_returns = pd.DataFrame()
        for stock in weights.keys():
            daily_returns[stock] = data[stock]['Close'].pct_change()

        # Calculate the portfolio returns
        portfolio_returns = daily_returns.dot(pd.Series(weights))

        # Calculate the mean and standard deviation of the portfolio returns
        mean_return = portfolio_returns.mean()
        std_dev = portfolio_returns.std()

        # Calculate the VaR for the portfolio
        z_score = np.abs(np.round(stats.norm.ppf(1 - conf_level), 2))
        var = value * time_horizon * (mean_return - z_score * std_dev)

        # Generate a histogram of the portfolio returns
        plt.hist(portfolio_returns, bins=50)
        plt.xlabel('Daily Returns')
        plt.ylabel('Frequency')
        plt.title('Portfolio Returns Histogram')
        plt.axvline(var, color='r', linestyle='dashed', linewidth=1)
        plt.savefig('portfolio_returns.png')

        # Return the VaR and the histogram image path
        return jsonify({'var': var, 'histogram_path': 'portfolio_returns.png'})