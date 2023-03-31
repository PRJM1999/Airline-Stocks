from flask import Flask 
from flask_cors import CORS
from api.modelhandler import model_handler 

# Create App
app = Flask(__name__)

# Initialise API
model_handler.init_app(app)

# Enable CORS
CORS(app)

# create test route
@app.route('/')
def index():
    return "Server is running"
