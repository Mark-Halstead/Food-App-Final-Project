from pydantic import BaseModel
from typing import Optional, List

from app.models.Base import Base

class DailyDiaryEntrySchema(BaseModel):
    user_id: int
    date: str
    breakfast: List[int]
    lunch: List[int]
    dinner: List[int]
    snacks: List[int]
    mood: str
    weight: float
    followed_meal_plan: bool

class DailyDiaryEntry(Base):
    def __init__(self, table_name, db_connection=None):
        super().__init__(table_name, db_connection)