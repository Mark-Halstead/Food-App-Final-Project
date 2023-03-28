from flask import Blueprint, request, Response, g
from pydantic import ValidationError
from flask import make_response, jsonify, request
from bson import ObjectId
import json
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

@nutritionist_routes.route("/clients", methods=["GET"])
@token_required("nutritionist")
def get_nutritionist(user_data):
    clients = g.user_model.get_by_query({"nutritionist_id":user_data["_id"]})
    if clients:
        return Response(JSONEncoder().encode(clients), content_type='application/json')
    else:
        return make_response(jsonify({"error": "Clients not found"}), 404)

@nutritionist_routes.route("/<nutritionist_id>", methods=["PUT"])
def update_nutritionist(nutritionist_id):
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