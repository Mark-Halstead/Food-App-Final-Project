from . import get_connection
from datetime import datetime, timedelta
import random
from faker import Faker
from faker_food import FoodProvider
from app.models.DailyDiaryEntry import DailyDiaryEntrySchema
from app.models.User  import UserSchema
from app.models.Nutritionist import NutritionistSchema
from app.models.Review import ReviewSchema
from app.models.MealPlanEntry import MealPlanEntrySchema


db = get_connection("DB_URL")

db.users.update_many({}, {"$set": {"meal_plan_confirmed": False}})

db.products.delete_many({})
db.diary_entries.delete_many({})
db.meal_plan_entries.delete_many({})
db.users.delete_many({})
db.nutritionists.delete_many({})
db.reviews.delete_many({})
db.tokens.delete_many({})

fake = Faker()
fake.add_provider(FoodProvider)

reviews_messages = [
    "I had a great experience working with my nutritionist! They were very knowledgeable and gave me helpful advice on how to improve my diet.",    
    "My nutritionist really helped me with my weight loss goals. They created a personalized plan for me and I've already seen great results.",    
    "I was skeptical about seeing a nutritionist at first, but I'm so glad I did. They were able to address my concerns and help me make positive changes in my eating habits.",    
    "I would definitely recommend this nutritionist to anyone looking to improve their health. They were very professional and made me feel comfortable throughout the entire process.",   
    "The nutritionist I worked with was incredibly thorough and really took the time to understand my needs. I appreciate all of their help and guidance.",
    "I've seen a few different nutritionists in the past, but this one was by far the best. They were easy to talk to and gave me practical advice that I could actually use in my day-to-day life.",    
    "I'm so glad I decided to see a nutritionist. They helped me identify some areas where I was falling short and gave me simple solutions to improve my diet.",    
    "The nutritionist I worked with was very knowledgeable and passionate about their work. It was clear that they really cared about helping me achieve my goals.",    
    "I would highly recommend this nutritionist to anyone looking to make positive changes in their diet. They were very patient and understanding, and really helped me stay motivated.",    
    "Working with a nutritionist has been a game-changer for me. I feel better than ever and have more energy throughout the day. I couldn't be happier with the results.",
    "I was really impressed with the level of detail my nutritionist provided. They gave me a lot of information about the specific nutrients my body needed and helped me create a meal plan that worked for my lifestyle.",
    "I had been struggling with digestive issues for years and my nutritionist was able to pinpoint the problem and help me make dietary changes that have made a huge difference. I'm so grateful for their expertise!",
    "My nutritionist was incredibly kind and supportive. They never made me feel judged or guilty about my eating habits and instead focused on helping me make positive changes.",
    "I was hesitant to see a nutritionist because I didn't think I needed one, but I'm so glad I did. They helped me realize that my diet was lacking in certain areas and gave me simple ways to improve it.",
    "I've been working with my nutritionist for a few months now and I've already seen a big improvement in my overall health. They really know their stuff!",
    "My nutritionist was able to provide me with a wealth of information about nutrition and wellness. They were also able to recommend some great recipes and resources to help me stay on track.",
    "I was struggling to lose weight on my own and my nutritionist was able to help me figure out why. They gave me practical tips on portion control and healthy snacking that have made all the difference.",
    "I was hesitant to spend money on a nutritionist, but it was one of the best investments I've ever made in my health. They were able to help me make lasting changes that will benefit me for years to come.",
    "I've worked with a few different nutritionists in the past, but none of them were as knowledgeable or as compassionate as the one I worked with recently. I would highly recommend them to anyone looking for guidance on nutrition.",
    "My nutritionist was able to help me create a customized plan that worked with my busy schedule and dietary restrictions. They were also great at answering my questions and helping me stay motivated.",
    "If you're looking for a nutritionist who really knows their stuff, look no further. The one I worked with was a true expert and I learned so much from them.",
    "I was skeptical about seeing a nutritionist at first, but after just one session I knew I had made the right choice. They were able to identify some key areas where I needed to make changes and gave me practical ways to do so.",
    "I've been working with my nutritionist for several months now and I can honestly say that I feel like a different person. I have more energy, fewer cravings, and just an overall better sense of well-being. Thank you!",
    "My nutritionist was incredibly patient and understanding. They never made me feel like I was asking dumb questions and always took the time to explain things in a way that made sense to me.",
    "I would highly recommend this nutritionist to anyone looking for guidance on how to eat for optimal health. They were incredibly knowledgeable and always had my best interests at heart.",
    "I was surprised at how much I learned from my nutritionist in just a few sessions. They really know their stuff and were able to provide me with practical solutions to some of my biggest dietary challenges.",
    "My nutritionist was able to help me identify some food sensitivities that I never would have figured out on my own. They were also great at providing alternatives and recipes that worked for my new diet.",
    "I was nervous about meeting with a nutritionist, but my fears were quickly put to rest. They were friendly, knowledgeable, and genuinely interested in helping me achieve my goals."  
]


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
            "nutritionist_pending":random.choice([False, True]),
            "nutritionist_message":fake.text(),
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
                "rating": random.randint(3, 5),
                "review_message": random.choice(reviews_messages)
            }
            review = ReviewSchema(**review_data)
            reviews.append(review)
    
    db.reviews.insert_many([review.dict() for review in reviews])

def add_tokens():
    tokens = []
    for user_id in [str(user["_id"]) for user in db.users.find()]:
        token = {
            "user_id": str(user_id),
            "token": fake.uuid4(),
            "role":"user"
        }
        tokens.append(token)
    for nutritionist_id in [str(nutritionist["_id"]) for nutritionist in db.nutritionists.find()]:
        token = {
            "user_id": str(nutritionist_id),
            "token": fake.uuid4(),
            "role":"nutritionist"
        }
        tokens.append(token)
    db.tokens.insert_many(tokens)

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

def add_dummy_meal_plan():
    # Generate a list of dates for the meal_plan entries
    date_format = "%Y-%m-%d"
    num_entries = 10
    start_date = datetime.now() - timedelta(days=num_entries)
    end_date = datetime.now() + timedelta(days=num_entries)
    dates = [(start_date + timedelta(days=i)).strftime(date_format) for i in range((end_date - start_date).days)]
    user_ids = [str(user["_id"]) for user in db.users.find()]
    products = list(db.products.find())

    meal_plan_entries = []

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
            meal_plan_entry = MealPlanEntrySchema(user_id=user_id, date=date, breakfast=breakfast, lunch=lunch, dinner=dinner, snacks=snacks)
            meal_plan_entries.append(meal_plan_entry)
    
    db.meal_plan_entries.insert_many([meal_plan_entry.dict() for meal_plan_entry in meal_plan_entries])

def add_dummy_diary_entries():
    # Generate a list of dates for the diary entries
    date_format = "%Y-%m-%d"
    num_entries = 10
    start_date = datetime.now() - timedelta(days=num_entries)
    end_date = datetime.now() + timedelta(days=num_entries)
    dates = [(start_date + timedelta(days=i)).strftime(date_format) for i in range((end_date - start_date).days)]
    user_ids = [str(user["_id"]) for user in db.users.find()]
    products = list(db.products.find())

    diary_entries = []

    for date in dates:
        for user_id in user_ids:
            breakfast = []
            lunch = []
            dinner = []
            snacks = []
            for i in range(random.randint(1, 2)):
                product = random.choice(products)
                serving_multiplier = round(random.uniform(0, 3), 1)
                confirmed = random.choice([True, False])
                food_item = {"product": product, "serving_multiplier": serving_multiplier, "confirmed": confirmed, "user_serving_size":serving_multiplier * product["serving_quantity"]}
                breakfast.append(food_item)
            for i in range(random.randint(1, 2)):
                product = random.choice(products)
                serving_multiplier = round(random.uniform(0, 3), 1)
                confirmed = random.choice([True, False])
                food_item = {"product": product, "serving_multiplier": serving_multiplier, "confirmed": confirmed, "user_serving_size":serving_multiplier * product["serving_quantity"]}
                lunch.append(food_item)
            for i in range(random.randint(1, 2)):
                product = random.choice(products)
                serving_multiplier = round(random.uniform(0, 3), 1)
                confirmed = random.choice([True, False])
                food_item = {"product": product, "serving_multiplier": serving_multiplier, "confirmed": confirmed, "user_serving_size":serving_multiplier * product["serving_quantity"]}
                dinner.append(food_item)
            for i in range(random.randint(0, 1)):
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

def populate_db():
    add_dummy_nutritionists()
    add_dummy_users()
    add_tokens()
    add_dummy_products()
    add_dummy_meal_plan()
    add_dummy_diary_entries()