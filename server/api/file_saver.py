import json
from flask_restful import Api, Resource
from flask import jsonify
from datetime import datetime

import os

class ForecastFileSaver:
    def __init__(self):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        self.file_path = os.path.join(current_dir, "forecast.json")

    def save_forecast_to_json(self, forecast_data):
        """
        Saves forecast data to a JSON file in the same folder as the current Python file
        and sets the date to the current date and time
        """
        formatted_data = {'forecast': forecast_data.tolist()}
        formatted_data['date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        with open(self.file_path, 'w') as file:
            json.dump(formatted_data, file)

file_saver = Api()

class InitialData(Resource):

    def get(self):
        """
        Retrieves the forecast data from the JSON file located in the same folder as the current Python file
        """
        current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(current_dir, "forecast.json")

        with open(file_path, 'r') as file:
            data = json.load(file)
            return jsonify(data)

file_saver.add_resource(InitialData, "/initial_data")