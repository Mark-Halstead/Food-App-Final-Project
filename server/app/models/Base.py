from bson import ObjectId
from app.db import get_connection
import pymongo

class Base:
    def __init__(self, table_name, db_connection=None):
        if db_connection is None:
            db_connection = get_connection()
        self.table = db_connection[table_name]

    def index(self):
        results = self.table.find()
        list_of_results = [r for r in results]
        return list_of_results

    def create(self, data):
        id = self.table.insert_one(data).inserted_id
        return self.get(id)

    def get(self, id):
        return self.table.find_one({"_id": ObjectId(id)})

    def update(self, id, update_data):
        updated_document = self.table.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": update_data},
            return_document=pymongo.ReturnDocument.AFTER
        )
        return updated_document

    def delete(self, id):
        return self.table.delete_one({"_id": ObjectId(id)}).deleted_count