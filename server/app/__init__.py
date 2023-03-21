from flask import Flask, g
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
import os
from app.routes import user_routes
from app.routes.users import user_routes
from app.models.User import User

load_dotenv()

app = Flask(__name__)
app.register_blueprint(user_routes, url_prefix="/users")
CORS(app)

@app.before_request
def set_user_model():
    if not hasattr(g, 'user_model'):
        g.user_model = User()

@app.route('/')
def index():
    return {"welcome":"Welcome to the PlatePal API"}

