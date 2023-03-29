from pymongo import MongoClient
from bson import ObjectId
import datetime

# connect to MongoDB database
client = MongoClient('mongodb+srv://sadikislam46:QPKIU0iq3OtBQUTh@cluster0.4n37hvw.mongodb.net/?retryWrites=true&w=majority')
db = client['chat']
messages_collection = db['messages']

class Message:
    def __init__(self, name, message, room):
        self.name = name
        self.message = message
        self.room = room
        self.created_at = datetime.datetime.utcnow()

    def save(self):
        message = {
            "name": self.name,
            "message": self.message,
            "room": self.room,
            "created_at": self.created_at
        }
        messages_collection.insert_one(message)

class Room:
    def __init__(self):
        self.rooms = {}

    def generate_unique_code(self, length):
        while True:
            code = ""
            for _ in range(length):
                code += random.choice(string.ascii_uppercase)
            
            if code not in self.rooms:
                break

        return code

    def create_room(self):
        room_code = self.generate_unique_code(6)
        self.rooms[room_code] = {"members": 0, "messages": []}
        return room_code

    def room_exists(self, room_code):
        return room_code in self.rooms

    def add_member(self, room_code):
        self.rooms[room_code]["members"] += 1

    def remove_member(self, room_code):
        self.rooms[room_code]["members"] -= 1
        if self.rooms[room_code]["members"] <= 0:
            del self.rooms[room_code]

    def add_message(self, room_code, message):
        self.rooms[room_code]["messages"].append(message)
        message.save()

    def get_messages(self, room_code):
        messages = list(messages_collection.find({"room": room_code}))
        return messages
