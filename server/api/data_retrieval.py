import requests
import json
import pandas as pd
from abc import ABC, abstractmethod
import quandl
import os
from dotenv import load_dotenv


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