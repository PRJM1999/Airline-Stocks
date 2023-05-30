from flask_restful import Api, Resource
from flask import Flask, request, jsonify, make_response, send_from_directory, send_file
from api.data_retrieval import AlphaVantagePricesFetcher
from api.var_model import VARModel
import pandas as pd
from api.file_saver import ForecastFileSaver
from datetime import datetime

model_handler = Api()

class ModelForcast(Resource):

    def get(self):
        """
        Run the analysis, saves the forcast to a json file, 
        cleans the data, adds the date and returns the data.
        """
        alpha_vantage_fetcher = AlphaVantagePricesFetcher()

        american_airlines_prices = alpha_vantage_fetcher.get_prices("AAL")
        sp_500_index = alpha_vantage_fetcher.get_prices("SPY")
        oil_prices = alpha_vantage_fetcher.get_prices("WTI")

        preprocessed_data = pd.concat([american_airlines_prices, sp_500_index, oil_prices], axis=1)

        var_model = VARModel()
        var_model.fit(preprocessed_data)

        forecast = var_model.forecast(10, preprocessed_data)
        ForecastFileSaver().save_forecast_to_json(forecast)

        forecast = {'forecast': forecast.tolist()}
        forecast['date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        return jsonify(forecast)


model_handler.add_resource(ModelForcast, "/model")




