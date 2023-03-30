from bson.objectid import ObjectId
from datetime import date
from pymongo import MongoClient
from pydantic import ValidationError

from app.models.DailyDiaryEntry import (
    DailyDiaryEntry, DailyDiaryEntrySchema, DailyDiaryEntryUpdateSchema
)

# Sample data
SAMPLE_DATA = {
    "user_id": "test_user",
    "date": "2022-03-22",
    "breakfast": [],
    "lunch": [],
    "dinner": [],
    "snacks": [],
    "mood": 2,
    "weight": 70.5,
    "followed_meal_plan": True
}


# Test creating a new diary entry
def test_create_diary_entry():
    diary_entry = DailyDiaryEntry("daily_diary_entries")
    result = diary_entry.create(SAMPLE_DATA)
    assert result.inserted_id is not None