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
        n["average_rating"] = 0 if len(nutritionist_reviews) == 0 else sum([r["rating"] for r in nutritionist_reviews]) / len(nutritionist_reviews)

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

@nutritionist_routes.route("/clients", methods=["GET"])
@token_required("nutritionist")
def get_nutritionist(user_data):
    clients = g.user_model.get_all_client_profiles(user_data["_id"])

    return Response(JSONEncoder().encode(clients), content_type='application/json')


@nutritionist_routes.route("/accept_client/<client_id>", methods=["PUT"])
@token_required("nutritionist")
def accept_client(user_data, client_id):
    update_data = {
        "nutritionist_pending": False
    }
    client = g.user_model.get(client_id)

    if not client or client["nutritionist_id"] != str(user_data["_id"]):
        return make_response(jsonify({"error": "Client not found"}), 404)
    
    updated_client = g.user_model.update(client_id, update_data)
    return Response(JSONEncoder().encode(updated_client), content_type='application/json')

@nutritionist_routes.route("/decline_client/<client_id>", methods=["PUT"])
@token_required("nutritionist")
def decline_client(user_data, client_id):
    update_data = {
        "nutritionist_id": "",
        "nutritionist_message":""
    }
    client = g.user_model.get(client_id)

    if not client or client["nutritionist_id"] != str(user_data["_id"]):
        return make_response(jsonify({"error": "Client not found"}), 404)
    
    updated_client = g.user_model.update(client_id, update_data)
    return Response(JSONEncoder().encode(updated_client), content_type='application/json')

@nutritionist_routes.route("/send_meal_plan/<client_id>", methods=["PUT"])
@token_required("nutritionist")
def send_meal_plan(user_data, client_id):
    client = g.user_model.get(client_id)

    if not client or client["nutritionist_id"] != str(user_data["_id"]):
        return make_response(jsonify({"error": "Client not found"}), 404)
    
    update_data = {"meal_plan_confirmed": True}
    updated_client = g.user_model.update(client_id, update_data)
    return Response(JSONEncoder().encode(updated_client), content_type='application/json')


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
    # Create nutritionist object
    data = json.loads(request.data)
    nutritionist = {
        "token_id": uuid.uuid4().hex,
        "email": data.get("email"),
        "password": data.get("password"),
    }
    # Encrypt the password
    nutritionist['password'] = pbkdf2_sha256.encrypt(nutritionist['password'])
    new_nutritionist = g.nutritionist_model.create(nutritionist)
    token_data = {
        "token": nutritionist["token_id"],
        "role": "nutritionist",
        "user_id": new_nutritionist["_id"]
    }
    token = g.token_model.create(token_data)
    return Response(JSONEncoder().encode(token), content_type='application/json')


@nutritionist_routes.route('/', methods=['PUT'])
@token_required('nutritionist')
def update_nutritionist(user_data):
    data = json.loads(request.data)
    updated_data = {
        "first_name": data.get("firstName"),
        "last_name": data.get("lastName"),
        "credentials": data.get("credentials"),
        "area_of_expertise": data.get("areaOfExpertise"),
        "education_training": data.get("educationTraining")
    }

    updated_nutritionist = g.nutritionist_model.update(user_data["_id"], updated_data)
    return Response(JSONEncoder().encode(updated_nutritionist), content_type='application/json')


@nutritionist_routes.route('/signout')
def signout():
    new_nutritionist = g.nutritionist_model.signout()
    return jsonify(new_nutritionist)


@nutritionist_routes.route('/login', methods=['POST'])
def login():
    # Create nutritionist object
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
        "user_id": nutritionist_data["_id"]
    }
    token = g.token_model.create(token_data)
    return Response(JSONEncoder().encode(token), content_type='application/json')
