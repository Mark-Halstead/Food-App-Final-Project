from pymongo import MongoClient
from datetime import datetime
import os

DB_USER = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
CONNECTION_STRING = f"mongodb+srv://{DB_USER}:{DB_PASSWORD}@cluster0.wjh5z8b.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(CONNECTION_STRING)

db = client.flask_db