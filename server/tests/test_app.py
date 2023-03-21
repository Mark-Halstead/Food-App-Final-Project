import json
import pytest
from bson import ObjectId
from app.models import User
from pydantic import ValidationError
from flask import g

@pytest.fixture
def user_data():
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

def test_add_user(client, test_db, user_data):
    user_model = User(test_db)
    with client.application.app_context():
        g.user_model = user_model
        response = client.post("/users/", json=user_data)
        assert response.status_code == 200
        assert "inserted_id" in response.json
        user_id = response.json["inserted_id"]
        assert ObjectId.is_valid(user_id)
        # Check if the user was added to the test_db
        assert user_model.get(user_id) is not None

