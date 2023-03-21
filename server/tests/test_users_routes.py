import pytest
from bson import ObjectId
from app.models import User
from flask import g
from unittest import mock

def test_add_user(client, test_db, correct_user_data):
    user_model = User(test_db)
    with client.application.app_context():
        g.user_model = user_model

        mock_get = mock.Mock()
        mock_get.return_value = "123"
        g.user_model.create = mock_get
    
        response = client.post("/users/", json=correct_user_data)
        assert response.status_code == 200
        assert "inserted_id" in response.json
        user_id = response.json["inserted_id"]
        assert user_id == "123"

def test_add_user_incorrect_data(client, test_db, incorrect_user_data):
    user_model = User(test_db)
    with client.application.app_context():
        g.user_model = user_model
        response = client.post("/users/", json=incorrect_user_data)
        assert response.status_code == 400
        assert response.json["error"] == "Invalid data"

def test_get_user(client, test_db, correct_user_data):
    user_model = User(test_db)
    with client.application.app_context():
        g.user_model = user_model

        mock_get = mock.Mock()
        mock_get.return_value = correct_user_data
        g.user_model.get = mock_get
    
        response = client.get("/users/1")
        assert response.status_code == 200
        mock_get.assert_called_with("1")
        assert response.json == correct_user_data

def test_get_user_none_found(client, test_db, correct_user_data):
    user_model = User(test_db)
    with client.application.app_context():
        g.user_model = user_model

        mock_get = mock.Mock()
        mock_get.return_value = None
        g.user_model.get = mock_get
    
        response = client.get("/users/1")
        mock_get.assert_called_with("1")
        assert response.status_code == 404
        assert response.json["error"] == "User not found"

# def test_update_user(client, test_db, correct_user_data):
#     user_model = User(test_db)
#     with client.application.app_context():
#         g.user_model = user_model

#         mock_get = mock.Mock()
#         mock_get.return_value = correct_user_data
#         g.user_model.update = mock_get
    
#         response = client.get("/users/1", json=correct_user_data)