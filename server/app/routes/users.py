from flask import Blueprint, request, Response, g
from flask import make_response, jsonify, request
from pydantic import ValidationError
from bson import ObjectId
import json
import uuid
from passlib.hash import pbkdf2_sha256

from app.models.User import UserSchema, UserUpdateSchema, User


# this is to be able to json encode the _id value (ObjectId object) that is returned from db
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


# @user_routes.route("/<user_id>", methods=["PUT"])
# def update_user(user_id):
#     try:
#         user_data = request.json
#         validated_data = UserUpdateSchema(**user_data).dict()
#         modified_count = g.user_model.update(user_id, validated_data)
#         if modified_count:
#             return {"modified_count": modified_count}
#         else:
#             return make_response(jsonify({"error": "User not found"}), 404)
#     except ValidationError as e:
#         return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)


@user_routes.route("/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    deleted_count = g.user_model.delete(user_id)
    if deleted_count:
        return {"deleted_count": deleted_count}
    else:
        return make_response(jsonify({"error": "User not found"}), 404)


@user_routes.route('/signup', methods=["POST"])
def signup():
    # Create user object
    data = json.loads(request.data)
    user = {
        "token_id": uuid.uuid4().hex,
        "email": data.get("email"),
        "password": data.get("password"),
    }
    # Encrypt the password
    user['password'] = pbkdf2_sha256.encrypt(user['password'])
    new_user = g.user_model.signup(user)
    token_data = {
        "token": user["token_id"],
        "role": "user",
        "user_id": new_user["_id"]
    }
    token = g.token_model.create(token_data)
    return Response(JSONEncoder().encode(new_user), content_type='application/json')


@user_routes.route('/<token_id>', methods=['PUT'])
def update_user(token_id):
    data = json.loads(request.data)
    user = {
        "first_name": data.get("first_name"),
        "last_name": data.get("last_name"),
        "paid_subscription": data.get("paid_subscription"),
        "weight": data.get("weight"),
        "age": data.get("age"),
        "height": data.get("height"),
        "goal": data.get("goal"),
        "activity_level": data.get("activity_level"),
        "dietary_restrictions": data.get("dietary_restrictions"),
        "food_preferences": data.get("food_preferences"),
        "daily_calorie_target": data.get("daily_calorie_target"),
        "meal_complexity": data.get("meal_complexity"),
        "budget": data.get("budget")
    }
    token_data = g.token_model.find_by_token(token_id)
    user_id = token_data["user_id"]
    updated_user = g.user_model.update(user_id, user)
    return Response(JSONEncoder().encode(updated_user), content_type='application/json')



@user_routes.route('/signout')
def signout():
    new_user = g.user_model.signout()
    return jsonify(new_user)


@user_routes.route('/login', methods=['POST'])
def login():
    logged_in_user = g.user_model.login()
    return Response(JSONEncoder().encode(logged_in_user), content_type='application/json')
