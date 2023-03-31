# PlatePal Server
The PlatePal Server is the backend for the PlatePal web app, which helps people find nutritionists. The server is built using Python and Flask, and communicates with a MongoDB database to store user and nutritionist data.

## Installation
To install the required libraries, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Run the command pipenv install.
## Environment Setup
In the /server directory, create a file named .env with the following contents:

`DB_URL="mongodb+srv://<db-username>:<db-password>@<db-host>/?retryWrites=true&w=majority"`
## Database Setup
To set up the database, follow these steps:

1. Open a terminal.
2. Navigate to the /server directory.
3. Run the command pipenv run seed.
## Running the Server
To run the server, follow these steps:

1. Open a terminal.
2. Navigate to the /server directory.
3. Run the command pipenv run start.
## API Routes and Functionality
API URL base: http://localhost:5000/

## Here are the base routes followed by each endpoint in each route file:

/users
/nutritionists
/products
/diary_entries
/reviews
/messages
/meal_plan_entries

Here's an example endpoint from the user_routes.py file:
```
@user_routes.route("/load_profile", methods=["GET"])
@token_required("user")
def get_user(user_data):
    if user_data["nutritionist_id"]:
        nutritionist_data = g.nutritionist_model.get(user_data["nutritionist_id"])
        nutritionist_data.pop("password")
    if user_data:
        user_data.pop("password")
        return Response(JSONEncoder().encode({"user_data":user_data, "nutritionist_data":nutritionist_data}), content_type='application/json')
    else:
        return make_response(jsonify({"error": "User not found"}), 404)
```

Use an API testing platform such as Hoppscotch to test the API.

## Known Bugs or Limitations
Please note that there may be some bugs in the project, including the following:

- More error handling may be needed.