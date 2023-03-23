from pydantic import BaseModel, Field
from typing import Optional, List
from bson import ObjectId

from app.models.Base import Base

class DailyDiaryEntrySchema(BaseModel):
    user_id: str
    date: str
    breakfast: List[dict]
    lunch: List[dict]
    dinner: List[dict]
    snacks: List[dict]
    mood: str
    weight: float
    followed_meal_plan: bool

class DailyDiaryEntry(Base):
    def __init__(self, table_name, db_connection=None):
        super().__init__(table_name, db_connection)

    def get_by_date(self, date):
        diary_entries = self.table.find_one({
            "date": date
        })
        return diary_entries