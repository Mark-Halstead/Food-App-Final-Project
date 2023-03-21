from pymongo import MongoClient
from datetime import datetime
import os

def get_connection(url="TEST_DB_URL"):
    DB_URL = os.getenv(url)
    client = MongoClient(DB_URL)

    return client.flask_db