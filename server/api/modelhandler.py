from flask_restful import Api, Resource
from flask import Flask, request, jsonify, make_response, send_from_directory, send_file
from api.data_retrieval import AlphaVantagePricesFetcher
from api.var_model import VARModel
import pandas as pd

model_handler = Api()

class ModelForcast(Resource):

    def get(self):
        """
        Return the forecast for a given model
        """
        alpha_vantage_fetcher = AlphaVantagePricesFetcher()

        american_airlines_prices = alpha_vantage_fetcher.get_prices("AAL")
        sp_500_index = alpha_vantage_fetcher.get_prices("SPY")
        oil_prices = alpha_vantage_fetcher.get_prices("WTI")

        preprocessed_data = pd.concat([american_airlines_prices, sp_500_index, oil_prices], axis=1)

        var_model = VARModel()
        var_model.fit(preprocessed_data)

        forecast = var_model.forecast(10, preprocessed_data)

        return jsonify({'forecast': forecast.tolist()})


model_handler.add_resource(ModelForcast, "/model")




