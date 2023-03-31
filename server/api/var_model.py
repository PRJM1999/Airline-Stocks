import pandas as pd
import numpy as np
import statsmodels.api as sm
from statsmodels.tsa.api import VAR
from abc import ABC, abstractmethod

class DataSource(ABC):

    @abstractmethod
    def get_data(self):
        pass

class CSVDataSource(DataSource):
    def __init__(self, file_path, column_name):
        self.file_path = file_path
        self.column_name = column_name

    def get_data(self):
        data = pd.read_csv(self.file_path, index_col=0)
        data = data.rename(columns={"value": self.column_name})
        return data

# Need to set up class below to take off alpha vantage API class
class OnlineApiDataSource(DataSource):

    def get_data(self):
        pass
  

class DataPreprocessor:
    def __init__(self, data_sources):
        self.data_sources = data_sources

    def get_preprocessed_data(self):
        data_frames = [source.get_data() for source in self.data_sources]
        df = pd.concat(data_frames, axis=1, join="inner")
        return df

class TimeSeriesModel:
    def fit(self, data):
        pass

    def forecast(self, steps):
        pass

class VARModel(TimeSeriesModel):
    def __init__(self, maxlags=10):
        self.maxlags = maxlags

    def fit(self, data):
        model = VAR(data)
        results = model.select_order(maxlags=self.maxlags)
        optimal_lag_order = results.aic
        fitted_model = model.fit(optimal_lag_order)
        self.fitted_model = fitted_model
        self.optimal_lag_order = optimal_lag_order

    def forecast(self, steps, data):
        most_recent_observations = data.values[-self.optimal_lag_order:]
        forecast = self.fitted_model.forecast(most_recent_observations, steps=steps)
        return forecast