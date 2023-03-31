import requests
import json
import pandas as pd
import quandl
import os
from dotenv import load_dotenv
from flask_restful import Api, Resource
from flask import Flask, request, jsonify, make_response, send_from_directory, send_file
from data_retrieval import AlphaVantagePricesFetcher
from var_model import CSVDataSource, DataPreprocessor, VARModel
import pandas as pd
import numpy as np
import statsmodels.api as sm
from statsmodels.tsa.api import VAR
from abc import ABC, abstractmethod



class PricesFetcher(ABC):
    @abstractmethod
    def get_prices(self, symbol: str) -> pd.DataFrame:
        pass

class QuandlPricesFetcher:
    def __init__(self):
        load_dotenv()
        self.api_key = os.environ["QUANDL_API_KEY"]
        quandl.ApiConfig.api_key = self.api_key
        
    def get_prices(self, symbol: str) -> pd.DataFrame:
        data = quandl.get(symbol)
        df = pd.DataFrame(data)
        df = df.reset_index()
        df = df.rename(columns={"Date": "Timestamp", "Adj Close": "Adjusted Close"})
        df = df.set_index("Timestamp")
        df = df.sort_index()
        return df

class AlphaVantagePricesFetcher(PricesFetcher):
    def __init__(self):
        load_dotenv()
        self.api_key = os.environ["ALPHA_VANTAGE_API_KEY"]
        
    def get_prices(self, symbol: str) -> pd.DataFrame:
        os.system("sleep 5")
        url = f"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol={symbol}&apikey={self.api_key}"
        response = requests.get(url)
        data = json.loads(response.text)
        daily_data = data["Time Series (Daily)"]
        df = pd.DataFrame.from_dict(daily_data, orient="index")
        df.index = pd.to_datetime(df.index)
        df = df.astype(float)
        df = df.sort_index()
        df = df[["5. adjusted close"]]
        df = df.rename(columns={"5. adjusted close": symbol})
        return df
    


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
        data = pd.concat([data_source.get_data() for data_source in self.data_sources], axis=1)

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










alpha_vantage_fetcher = AlphaVantagePricesFetcher()

american_airlines_prices = alpha_vantage_fetcher.get_prices("AAL")
sp_500_index = alpha_vantage_fetcher.get_prices("SPY")
oil_prices = alpha_vantage_fetcher.get_prices("WTI")

preprocessed_data = pd.concat([american_airlines_prices, sp_500_index, oil_prices], axis=1)

var_model = VARModel()
var_model.fit(preprocessed_data)

forecast = var_model.forecast(10, preprocessed_data)