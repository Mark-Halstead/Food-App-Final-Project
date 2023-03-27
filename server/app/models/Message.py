from pydantic import BaseModel, EmailStr, constr
from typing import Optional, List

from app.models.Base import Base

class MessageSchema(BaseModel):
    user_id: str
    nutritionist_id: str
    sender: str
    message: str

class Message(Base):
    def __init__(self, table_name, db_connection=None):
        super().__init__(table_name, db_connection)