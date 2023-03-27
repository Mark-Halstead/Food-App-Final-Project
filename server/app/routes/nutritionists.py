from flask import Blueprint, request, Response, g
from pydantic import ValidationError
from flask import make_response, jsonify, request
from bson import ObjectId
import json
import uuid
from passlib.hash import pbkdf2_sha256
from app.routes.auth import token_required

from app.models.Nutritionist import NutritionistSchema, NutritionistUpdateSchema

## this is to be able to json encode the _id value (ObjectId object) that is returned from db
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

nutritionist_routes = Blueprint("nutritionist_routes", __name__)

@nutritionist_routes.route("/", methods=["GET"])
def get_all_nutritionists():
    nutritionists = g.nutritionist_model.index()
    reviews = g.review_model.index()
    for n in nutritionists:
        nutritionist_reviews = [r for r in reviews if r["nutritionist_id"] == str(n["_id"])]
        n["reviews"] = nutritionist_reviews
        n["average_rating"] = sum([r["rating"] for r in nutritionist_reviews]) / len(nutritionist_reviews)

    ## add some logic for picking top picks (need to add client_id to request)
    for i in range(3):
        nutritionists[i]["top_pick"] = True

    if nutritionists:
        return Response(JSONEncoder().encode(nutritionists), content_type='application/json')
    else:
        return make_response(jsonify({"error": "Nutritionist not found"}), 404)

@nutritionist_routes.route("/", methods=["POST"])
def add_nutritionist():
    try:
        nutritionist_data = request.json
        validated_data = NutritionistSchema(**nutritionist_data).dict()
        inserted_id = g.nutritionist_model.create(validated_data)
        return {"inserted_id": str(inserted_id)}
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)

@nutritionist_routes.route("/<nutritionist_id>", methods=["GET"])
def get_nutritionist(nutritionist_id):
    nutritionist = g.nutritionist_model.get(nutritionist_id)
    if nutritionist:
        return Response(JSONEncoder().encode(nutritionist), content_type='application/json')
    else:
        return make_response(jsonify({"error": "Nutritionist not found"}), 404)

@nutritionist_routes.route("/<nutritionist_id>", methods=["PUT"])
def update_nutritionist_by_id(nutritionist_id):
    try:
        nutritionist_data = request.json
        validated_data = NutritionistUpdateSchema(**nutritionist_data).dict()
        modified_count = g.nutritionist_model.update(nutritionist_id, validated_data)
        if modified_count:
            return {"modified_count": modified_count}
        else:
            return make_response(jsonify({"error": "Nutritionist not found"}), 404)
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)

@nutritionist_routes.route("/<nutritionist_id>", methods=["DELETE"])
def delete_nutritionist(nutritionist_id):
    deleted_count = g.nutritionist_model.delete(nutritionist_id)
    if deleted_count:
        return {"deleted_count": deleted_count}
    else:
        return make_response(jsonify({"error": "Nutritionist not found"}), 404)


@nutritionist_routes.route('/signup', methods=["POST"])
def signup():
    # Create user object
    data = json.loads(request.data)
    nutritionist = {
        "token_id": uuid.uuid4().hex,
        "email": data.get("email"),
        "password": data.get("password"),
    }
    # Encrypt the password
    nutritionist['password'] = pbkdf2_sha256.encrypt(nutritionist['password'])
    new_nutritionist = g.user_model.create(nutritionist)
    token_data = {
        "token": nutritionist["token_id"],
        "role": "nutritionist",
        "nutritionist_id": new_nutritionist["_id"]
    }
    token = g.token_model.create(token_data)
    return Response(JSONEncoder().encode(token), content_type='application/json')


@nutritionist_routes.route('/', methods=['PUT'])
@token_required('nutritionist')
def update_nutritionist(nutritionist_data):
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
        "budget": data.get("budget")
    }

    updated_nutritionist = g.nutritionist_model.update(nutritionist_data["_id"], updated_data)
    return Response(JSONEncoder().encode(updated_nutritionist), content_type='application/json')



@nutritionist_routes.route('/signout')
def signout():
    new_nutritionist = g.nutritionist_model.signout()
    return jsonify(new_nutritionist)


@nutritionist_routes.route('/login', methods=['POST'])
def login():
    # Create user object
    data = json.loads(request.data)
    nutritionist = {
        "token_id": uuid.uuid4().hex,
        "email": data.get("email"),
        "password": data.get("password"),
    }
    # Encrypt the password
    nutritionist_data = g.nutritionist_model.get_by_query({"email": nutritionist["email"]})
    if not nutritionist_data:
        return make_response(jsonify({"error": "User not found"}), 404)
    if not pbkdf2_sha256.verify(data.get("password"), nutritionist_data["password"]):
        return make_response(jsonify({"error": "Password incorrect"}), 403)
    token_data = {
        "token": nutritionist["token_id"],
        "role": "nutritionist",
        "nutritionist_id": nutritionist_data["_id"]
    }
    token = g.token_model.create(token_data)
    return Response(JSONEncoder().encode(token), content_type='application/json')
