import pytest
from app import app as flask_app
from app.models import User
from app.db import get_connection
import os
from dotenv import load_dotenv

load_dotenv()

# Create a test client for your Flask app
@pytest.fixture
def app():
    return flask_app

# Create a test client for your Flask app
@pytest.fixture
def client(app):
    with app.test_client() as test_client:
        yield test_client

# Create a test database connection
@pytest.fixture
def test_db():
    return get_connection("TEST_DB_URL")

# Clean up the test database after each test
@pytest.fixture(autouse=True)
def clean_up(test_db):
    yield
    for collection in test_db.list_collection_names():
        test_db.drop_collection(collection)


## users data 
@pytest.fixture
def correct_user_data():
    return {
        "email": "testuser@example.com",
        "password": "testpassword",
        "first_name": "Test",
        "last_name": "User",
        "paid_subscription": True,
        "weight": 70,
        "age": 30,
        "height": 170,
        "goal": "lose weight",
        "activity_level": "moderate",
        "dietary_restrictions": ["vegan"],
        "food_preferences": ["Italian"],
        "daily_calorie_target": 2000,
        "meal_complexity": "easy",
        "budget": "medium"
    }

@pytest.fixture
def incorrect_user_data():
    return {
        "email": "testuser@example.com",
        "password": "testpassword",
        "first_name": "Test",
        "last_name": "User",
        "weight": 70,
        "age": 30,
        "height": 170,
        "goal": "lose weight",
        "activity_level": "moderate",
        "dietary_restrictions": ["vegan"],
        "food_preferences": ["Italian"],
        "daily_calorie_target": 2000,
        "meal_complexity": "easy",
        "budget": "medium"
    }

@pytest.fixture
def update_user_data():
    return {
        "weight": 70,
        "age": 30,
        "goal": "lose weight",
        "activity_level": "moderate",
        "dietary_restrictions": ["vegan"],
        "food_preferences": ["Italian"],
        "daily_calorie_target": 2500,
    }