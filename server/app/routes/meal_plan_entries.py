from flask import Blueprint, request, Response, g, jsonify, make_response
from pydantic import ValidationError
from bson import ObjectId
from typing import List
import json

from app.models.MealPlanEntry import MealPlanEntrySchema


## this is to be able to json encode the _id value (ObjectId object) that is returned from db
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


meal_plan_routes = Blueprint("meal_plan_routes", __name__)

@meal_plan_routes.route("/", methods=["POST"])
def add_meal_plan_entry():
    try:
        meal_plan_data = request.json
        validated_data = MealPlanEntrySchema(**meal_plan_data).dict()
        inserted_id = g.meal_plan_model.create(validated_data)
        return {"inserted_id": str(inserted_id)}
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)

@meal_plan_routes.route("/<entry_id>", methods=["GET"])
def get_meal_plan_entry(entry_id):
    meal_plan_entry = g.meal_plan_model.get(entry_id)
    if meal_plan_entry:
        return Response(JSONEncoder().encode(meal_plan_entry), content_type='application/json')
    else:
        return make_response(jsonify({"error": "Entry not found"}), 404)

@meal_plan_routes.route("/<entry_id>", methods=["PUT"])
def update_meal_plan_entry(entry_id):
    try:
        meal_plan_data = request.json
        validated_data = MealPlanEntrySchema(**meal_plan_data).dict()
        modified_count = g.meal_plan_model.update(entry_id, validated_data)
        if modified_count:
            return {"modified_count": modified_count}
        else:
            return make_response(jsonify({"error": "Entry not found"}), 404)
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)

@meal_plan_routes.route("/<entry_id>", methods=["DELETE"])
def delete_meal_plan_entry(entry_id):
    deleted_count = g.meal_plan_model.delete(entry_id)
    if deleted_count:
        return {"deleted_count": deleted_count}
    else:
        return make_response(jsonify({"error": "Entry not found"}), 404)
