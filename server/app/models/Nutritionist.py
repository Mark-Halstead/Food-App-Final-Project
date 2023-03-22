from pydantic import BaseModel, EmailStr, constr
from typing import Optional, List

from app.models.Base import Base

## these classes are used for data validation purposes 
class NutritionistSchema(BaseModel):
    email: EmailStr
    password: constr(min_length=8)
    first_name: str
    last_name: str
    credentials: str
    area_of_expertise: str
    education_training: List[str]

class NutritionistUpdateSchema(BaseModel):
    credentials: str
    area_of_expertise: str
    education_training: str


class Nutritionist(Base):
    def __init__(self, table_name, db_connection=None):
        super().__init__(table_name, db_connection)