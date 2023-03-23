from . import get_connection
from datetime import datetime, timedelta
import random
from faker import Faker
from app.models.DailyDiaryEntry import DailyDiaryEntrySchema
from app.models.User  import UserSchema


db = get_connection()
db.products.delete_many({})
db.diary_entries.delete_many({})
db.users.delete_many({})

fake = Faker()

def add_dummy_users():
    goals = ["Lose weight", "Maintain weight", "Gain weight"]
    activity_levels = ["Sedentary", "Lightly active", "Moderately active", "Very active"]
    for _ in range(10):
        user_data = {
            "nutritionist_id": random.randint(1, 10),
            "email": fake.email(),
            "password": "password123",
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "paid_subscription": fake.boolean(),
            "weight": random.uniform(50, 100),
            "age": random.randint(18, 60),
            "height": random.uniform(150, 200),
            "goal": random.choice(goals),
            "activity_level": random.choice(activity_levels),
            "dietary_restrictions": [fake.word() for _ in range(random.randint(0, 3))],
            "food_preferences": [fake.word() for _ in range(random.randint(0, 3))],
            "daily_calorie_target": random.uniform(1000, 3000),
            "meal_complexity": fake.word(),
            "budget": fake.word()
        }
        user = UserSchema(**user_data)
        result = db.users.insert_one(user.dict())
        print(f"User with ID {result.inserted_id} added to the collection")

def add_dummy_products():
    products = [
        {"name": "Banana", "calories": 89, "fat": 0.3, "protein": 1.1, "carbohydrate": 22.8, "salt": 0.01, "barcode": "1234567890"},
        {"name": "Apple", "calories": 52, "fat": 0.2, "protein": 0.3, "carbohydrate": 14, "salt": 0.001, "barcode": "2345678901"},
        {"name": "Chicken Breast", "calories": 165, "fat": 3.6, "protein": 31, "carbohydrate": 0, "salt": 0.06, "barcode": "3456789012"},
        {"name": "Rice", "calories": 130, "fat": 0.3, "protein": 2.7, "carbohydrate": 28, "salt": 0.001, "barcode": "4567890123"}
    ]
    db.products.insert_many(products)

def add_dummy_diary_entries():

    date = datetime.now().strftime("%Y-%m-%d")
    for i in range(10):
        user_id = str(random.choice([user["_id"] for user in db.users.find()]))
        breakfast = [{"item_id": i+1, "product_id": str(random.choice(list(db.products.find()))["_id"]), "serving_size": random.randint(50, 200), "confirmed": random.choice([True, False])} for i in range(random.randint(1, 5))]
        lunch = [{"item_id": i+1, "product_id": str(random.choice(list(db.products.find()))["_id"]), "serving_size": random.randint(50, 200), "confirmed": random.choice([True, False])} for i in range(random.randint(1, 5))]
        dinner = [{"item_id": i+1, "product_id": str(random.choice(list(db.products.find()))["_id"]), "serving_size": random.randint(50, 200), "confirmed": random.choice([True, False])} for i in range(random.randint(1, 5))]
        snacks = [{"item_id": i+1, "product_id": str(random.choice(list(db.products.find()))["_id"]), "serving_size": random.randint(10, 100), "confirmed": random.choice([True, False])} for i in range(random.randint(0, 3))]
        mood = random.choice(["Happy", "Sad", "Neutral"])
        weight = random.uniform(50, 100)
        followed_meal_plan = random.choice([True, False])
        diary_entry = DailyDiaryEntrySchema(user_id=user_id, date=date, breakfast=breakfast, lunch=lunch, dinner=dinner, snacks=snacks, mood=mood, weight=weight, followed_meal_plan=followed_meal_plan)
        db.diary_entries.insert_one(diary_entry.dict())

    # Decrement date by one day for the next entry
    date = (datetime.strptime(date, "%Y-%m-%d") - timedelta(days=1)).strftime("%Y-%m-%d")

add_dummy_users()
add_dummy_products()
add_dummy_diary_entries()