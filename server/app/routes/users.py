from flask import Blueprint, request, Response, g
from flask import make_response, jsonify, request
from pydantic import ValidationError
from bson import ObjectId
import json
import uuid
from passlib.hash import pbkdf2_sha256
from app.routes.auth import token_required

from app.models.User import UserSchema, UserUpdateSchema, User

# this is to be able to json encode the _id value (ObjectId object) that is returned from db
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


user_routes = Blueprint("user_routes", __name__)

@user_routes.route("/load_profile", methods=["GET"])
@token_required("user")
def get_user(user_data):
    if user_data["nutritionist_id"]:
        nutritionist_data = g.nutritionist_model.get(user_data["nutritionist_id"])
        nutritionist_data.pop("password")
    if user_data:
        user_data.pop("password")
        return Response(JSONEncoder().encode({"user_data":user_data, "nutritionist_data":nutritionist_data}), content_type='application/json')
    else:
        return make_response(jsonify({"error": "User not found"}), 404)


@user_routes.route('/signup', methods=["POST"])
def signup():
    # Create user object
    data = json.loads(request.data)
    
    if g.user_model.email_taken(data.get("email")):
        return make_response(jsonify({"error": "Email already in use."}), 409)
    
    user = {
        "token_id": uuid.uuid4().hex,
        "email": data.get("email"),
        "password": data.get("password"),
    }
    # Encrypt the password
    user['password'] = pbkdf2_sha256.encrypt(user['password'])
    new_user = g.user_model.create(user)
    user = g.user_model.get(new_user["_id"])
    token_data = {
        "token": user["token_id"],
        "role": "user",
        "user_id": str(new_user["_id"])
    }
    g.token_model.create(token_data)
    response_data = {"token_data":token_data, "user_data":user}
    return Response(JSONEncoder().encode(response_data), content_type='application/json')


@user_routes.route('/', methods=['PUT'])
@token_required('user')
def update_user(user_data):
    data = json.loads(request.data)
    updated_data = {
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
        "budget": data.get("budget"),
        "meal_plan_confirmed":False

    }

    updated_user = g.user_model.update(user_data["_id"], updated_data)
    return Response(JSONEncoder().encode(updated_user), content_type='application/json')


@user_routes.route('/select_nutritionist', methods=['PUT'])
@token_required('user')
def select_nutritionist(user_data):
    data = json.loads(request.data)
    nutritionist_id = data.get("nutritionist_id")
    nutritionist_pending = data.get("nutritionist_pending")
    nutritionist_message = data.get("nutritionist_message")

    if not nutritionist_id or not nutritionist_message:
        return make_response(jsonify({"error": "Nutritionist ID not given in request."}), 400)
    
    updated_data = {
        "nutritionist_id":nutritionist_id,
        "nutritionist_pending":nutritionist_pending,
        "nutritionist_message":nutritionist_message
    }

    updated_user = g.user_model.update(user_data["_id"], updated_data)
    return Response(JSONEncoder().encode(updated_user), content_type='application/json')



@user_routes.route('/signout')
def signout():
    new_user = g.user_model.signout()
    return jsonify(new_user)


@user_routes.route('/login', methods=['POST'])
def login():
    # Create user object
    data = json.loads(request.data)
    user = {
        "token_id": uuid.uuid4().hex,
        "email": data.get("email"),
        "password": data.get("password"),
    }
    # Encrypt the password
    user_data = g.user_model.get_by_query({"email": user["email"]})
    if not user_data:
        return make_response(jsonify({"error": "User not found"}), 404)
    if not pbkdf2_sha256.verify(data.get("password"), user_data["password"]):
        return make_response(jsonify({"error": "Password incorrect"}), 403)
    token_data = {
        "token": user["token_id"],
        "role": "user",
        "user_id": str(user_data["_id"])
    }
    token = g.token_model.create(token_data)
    response_data = {"token_data":token, "user_data":user_data}
    return Response(JSONEncoder().encode(response_data), content_type='application/json')
