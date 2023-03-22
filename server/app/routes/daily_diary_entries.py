from flask import Blueprint, request, Response, g, jsonify, make_response
from pydantic import ValidationError
from bson import ObjectId
from typing import List
import json

from app.models.DailyDiaryEntry import DailyDiaryEntrySchema


## this is to be able to json encode the _id value (ObjectId object) that is returned from db
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


daily_diary_routes = Blueprint("daily_diary_routes", __name__)

@daily_diary_routes.route("/", methods=["POST"])
def add_diary_entry():
    try:
        diary_data = request.json
        validated_data = DailyDiaryEntrySchema(**diary_data).dict()
        inserted_id = g.daily_diary_model.create(validated_data)
        return {"inserted_id": str(inserted_id)}
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)

@daily_diary_routes.route("/<entry_id>", methods=["GET"])
def get_diary_entry(entry_id):
    diary_entry = g.daily_diary_model.get(entry_id)
    if diary_entry:
        return Response(JSONEncoder().encode(diary_entry), content_type='application/json')
    else:
        return make_response(jsonify({"error": "Entry not found"}), 404)

@daily_diary_routes.route("/<entry_id>", methods=["PUT"])
def update_diary_entry(entry_id):
    try:
        diary_data = request.json
        validated_data = DailyDiaryEntrySchema(**diary_data).dict()
        modified_count = g.daily_diary_model.update(entry_id, validated_data)
        if modified_count:
            return {"modified_count": modified_count}
        else:
            return make_response(jsonify({"error": "Entry not found"}), 404)
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)

@daily_diary_routes.route("/<entry_id>", methods=["DELETE"])
def delete_diary_entry(entry_id):
    deleted_count = g.daily_diary_model.delete(entry_id)
    if deleted_count:
        return {"deleted_count": deleted_count}
    else:
        return make_response(jsonify({"error": "Entry not found"}), 404)
