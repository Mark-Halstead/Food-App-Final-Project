from pydantic import BaseModel, Field
from typing import Optional, List
from bson import ObjectId
from datetime import date

from app.models.Base import Base

class DailyDiaryEntrySchema(BaseModel):
    user_id: str
    date: str
    breakfast: List[dict]
    lunch: List[dict]
    dinner: List[dict]
    snacks: List[dict]
    mood: int
    weight: float
    followed_meal_plan: bool

    class Config:
        arbitrary_types_allowed = True

class DailyDiaryEntryUpdateSchema(BaseModel):
    mood: Optional[int]
    weight: Optional[float]
    followed_meal_plan: Optional[bool]


class DailyDiaryEntry(Base):
    def __init__(self, table_name, db_connection=None):
        super().__init__(table_name, db_connection)

    def get_user_by_date(self, date, user_id):
        diary_entries = self.table.find_one({
            "date": date,
            "user_id":user_id
        })
        return diary_entries
        
    # def create(self, diary_entry: DailyDiaryEntrySchema) -> str:
    #     diary_entry_dict = diary_entry.dict()
    #     inserted_id = self.table.insert_one(diary_entry_dict).inserted_id
    #     return str(inserted_id)
    
    def create_diary_entry(self, diary_entry: DailyDiaryEntrySchema) -> DailyDiaryEntrySchema:
        diary_entry_dict = diary_entry.dict()
        result = self.table.insert_one(diary_entry_dict)
        diary_entry_dict['_id'] = result.inserted_id
        return DailyDiaryEntrySchema(**diary_entry_dict)