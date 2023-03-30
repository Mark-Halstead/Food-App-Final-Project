import json
import pytest
from pytest_mock import mocker
from bson import ObjectId
from app.routes.nutritionists import nutritionist_routes

def test_get_all_nutritionists(client, mocker):
    mock_nutritionist_index = mocker.patch("app.routes.nutritionists.g.nutritionist_model.index")
    mock_review_index = mocker.patch("app.routes.nutritionists.g.review_model.index")

    nutritionist1 = {"_id": ObjectId(), "name": "Nutritionist 1"}
    nutritionist2 = {"_id": ObjectId(), "name": "Nutritionist 2"}

    mock_nutritionist_index.return_value = [nutritionist1, nutritionist2]
    mock_review_index.return_value = [        {"_id": ObjectId(), "nutritionist_id": str(nutritionist1["_id"]), "rating": 4},
        {"_id": ObjectId(), "nutritionist_id": str(nutritionist1["_id"]), "rating": 5},
        {"_id": ObjectId(), "nutritionist_id": str(nutritionist2["_id"]), "rating": 3},
        {"_id": ObjectId(), "nutritionist_id": str(nutritionist2["_id"]), "rating": 2},
        {"_id": ObjectId(), "nutritionist_id": str(nutritionist2["_id"]), "rating": 1},
    ]

    response = client.get("/nutritionists/")
    assert response.status_code == 200

    data = json.loads(response.data.decode())
    assert len(data) == 2

    assert data[0]["reviews"] == [        {"_id": str(mock_review_index.return_value[0]["_id"]), "nutritionist_id": str(nutritionist1["_id"]), "rating": 4},
        {"_id": str(mock_review_index.return_value[1]["_id"]), "nutritionist_id": str(nutritionist1["_id"]), "rating": 5},
    ]
    assert data[0]["average_rating"] == 4.5
    assert data[0]["top_pick"] == True

    assert data[1]["reviews"] == [        {"_id": str(mock_review_index.return_value[2]["_id"]), "nutritionist_id": str(nutritionist2["_id"]), "rating": 3},
        {"_id": str(mock_review_index.return_value[3]["_id"]), "nutritionist_id": str(nutritionist2["_id"]), "rating": 2},
        {"_id": str(mock_review_index.return_value[4]["_id"]), "nutritionist_id": str(nutritionist2["_id"]), "rating": 1},
    ]
    assert data[1]["average_rating"] == 2
    assert data[1]["top_pick"] == True

def test_add_nutritionist_valid_data(client, mocker):
    mock_nutritionist_create = mocker.patch("app.routes.nutritionists.g.nutritionist_model.create")

    nutritionist_data = {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "password123",
    }

    response = client.post("/nutritionists/", json=nutritionist_data)
    assert response.status_code == 200

    data = json.loads(response.data.decode())
    assert "inserted_id" in data

    assert mock_nutritionist_create.call_count == 1
    assert mock_nutritionist_create.call_args[0][0] == nutritionist_data

