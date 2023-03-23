from flask import Flask, g, render_template, url_for, request, session, redirect
from flask_cors import CORS
import pymongo
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
import os
from app.routes import user_routes, nutritionist_routes, product_routes, diary_routes, review_routes, message_routes, meal_plan_routes
from app.models import User, Nutritionist, Product, DailyDiaryEntry, Review, Message, MealPlanEntry

load_dotenv()

app = Flask(__name__)
app.secret_key = '\x0c\xf1\xc7$\xd6\xfa\x1d\xe2\xcdh\x82K\xed$1\xa1'
CORS(app)
app.register_blueprint(user_routes, url_prefix="/users")
app.register_blueprint(nutritionist_routes, url_prefix="/nutritionists")
app.register_blueprint(product_routes, url_prefix="/products")
app.register_blueprint(diary_routes, url_prefix="/diary_entries")
app.register_blueprint(review_routes, url_prefix="/reviews")
app.register_blueprint(message_routes, url_prefix="/messages")
app.register_blueprint(meal_plan_routes, url_prefix="/meal_plan_entries")

@app.before_request
def set_models():
    if not hasattr(g, 'user_model'):
        g.user_model = User("users")
    if not hasattr(g, 'nutritionist_model'):
        g.nutritionist_model = Nutritionist("nutritionists")
    if not hasattr(g, 'product_model'):
        g.product_model = Product("products")
    if not hasattr(g, 'diary_entry_model'):
        g.diary_entry_model = DailyDiaryEntry("diary_entries")
    if not hasattr(g, 'review_model'):
        g.review_model = Review("reviews")
    if not hasattr(g, 'message_model'):
        g.message_model = Message("messages")
    if not hasattr(g, 'meal_plan_entry_model'):
        g.meal_plan_entry_model = MealPlanEntry("meal_plan_entries")



# # Database test
# client = pymongo.MongoClient('localhost', 27017)
# db = client.user_login_system

# Routes to be moved
@app.route('/')
def index():
    return {"welcome":"Welcome to the PlatePal API"}


@app.route('/test')
def home():
    return render_template("home.html")


@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")
