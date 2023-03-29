from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

from app.models.Base import Base

class MealPlanEntrySchema(BaseModel):
    user_id: str
    date: str
    breakfast: List[dict]
    lunch: List[dict]
    dinner: List[dict]
    snacks: List[dict]

class MealPlanEntry(Base):
    def __init__(self, table_name, db_connection=None):
        super().__init__(table_name, db_connection)

    def save_meal_plan(self, user_id, data):
        today = datetime.today().strftime("%Y-%m-%d")
        self.table.delete_many({"user_id": user_id, "date": {"$gt": today}})
        data = [d for d in data if d["date"] > today]
        self.table.insert_many(data)
        return data
    
    def get_user_by_date(self, date, user_id):
        diary_entries = self.table.find_one({
            "date": date,
            "user_id":user_id
        })
        return diary_entries
