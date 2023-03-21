from flask import Blueprint, request, Response, g
from pydantic import BaseModel, EmailStr, constr, ValidationError
from flask import make_response, jsonify, request
from typing import Optional, List
from bson import ObjectId
import json

from app.models.User import User

## these classes are used for data validation purposes 
class UserSchema(BaseModel):
    nutritionist_id: Optional[int]
    email: EmailStr
    password: constr(min_length=8)
    first_name: str
    last_name: str
    paid_subscription: bool
    weight: float
    age: int
    height: float
    goal: str
    activity_level: str
    dietary_restrictions: Optional[List[str]]
    food_preferences: Optional[List[str]]
    daily_calorie_target: float
    meal_complexity: str
    budget: str

class UserUpdateSchema(BaseModel):
    subscription_type: Optional[bool]
    weight: Optional[float]
    age: Optional[int]
    height: Optional[float]
    goal: Optional[str]
    activity_level: Optional[str]
    dietary_restrictions: Optional[List[str]]
    food_preferences: Optional[List[str]]
    daily_calorie_target: Optional[float]
    meal_complexity: Optional[str]
    budget: Optional[str]

## this is to be able to json encode the _id value (ObjectId object) that is returned from db
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

user_routes = Blueprint("user_routes", __name__)

@user_routes.route("/", methods=["POST"])
def add_user():
    try:
        user_data = request.json
        validated_data = UserSchema(**user_data).dict()
        inserted_id = g.user_model.create(validated_data)
        return {"inserted_id": str(inserted_id)}
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)

@user_routes.route("/<user_id>", methods=["GET"])
def get_user(user_id):
    user = g.user_model.get(user_id)
    if user:
        return Response(JSONEncoder().encode(user), content_type='application/json')
    else:
        return make_response(jsonify({"error": "User not found"}), 404)

@user_routes.route("/<user_id>", methods=["PUT"])
def update_user(user_id):
    try:
        user_data = request.json
        validated_data = UserUpdateSchema(**user_data).dict()
        modified_count = g.user_model.update(user_id, validated_data)
        if modified_count:
            return {"modified_count": modified_count}
        else:
            return make_response(jsonify({"error": "User not found"}), 404)
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)

@user_routes.route("/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    deleted_count = g.user_model.delete(user_id)
    if deleted_count:
        return {"deleted_count": deleted_count}
    else:
        return make_response(jsonify({"error": "User not found"}), 404)