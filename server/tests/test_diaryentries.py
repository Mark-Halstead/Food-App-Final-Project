import pytest
from bson import ObjectId

from app.models.DailyDiaryEntry import DailyDiaryEntry, DailyDiaryEntrySchema

@pytest.fixture(scope='function')
def daily_diary_entry():
    daily_diary_entry = DailyDiaryEntry("daily_diary_entries_test")
    yield daily_diary_entry
    daily_diary_entry.table.drop()

def test_create_diary_entry(daily_diary_entry):
    # Create a new diary entry
    diary_entry = DailyDiaryEntrySchema(
        user_id="test_user",
        date="2022-03-30",
        breakfast=[{"name": "eggs", "calories": 150}],
        lunch=[{"name": "salad", "calories": 200}],
        dinner=[{"name": "chicken", "calories": 300}],
        snacks=[{"name": "apple", "calories": 50}],
        mood=4,
        weight=70.5,
        followed_meal_plan=True
    )

    # Call the create method and get the ID of the inserted diary entry
    result = daily_diary_entry.create(diary_entry)

    # Check that the returned result is a string
    assert isinstance(result, str)

'''
def test_create_diary_entry_missing_required_fields(daily_diary_entry):
    # Create a new diary entry with missing required fields
    diary_entry = DailyDiaryEntrySchema(
        user_id="test_user",
        date="2022-03-30",
        breakfast=[{"name": "eggs", "calories": 150}],
        lunch=[{"name": "salad", "calories": 200}],
        dinner=[{"name": "chicken", "calories": 300}],
        snacks=[{"name": "apple", "calories": 50}]
    )

    # Call the create method and expect it to raise a ValueError
    with pytest.raises(ValueError):
        daily_diary_entry.create(diary_entry)
'''