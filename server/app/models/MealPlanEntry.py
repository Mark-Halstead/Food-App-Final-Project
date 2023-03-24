from pydantic import BaseModel
from typing import Optional, List

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