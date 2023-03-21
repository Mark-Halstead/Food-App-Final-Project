from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
import os
from app.routes import user_routes

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return {"welcome":"Welcome to the PlatePal API"}


app.register_blueprint(user_routes, url_prefix="/users")