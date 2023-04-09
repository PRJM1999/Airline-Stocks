import pandas as pd
import numpy as np
import statsmodels.api as sm
from statsmodels.tsa.api import VAR


class TimeSeriesModel:
    def fit(self, data):
        pass

    def forecast(self, steps):
        pass

class VARModel(TimeSeriesModel):
    def __init__(self, maxlags=10):
        """
        Initalises VAR model taking default
        of 10 lags.
        """
        self.maxlags = maxlags

    def fit(self, data):
        """
        Fit the model taking the optimal lag
        by AIC.
        """
        model = VAR(data)
        results = model.select_order(maxlags=self.maxlags)
        optimal_lag_order = results.aic
        fitted_model = model.fit(optimal_lag_order)
        self.fitted_model = fitted_model
        self.optimal_lag_order = optimal_lag_order

    def forecast(self, steps, data):
        """
        Return a forcast for next 10 days
        """
        most_recent_observations = data.values[-self.optimal_lag_order:]
        forecast = self.fitted_model.forecast(most_recent_observations, steps=steps)
        return forecast