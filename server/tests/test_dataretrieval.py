import os
import pandas as pd
import pytest
from dotenv import load_dotenv
from api.data_retrieval import PricesFetcher, QuandlPricesFetcher, AlphaVantagePricesFetcher

# Note: Server is currently only using AlphaVantagePricesFetcher

class TestAlphaVantagePricesFetcher:
    
    @pytest.fixture(autouse=True)
    def setup(self):
        load_dotenv()  # Load environment variables from .env file
        self.symbol = 'AAPL'  # Use Apple stock symbol for testing
        self.fetcher = AlphaVantagePricesFetcher()  # Create an instance of the AlphaVantagePricesFetcher
        
    def test_instance(self):
        assert isinstance(self.fetcher, PricesFetcher)  # Check if AlphaVantagePricesFetcher is an instance of PricesFetcher
        
    def test_get_prices(self):
        df = self.fetcher.get_prices(self.symbol)  # Fetch the prices for Apple stock symbol
        
        assert isinstance(df, pd.DataFrame)  # Check if the result is a pandas DataFrame
        assert df.columns[0] == self.symbol  # Check if the column name is the same as the stock symbol
        assert len(df) == 100  # Check if the length of the DataFrame is 100
