from flask import Blueprint, request, Response, g, jsonify, make_response
from pydantic import ValidationError
import openai
from bson import ObjectId
from typing import List
import json
openai.api_key = "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"

from app.models.MealPlanEntry import MealPlanEntrySchema


## this is to be able to json encode the _id value (ObjectId object) that is returned from db
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


meal_plan_routes = Blueprint("meal_plan_routes", __name__)

@meal_plan_routes.route("/<client_id>", methods=["POST"])
def add_meal_plan_entry(client_id):
    try:
        meal_plan_data = json.loads(request.data)
        meal_plan_data["user_id"] = client_id
        meal_plan = g.meal_plan_entry_model.get_by_query({"user_id":meal_plan_data["user_id"], "date":meal_plan_data["date"]})
        if meal_plan:
            # if already in there delete
            g.meal_plan_entry_model.delete(meal_plan["_id"])

        # add the new meal_plan
        validated_data = MealPlanEntrySchema(**meal_plan_data).dict()
        new_meal_plan = g.meal_plan_entry_model.create(validated_data)

        return new_meal_plan
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)

@meal_plan_routes.route("/<client_id>", methods=["GET"])
def get_meal_plan_entry(client_id):
    meal_plans = g.meal_plan_entry_model.get_all_by_query({"user_id":client_id})
    if meal_plans:
        return Response(JSONEncoder().encode(meal_plans), content_type='application/json')
    else:
        return make_response(jsonify({"error": "Entry not found"}), 404)

@meal_plan_routes.route("/<entry_id>", methods=["PUT"])
def update_meal_plan_entry(entry_id):
    try:
        meal_plan_data = request.json
        validated_data = MealPlanEntrySchema(**meal_plan_data).dict()
        modified_count = g.meal_plan_entry_model.update(entry_id, validated_data)
        if modified_count:
            return {"modified_count": modified_count}
        else:
            return make_response(jsonify({"error": "Entry not found"}), 404)
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)

@meal_plan_routes.route("/<entry_id>", methods=["DELETE"])
def delete_meal_plan_entry(entry_id):
    deleted_count = g.meal_plan_entry_model.delete(entry_id)
    if deleted_count:
        return {"deleted_count": deleted_count}
    else:
        return make_response(jsonify({"error": "Entry not found"}), 404)

@meal_plan_routes.route("/gpt", methods=["POST"])
def get_gpt():
    try:
        data = request.json
        print(data)
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=data["prompt"],
            top_p=1,
            max_tokens=1024,
            frequency_penalty=0.0,
            presence_penalty=0.0,
            best_of=1,
            stop=None
        )

        chat_response = response.choices[0].text
        return jsonify({"response": response})
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)