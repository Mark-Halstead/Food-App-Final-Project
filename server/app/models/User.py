from pydantic import BaseModel, EmailStr, constr
from typing import Optional, List

from app.models.Base import Base

## these classes are used for data validation purposes 
class UserSchema(BaseModel):
    nutritionist_id: Optional[int]
    email: EmailStr
    password: constr(min_length=8)
    first_name: str
    last_name: str
    paid_subscription: bool
    weight: float
    age: int
    height: float
    goal: str
    activity_level: str
    dietary_restrictions: Optional[List[str]]
    food_preferences: Optional[List[str]]
    daily_calorie_target: float
    meal_complexity: str
    budget: str

class UserUpdateSchema(BaseModel):
    subscription_type: Optional[bool]
    weight: Optional[float]
    age: Optional[int]
    height: Optional[float]
    goal: Optional[str]
    activity_level: Optional[str]
    dietary_restrictions: Optional[List[str]]
    food_preferences: Optional[List[str]]
    daily_calorie_target: Optional[float]
    meal_complexity: Optional[str]
    budget: Optional[str]

class User(Base):
    def __init__(self, table_name, db_connection=None):
        super().__init__(table_name, db_connection)