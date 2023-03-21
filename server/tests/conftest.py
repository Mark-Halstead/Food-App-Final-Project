import pytest
from app import app as flask_app
from app.models import User
from app.db import get_connection
import os
from dotenv import load_dotenv

load_dotenv()

# This fixture will be used to create a test client for your Flask app
@pytest.fixture
def app():
    return flask_app

# This fixture will create a test client for your Flask app
@pytest.fixture
def client(app):
    with app.test_client() as test_client:
        yield test_client

# This fixture will be used to create a test database connection
@pytest.fixture
def test_db():
    # You can use a test-specific database or collections here
    return get_connection("TEST_DB_URL")

# This fixture will be used to clean up the test database after each test
@pytest.fixture(autouse=True)
def clean_up(test_db):
    yield
    for collection in test_db.list_collection_names():
        test_db.drop_collection(collection)