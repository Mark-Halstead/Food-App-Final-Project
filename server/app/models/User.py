from pydantic import BaseModel, EmailStr, constr
from typing import Optional, List
from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from bson import ObjectId
from app import db
import uuid

from app.models.Base import Base

## these classes are used for data validation purposes 
class UserSchema(BaseModel):
    nutritionist_id: Optional[ObjectId]
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

    class Config:
        arbitrary_types_allowed = True

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

    class Config:
        arbitrary_types_allowed = True

class User(Base):
    def __init__(self, table_name, db_connection=None):
        super().__init__(table_name, db_connection)


    def start_session(self, user):
        del user['password']
        session['logged_in'] = True
        session['user'] = user
        return user


    def signup(self, user):

        if self.table.insert_one(user):
            user['_id'] = str(user['_id'])
            return self.start_session(user)

        return user


    def signout(self):
        session.clear()
        if 'user' in session:
            return {'message': 'You did not logout successfully'}
        else:
            return {'message': 'User signed out successfully'}


    def login(self):

        user = self.table.find_one({
            "email": request.form.get('email')
        })

        if user and pbkdf2_sha256.verify(request.form.get('password'), user['password']):
            user['_id'] = str(user['_id'])
            return self.start_session(user)

        return jsonify({"error":"invalid login credentials"}), 401


    
