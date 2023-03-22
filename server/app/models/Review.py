from pydantic import BaseModel, EmailStr, constr
from typing import Optional, List

from app.models.Base import Base

# reviews table schema
class ReviewSchema(BaseModel):
    user_id: int
    nutritionist_id: int
    rating: int
    review: str

class Review(Base):
    def __init__(self, table_name, db_connection=None):
        super().__init__(table_name, db_connection)