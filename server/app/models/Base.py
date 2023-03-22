from bson import ObjectId
from app.db import get_connection

class Base:
    def __init__(self, db_connection=None):
        if db_connection is None:
            db_connection = get_connection()
        self.users = db_connection.users

    def create(self, user_data):
        return self.users.insert_one(user_data).inserted_id

    def get(self, user_id):
        return self.users.find_one({"_id": ObjectId(user_id)})

    def update(self, user_id, user_data):
        return self.users.update_one({"_id": ObjectId(user_id)}, {"$set": user_data}).modified_count

    def delete(self, user_id):
        return self.users.delete_one({"_id": ObjectId(user_id)}).deleted_count