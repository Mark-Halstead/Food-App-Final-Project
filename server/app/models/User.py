from app.db.connect import db
from bson import ObjectId

users = db.users

class User:
    @staticmethod
    def create(user_data):
        return users.insert_one(user_data).inserted_id

    @staticmethod
    def get(user_id):
        return users.find_one({"_id": ObjectId(user_id)})

    @staticmethod
    def update(user_id, user_data):
        return users.update_one({"_id": ObjectId(user_id)}, {"$set": user_data}).modified_count

    @staticmethod
    def delete(user_id):
        return users.delete_one({"_id": ObjectId(user_id)}).deleted_count