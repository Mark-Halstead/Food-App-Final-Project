from flask import Blueprint, request, Response, g, jsonify, make_response
from pydantic import ValidationError
from bson import ObjectId
from typing import List
import json
from datetime import datetime

from app.models.DailyDiaryEntry import DailyDiaryEntrySchema, DailyDiaryEntryUpdateSchema


## this is to be able to json encode the _id value (ObjectId object) that is returned from db
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

diary_routes = Blueprint("diary_routes", __name__)

# @diary_routes.route("/", methods=["POST"])
# def add_diary_entry():
#     try:
#         diary_data = request.json
#         validated_data = DailyDiaryEntrySchema(**diary_data).dict()
#         inserted_id = g.diary_entry_model.create(validated_data)
#         return {"inserted_id": str(inserted_id)}
#     except ValidationError as e:
#         return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)

@diary_routes.route("", methods=["GET"])
def get_diary_entry():
    try:
        user_id = request.args.get("user_id")
        if not user_id:
            raise TypeError("User ID parameter not included in api call.")
        user_id = ObjectId(user_id)
        diary_entries = g.diary_entry_model.get_by_user_id(user_id)
    except ValueError:
        return make_response(jsonify({"error": "Invalid date format, should be yyyy-mm-dd"}), 400)
    except TypeError as e:
        return make_response(jsonify({"error": e}), 400)

    if diary_entries:
        return Response(JSONEncoder().encode(diary_entries), content_type='application/json')
    else:
        return make_response(jsonify({"error": "Entry not found"}), 404)

@diary_routes.route("/<entry_id>/foods/<meal>/<food_item_id>", methods=["PUT"])
def confirm_food_item(entry_id, meal, food_item_id):
    data = json.loads(request.data)
    confirmed = data.get("confirmed")
    diary_entry = g.diary_entry_model.get(entry_id)

    if not diary_entry:
        return make_response(jsonify({"error": "Diary entry not found"}), 404)

    meal_items = diary_entry[meal]

    for item in meal_items:
        if str(item["product"]["_id"]) == food_item_id:
            item["confirmed"] = confirmed
            break

    updated_data = g.diary_entry_model.update(diary_entry["_id"], diary_entry)

    return Response(JSONEncoder().encode(updated_data), content_type='application/json')

@diary_routes.route("/<entry_id>/foods/<meal>", methods=["POST"])
def add_food_item(entry_id, meal):
    data = json.loads(request.data)

    diary_entry = g.diary_entry_model.get(entry_id)

    if not diary_entry:
        return make_response(jsonify({"error": "Diary entry not found"}), 404)
    
    # here we need to append the food item to the correct meal and update
    product = g.product_model.get_by_id(data["id"])
    if not product:
        product = g.product_model.create(data)

    item_already_in_meal = False
    for item in diary_entry[meal]:
        if item["product"]["id"] == data["id"]:
            item_already_in_meal = True
            break

    if item_already_in_meal:
        item["serving_multiplier"] = float(item["serving_multiplier"]) + float(data["serving_multiplier"])
        item["user_serving_size"] = round(float(data["serving_multiplier"]) * float(product["serving_quantity"]), 2)
    else:
        user_serving_size = round(float(data["serving_multiplier"]) * float(product["serving_quantity"]), 2)
        new_item = {"product":product, "serving_multiplier":float(data["serving_multiplier"]), "confirmed":False, "user_serving_size":user_serving_size}
        diary_entry[meal].append(new_item)
  

    updated_diary_entry = g.diary_entry_model.update(diary_entry["_id"], diary_entry)


    return Response(JSONEncoder().encode(updated_diary_entry), content_type='application/json')

@diary_routes.route("/<entry_id>/foods/<meal>/<food_item_id>", methods=["DELETE"])
def delete_food_item(entry_id, meal, food_item_id):
    diary_entry = g.diary_entry_model.get(entry_id)

    if not diary_entry:
        return make_response(jsonify({"error": "Diary entry not found"}), 404)

    meal_items = diary_entry[meal]

    for item in meal_items:
        if str(item["product"]["_id"]) == food_item_id:
            meal_items.remove(item)
            break

    updated_data = g.diary_entry_model.update(diary_entry["_id"], diary_entry)

    return Response(JSONEncoder().encode(updated_data), content_type='application/json')


@diary_routes.route("/<entry_id>", methods=["PUT"])
def update_entry(entry_id):
    update_data = json.loads(request.data)

    diary_entry = g.diary_entry_model.get(entry_id)

    if not diary_entry:
        return make_response(jsonify({"error": "Diary entry not found"}), 404)


    updated_data = g.diary_entry_model.update(diary_entry["_id"], update_data)

    return Response(JSONEncoder().encode(updated_data), content_type='application/json')


# @diary_routes.route("/<entry_id>", methods=["PUT"])
# def update_diary_entry(entry_id):
#     try:
#         diary_data = request.json
#         validated_data = DailyDiaryEntrySchema(**diary_data).dict()
#         modified_count = g.diary_entry_model.update(entry_id, validated_data)
#         if modified_count:
#             return {"modified_count": modified_count}
#         else:
#             return make_response(jsonify({"error": "Entry not found"}), 404)
#     except ValidationError as e:
#         return make_response(jsonify({"error": "Invalid data", "details": e.errors()}), 400)


@diary_routes.route("/<entry_id>", methods=["DELETE"])
def delete_diary_entry(entry_id):
    deleted_count = g.diary_entry_model.delete(entry_id)
    if deleted_count:
        return {"deleted_count": deleted_count}
    else:
        return make_response(jsonify({"error": "Entry not found"}), 404)


def calculate_diary_entry_stats(diary_entry):
    meals = ["breakfast", "lunch", "dinner", "snacks"]
    # meal_stats = {meal: {"calories": 0, "fat": 0, "protein": 0, "carbohydrate": 0} for meal in meals}

    for meal in meals:
        food_items = []
        for food_item in diary_entry[meal]:
            food_stats = g.product_model.get(food_item["product_id"])
            food_items.append({**food_stats, **food_item})
    #         if food_item.get("confirmed"):
    #             for key in meal_stats[meal]:
    #                 meal_stats[meal][key] += food_stats.get(key, 0)
        diary_entry[meal] = food_items

    # total_stats = {key: sum(meal_stats[meal][key] for meal in meals) for key in meal_stats["breakfast"]}

    diary_entry_with_totals = {
        "entry_id": diary_entry["_id"],
        "date": diary_entry["date"],
        "breakfast": diary_entry["breakfast"],
        "lunch": diary_entry["lunch"],
        "dinner": diary_entry["dinner"],
        "snacks": diary_entry["snacks"],
        "mood": diary_entry["mood"],
        "weight": diary_entry["weight"],
        "followed_meal_plan": diary_entry["followed_meal_plan"],
        # "totals": {
        #     **meal_stats,
        #     **total_stats,
        # }
    }
    return diary_entry_with_totals
