'''
import pytest
from pymongo import MongoClient
from bson.objectid import ObjectId

from app.models.DailyDiaryEntry import DailyDiaryEntry, DailyDiaryEntrySchema

# Define fixtures
@pytest.fixture(scope="module")
def test_db_connection():
    client = MongoClient("mongodb://localhost:27017/")
    yield client.daily_diary_db
    client.drop_database("daily_diary_db")

@pytest.fixture
def daily_diary_entry(test_db):
    table_name = "daily_diary_entries"
    daily_diary_entry = DailyDiaryEntry(table_name, test_db)
    yield daily_diary_entry
    test_db[table_name].delete_many({})

# define test funcs
def test_create_daily_diary_entry(test_db, daily_diary_entry):
    # create mock daily diary entry
    daily_diary_entry_data = {
    "user_id": "1234",
    "date": "2022-03-23",
    "breakfast": [{"food": "Eggs", "calories": 200}, {"food": "Toast", "calories": 100}],
    "lunch": [{"food": "Chicken Salad", "calories": 400}],
    "dinner": [{"food": "Salmon", "calories": 300}, {"food": "Steamed Vegetables", "calories": 100}],
    "snacks": [{"food": "Apple", "calories": 50}],
    "mood": "Happy",
    "weight": 150.5,
    "followed_meal_plan": True
    }
    # create new diary entry
    created_entry = daily_diary_entry.create(daily_diary_entry)

    # check if entry was created correctly
    assert created_entry is not None
    assert isinstance(created_entry, DailyDiaryEntry)
    assert isinstance(created_entry.id, ObjectId)

    # check if entry attributes match data
    for key, value in daily_diary_entry_data.items():
        assert getattr(created_entry, key) == value
        '''

import pytest
from pymongo import MongoClient
from bson.objectid import ObjectId
from pymongo.errors import DuplicateKeyError

from app.models.DailyDiaryEntry import DailyDiaryEntry, DailyDiaryEntrySchema

@pytest.fixture(scope="module")
def mongo_db():
    # connect to test db
    client = MongoClient("mongodb+srv://sadikislam46:JR7ul1mWMceWutq0@cluster0.kp3eqes.mongodb.net/test")
    db = client.test_db

    # Create a test collection
    db.daily_diary_entries.delete_many({})
    db.daily_diary_entries.insert_one({
        "_id": ObjectId("61670c15781c270f8fa0cc03"),
        "user_id": "test_user",
        "date": "2022-03-22",
        "breakfast": [],
        "lunch": [],
        "dinner": [],
        "snacks": [],
        "mood": "good",
        "weight": 70.5,
        "followed_meal_plan": True
    })

    yield db

    # Clean up after the test
    #client.drop_database("test_db") # user is not allowed to drop table so test will fail if you don't comment it out

def test_get_by_date(mongo_db):
    # Initialize the DailyDiaryEntry model with the test database
    diary_entry = DailyDiaryEntry("daily_diary_entries", mongo_db)

    # Call the get_by_date method with a known date
    result = diary_entry.get_by_date("2022-03-22")

    # Check that the returned result matches the expected result
    expected_result = {
        "_id": ObjectId("61670c15781c270f8fa0cc03"),
        "user_id": "test_user",
        "date": "2022-03-22",
        "breakfast": [],
        "lunch": [],
        "dinner": [],
        "snacks": [],
        "mood": "good",
        "weight": 70.5,
        "followed_meal_plan": True
    }
    assert result == expected_result