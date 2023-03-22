from flask import Blueprint, request, Response, g, jsonify, make_response
from pydantic import ValidationError
from bson import ObjectId
import json

from app.models.Review import ReviewSchema


## this is to be able to json encode the _id value (ObjectId object) that is returned from db
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


review_routes = Blueprint("review_routes", __name__)

@review_routes.route("/", methods=["POST"])
def add_review():
    try:
        review_data = request.json
        validated_data = ReviewSchema(**review_data).dict()
        inserted_id = g.review_model.create(validated_data)
        return {"inserted_id": str(inserted_id)}
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)

@review_routes.route("/<review_id>", methods=["GET"])
def get_review(review_id):
    review = g.review_model.get(review_id)
    if review:
        return Response(JSONEncoder().encode(review), content_type='application/json')
    else:
        return make_response(jsonify({"error": "Review not found"}), 404)

@review_routes.route("/<review_id>", methods=["PUT"])
def update_review(review_id):
    try:
        review_data = request.json
        validated_data = ReviewSchema(**review_data).dict()
        modified_count = g.review_model.update(review_id, validated_data)
        if modified_count:
            return {"modified_count": modified_count}
        else:
            return make_response(jsonify({"error": "Review not found"}), 404)
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)

@review_routes.route("/<review_id>", methods=["DELETE"])
def delete_review(review_id):
    deleted_count = g.review_model.delete(review_id)
    if deleted_count:
        return {"deleted_count": deleted_count}
    else:
        return make_response(jsonify({"error": "Review not found"}), 404)
