from flask import Blueprint, request, Response, g, jsonify, make_response
from pydantic import ValidationError
from bson import ObjectId
import json

from app.models.Message import MessageSchema


## this is to be able to json encode the _id value (ObjectId object) that is returned from db
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


message_routes = Blueprint("message_routes", __name__)

@message_routes.route("/", methods=["POST"])
def add_message():
    try:
        message_data = request.json
        validated_data = MessageSchema(**message_data).dict()
        inserted_id = g.message_model.create(validated_data)
        return {"inserted_id": str(inserted_id)}
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)

@message_routes.route("/<message_id>", methods=["GET"])
def get_message(message_id):
    message = g.message_model.get(message_id)
    if message:
        return Response(JSONEncoder().encode(message), content_type='application/json')
    else:
        return make_response(jsonify({"error": "Message not found"}), 404)

@message_routes.route("/<message_id>", methods=["PUT"])
def update_message(message_id):
    try:
        message_data = request.json
        validated_data = MessageSchema(**message_data).dict()
        modified_count = g.message_model.update(message_id, validated_data)
        if modified_count:
            return {"modified_count": modified_count}
        else:
            return make_response(jsonify({"error": "Message not found"}), 404)
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)

@message_routes.route("/<message_id>", methods=["DELETE"])
def delete_message(message_id):
    deleted_count = g.message_model.delete(message_id)
    if deleted_count:
        return {"deleted_count": deleted_count}
    else:
        return make_response(jsonify({"error": "Message not found"}), 404)
