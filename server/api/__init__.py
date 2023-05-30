from flask import Flask 
from flask_cors import CORS
from api.modelhandler import model_handler 
from api.file_saver import file_saver

# Create App
app = Flask(__name__)

# Initialise API
model_handler.init_app(app)
file_saver.init_app(app)

# Enable CORS
CORS(app)


@app.route('/')
def index():
    """
    Test route to check server is running.
    """
    return "Server is running"
