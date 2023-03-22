from pydantic import BaseModel
from typing import Optional, List

from app.models.Base import Base

class MealPlanEntrySchema(BaseModel):
    user_id: int
    date: str
    breakfast: List[int]
    lunch: List[int]
    dinner: List[int]
    snacks: List[int]

class MealPlanEntry(Base):
    def __init__(self, table_name, db_connection=None):
        super().__init__(table_name, db_connection)