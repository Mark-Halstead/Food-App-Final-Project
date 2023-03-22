from pydantic import BaseModel, EmailStr, constr
from typing import Optional, List

from app.models.Base import Base

class ProductSchema(BaseModel):
    name: str
    calories: float
    fat: float
    protein: float
    carbohydrate: float
    salt: float
    barcode: str

class Product(Base):
    def __init__(self, table_name, db_connection=None):
        super().__init__(table_name, db_connection)