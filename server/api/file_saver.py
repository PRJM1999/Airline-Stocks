import json
from flask_restful import Api, Resource
from flask import jsonify
from datetime import datetime

class ForecastFileSaver:
    def __init__(self):
        self.file_path = "server/data/forecast.json"

    def save_forecast_to_json(self, forecast_data):
        """
        Saves forcast data to a json file at the specified path 
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
        Takes the forecast.json file and returns the data in it
        """
        with open("server/data/forecast.json", 'r') as file:
            data = json.load(file)
            return jsonify(data)


file_saver.add_resource(InitialData, "/initial_data")