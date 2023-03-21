from bson import ObjectId
import pytest
from app.models import User
from flask import g

def test_create_user(test_db, correct_user_data):
    user_model = User(test_db)

    inserted_id = user_model.create(correct_user_data)
    assert ObjectId.is_valid(inserted_id)

def test_get_user(test_db, correct_user_data):
    user_model = User(test_db)

    inserted_id = user_model.create(correct_user_data)
    user = user_model.get(str(inserted_id))
    assert user is not None
    assert user["_id"] == inserted_id

def test_update_user(test_db, correct_user_data, update_user_data):
    correct_user_data["daily_calorie_target"] = 2000
    update_user_data["daily_calorie_target"] = 2500
    user_model = User(test_db)

    inserted_id = user_model.create(correct_user_data)

    modified_count = user_model.update(str(inserted_id), update_user_data)
    assert modified_count == 1

    user = user_model.get(str(inserted_id))
    assert user["daily_calorie_target"] == 2500

def test_delete_user(test_db, correct_user_data):
    user_model = User(test_db)

    inserted_id = user_model.create(correct_user_data)
    deleted_count = user_model.delete(str(inserted_id))
    assert deleted_count == 1
