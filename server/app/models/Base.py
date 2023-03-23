from bson import ObjectId
from app.db import get_connection

class Base:
    def __init__(self, table_name, db_connection=None):
        if db_connection is None:
            db_connection = get_connection()
        self.table = db_connection[table_name]

    def index(self):
        results = self.table.find()
        list_of_results = []
        for r in results:
            list_of_results.append(r)
        return list_of_results

    def create(self, data):
        return self.table.insert_one(data).inserted_id

    def get(self, id):
        return self.table.find_one({"_id": ObjectId(id)})

    def update(self, id, update_data):
        return self.table.update_one({"_id": ObjectId(id)}, {"$set": update_data}).modified_count

    def delete(self, id):
        return self.table.delete_one({"_id": ObjectId(id)}).deleted_count