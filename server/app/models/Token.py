from pydantic import BaseModel, EmailStr, constr
from typing import Optional, List
from bson import ObjectId

from app.models.Base import Base

from enum import Enum
class RoleEnum(str, Enum):
    user = "user"
    nutritionist = "nutritionist"

# reviews table schema
class TokenSchema(BaseModel):
    token: str
    role: RoleEnum
    user_id: ObjectId
    
    class Config:
        arbitrary_types_allowed = True

class Token(Base):
    def __init__(self, table_name, db_connection=None):
        super().__init__(table_name, db_connection)
