from flask import Flask, g
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
import os
from app.routes import users_routes, nutritionists_routes
from app.models import User, Nutritionist

load_dotenv()

app = Flask(__name__)
CORS(app)
app.register_blueprint(users_routes, url_prefix="/users")
app.register_blueprint(nutritionists_routes, url_prefix="/nutritionists")

@app.before_request
def set_models():
    if not hasattr(g, 'user_model'):
        g.user_model = User()
    if not hasattr(g, 'nutritionist_model'):
        g.nutritionist_model = Nutritionist()

@app.route('/')
def index():
    return {"welcome":"Welcome to the PlatePal API"}

