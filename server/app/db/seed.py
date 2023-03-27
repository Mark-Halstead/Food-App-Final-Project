from . import get_connection
from datetime import datetime, timedelta
import random
from faker import Faker
from faker_food import FoodProvider
from app.models.DailyDiaryEntry import DailyDiaryEntrySchema
from app.models.User  import UserSchema
from app.models.Nutritionist import NutritionistSchema
from app.models.Review import ReviewSchema


db = get_connection("DB_URL")
db.products.delete_many({})
db.diary_entries.delete_many({})
db.users.delete_many({})
db.nutritionists.delete_many({})
db.reviews.delete_many({})

fake = Faker()
fake.add_provider(FoodProvider)

def add_dummy_nutritionists():
    nutritionists = []
    for _ in range(10):
        nutritionist_data = {
            "email": fake.email(),
            "password": "password123",
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "credentials": random.choice(["RD", "MS", "PhD", "MD"]),
            "area_of_expertise": random.choice(["Weight management", "Sports nutrition", "Eating disorders", "Gut health"]),
            "education_training": [f"{random.choice(['BS', 'MS', 'PhD'])} {fake.word()} {fake.city()} {random.choice(['University', 'College'])}" for _ in range(3)]
        }
        nutritionist = NutritionistSchema(**nutritionist_data)
        nutritionists.append(nutritionist)
    result = db.nutritionists.insert_many([nutritionist.dict() for nutritionist in nutritionists])

def add_dummy_users():
    goals = ["Lose weight", "Maintain weight", "Gain weight"]
    activity_levels = ["Sedentary", "Lightly active", "Moderately active", "Very active"]
    dietary_restrictions = ["Gluten-free", "Dairy-free", "Vegan", "Vegetarian", "Kosher", "Halal"]
    food_preferences = ["Italian", "Mexican", "Asian", "Mediterranean", "Indian"]
    nutritionist_ids = [str(nutritionist["_id"]) for nutritionist in db.nutritionists.find()]
    users = []
    for _ in range(100):
        user_data = {
            "nutritionist_id": random.choice(nutritionist_ids),
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
            "dietary_restrictions": [random.choice(dietary_restrictions) for _ in range(random.randint(0, 3))],
            "food_preferences": [random.choice(food_preferences) for _ in range(random.randint(0, 3))],
            "daily_calorie_target": random.uniform(1000, 3000),
            "meal_complexity": random.randint(0, 5),
            "budget": random.randint(0, 5)
        }
        user = UserSchema(**user_data)
        users.append(user)
    
    result = db.users.insert_many([user.dict() for user in users])
    user_ids = result.inserted_ids

    reviews = []
    for nutritionist_id in nutritionist_ids:
        for _ in range(random.randint(1, 5)):
            review_data = {
                "user_id": str(random.choice(user_ids)),
                "nutritionist_id": nutritionist_id,
                "rating": random.randint(1, 5),
                "review_message": fake.text()
            }
            review = ReviewSchema(**review_data)
            reviews.append(review)
    
    db.reviews.insert_many([review.dict() for review in reviews])

def add_dummy_products():
    products = []
    for i in range(100):
        product = {
            "allergens_tags": [],
            "brands": fake.company(),
            "id": str(random.randint(10000000, 99999999)),
            "nutriments": {
                "carbohydrates": round(random.uniform(0, 100), 1),
                "carbohydrates_100g": round(random.uniform(0, 100), 1),
                "carbohydrates_serving": round(random.uniform(0, 100), 1),
                "carbohydrates_unit": "g",
                "carbohydrates_value": round(random.uniform(0, 100), 1),
                "energy": round(random.uniform(0, 500), 1),
                "energy-kcal": round(random.uniform(0, 500), 1),
                "energy-kcal_100g": round(random.uniform(0, 500), 1),
                "energy-kcal_serving": round(random.uniform(0, 500), 1),
                "energy-kcal_unit": "kcal",
                "fat": "0.5",
                "fat_100g": "0.5",
                "proteins_100g": "0.5",
                "sodium_100g": "0.004",
            },
            "product_name_en": fake.ingredient(),
            "serving_quantity": round(random.uniform(0, 500), 1),
            "_id": str(random.randint(10000000, 99999999))
        }
        products.append(product)
    db.products.insert_many(products)

def add_dummy_diary_entries():
    # Generate a list of dates for the diary entries
    date_format = "%Y-%m-%d"
    num_entries = 10
    start_date = datetime.now() - timedelta(days=num_entries)
    end_date = datetime.now() + timedelta(days=num_entries)
    dates = [(start_date + timedelta(days=i)).strftime(date_format) for i in range((end_date - start_date).days)]
    user_ids = [user["_id"] for user in db.users.find()]
    products = list(db.products.find())

    diary_entries = []

    for date in dates:
        for user_id in user_ids:
            breakfast = []
            lunch = []
            dinner = []
            snacks = []
            for i in range(random.randint(1, 5)):
                product = random.choice(products)
                serving_multiplier = round(random.uniform(0, 3), 1)
                confirmed = random.choice([True, False])
                food_item = {"product": product, "serving_multiplier": serving_multiplier, "confirmed": confirmed, "user_serving_size":serving_multiplier * product["serving_quantity"]}
                breakfast.append(food_item)
            for i in range(random.randint(1, 5)):
                product = random.choice(products)
                serving_multiplier = round(random.uniform(0, 3), 1)
                confirmed = random.choice([True, False])
                food_item = {"product": product, "serving_multiplier": serving_multiplier, "confirmed": confirmed, "user_serving_size":serving_multiplier * product["serving_quantity"]}
                lunch.append(food_item)
            for i in range(random.randint(1, 5)):
                product = random.choice(products)
                serving_multiplier = round(random.uniform(0, 3), 1)
                confirmed = random.choice([True, False])
                food_item = {"product": product, "serving_multiplier": serving_multiplier, "confirmed": confirmed, "user_serving_size":serving_multiplier * product["serving_quantity"]}
                dinner.append(food_item)
            for i in range(random.randint(0, 3)):
                product = random.choice(products)
                serving_multiplier = round(random.uniform(0, 3), 1)
                confirmed = random.choice([True, False])
                food_item = {"product": product, "serving_multiplier": serving_multiplier, "confirmed": confirmed, "user_serving_size":serving_multiplier * product["serving_quantity"]}
                snacks.append(food_item)
            mood = random.choice([1, 2, 3, 4, 5])
            weight = random.uniform(50, 100)
            followed_meal_plan = random.choice([True, False])
            diary_entry = DailyDiaryEntrySchema(user_id=user_id, date=date, breakfast=breakfast, lunch=lunch, dinner=dinner, snacks=snacks, mood=mood, weight=weight, followed_meal_plan=followed_meal_plan)
            diary_entries.append(diary_entry)
    
    db.diary_entries.insert_many([diary_entry.dict() for diary_entry in diary_entries])

add_dummy_nutritionists()
add_dummy_users()
add_dummy_products()
add_dummy_diary_entries()