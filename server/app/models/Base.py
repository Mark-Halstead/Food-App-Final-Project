from bson import ObjectId
from app.db import get_connection
import pymongo

class Base:
    def __init__(self, table_name, db_connection=None):
        if db_connection is None:
            db_connection = get_connection("DB_URL")
        self.table = db_connection[table_name]

    def index(self):
        results = self.table.find()
        list_of_results = [r for r in results]
        return list_of_results

    def create(self, data):
        id = self.table.insert_one(data).inserted_id
        return self.get(id)

    def get(self, id):
        document = self.table.find_one({"_id": ObjectId(id)})
        if document is None:
            return None
        document["_id"] = str(document["_id"])
        return document
    
    def get_by_query(self, query):
        document = self.table.find_one(query)
        if document is None:
            return None
        document["_id"] = str(document["_id"])
        return document
    
    def get_all_by_query(self, query):
        documents = self.table.find(query)
        if not documents:
            return None
        documents = [{**d, "_id":str(d["_id"])} for d in documents]
        return documents

    def update(self, id, update_data):
        # remove _id key if present
        "_id" in update_data and update_data.pop("_id")
        updated_document = self.table.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": update_data},
            return_document=pymongo.ReturnDocument.AFTER
        )
        return updated_document
    
    def get_by_user_id(self, user_id):
        diary_entries = self.table.find({
            "user_id": user_id
        })
        return [d for d in diary_entries]

    def delete(self, id):
        return self.table.delete_one({"_id": ObjectId(id)}).deleted_count
