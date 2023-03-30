'''import pytest
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

def user_model(test_db):
    return User("users", test_db)


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
def correct_user_data():
    return {
        "email": "testuser@example.com",
        "password": "testpassword",
        "first_name": "Test",
        "last_name": "User",
        "daily_calorie_target": 2000
    }

@pytest.fixture
def created_user(user_model, correct_user_data):
    return user_model.create(correct_user_data)

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
    '''
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

# Create a user model for testing
@pytest.fixture
def user_model(test_db):
    return User("users", test_db)

# Define user data for testing
@pytest.fixture
def correct_user_data():
    return {
        "email": "testuser@example.com",
        "password": "testpassword",
        "first_name": "Test",
        "last_name": "User",
        "daily_calorie_target": 2000
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

# Create a user for testing
@pytest.fixture
def created_user(user_model, correct_user_data):
    return user_model.create(correct_user_data)


# Tests for user model
def test_create_user(test_db, user_model, correct_user_data):
    inserted_id = user_model.create(correct_user_data)
    assert inserted_id is not None

def test_get_user(test_db, user_model, created_user):
    user = user_model.get(str(created_user["_id"]))
    assert user is not None
    assert user["_id"] == created_user["_id"]

def test_update_user(test_db, user_model, created_user, update_user_data):
    modified_count = user_model.update(str(created_user["_id"]), update_user_data)
    assert modified_count == 1

    user = user_model.get(str(created_user["_id"]))
    assert user["daily_calorie_target"] == 2500

def test_delete_user(test_db, user_model, created_user):
    deleted_count = user_model.delete(str(created_user["_id"]))
    assert deleted_count == 1
