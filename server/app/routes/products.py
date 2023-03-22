from flask import Blueprint, request, Response, g, jsonify, make_response
from pydantic import ValidationError
from bson import ObjectId
import json

from app.models.Product import ProductSchema


## this is to be able to json encode the _id value (ObjectId object) that is returned from db
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


product_routes = Blueprint("product_routes", __name__)

@product_routes.route("/", methods=["GET"])
def get_all_products():
    try:
        results = g.product_model.index()
        return Response(JSONEncoder().encode(results), content_type='application/json')
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)
    
@product_routes.route("/", methods=["POST"])
def add_product():
    try:
        product_data = request.json
        validated_data = ProductSchema(**product_data).dict()
        inserted_id = g.product_model.create(validated_data)
        return {"inserted_id": str(inserted_id)}
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)

@product_routes.route("/<product_id>", methods=["GET"])
def get_product(product_id):
    product = g.product_model.get(product_id)
    if product:
        return Response(JSONEncoder().encode(product), content_type='application/json')
    else:
        return make_response(jsonify({"error": "Product not found"}), 404)

@product_routes.route("/<product_id>", methods=["PUT"])
def update_product(product_id):
    try:
        product_data = request.json
        validated_data = ProductSchema(**product_data).dict()
        modified_count = g.product_model.update(product_id, validated_data)
        if modified_count:
            return {"modified_count": modified_count}
        else:
            return make_response(jsonify({"error": "Product not found"}), 404)
    except ValidationError as e:
        return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)

@product_routes.route("/<product_id>", methods=["DELETE"])
def delete_product(product_id):
    deleted_count = g.product_model.delete(product_id)
    if deleted_count:
        return {"deleted_count": deleted_count}
    else:
        return make_response(jsonify({"error": "Product not found"}), 404)
