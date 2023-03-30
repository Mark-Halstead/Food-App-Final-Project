from flask import Flask, render_template, request, session, redirect, url_for
from flask_socketio import join_room, leave_room, send, SocketIO, emit
import random
from string import ascii_uppercase
from pymongo import MongoClient
import datetime
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'asdf1234'
socketio = SocketIO(app)

# CustomJSONEncoder class 
class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S.%f')
        return super().default(obj)

app.json_encoder = CustomJSONEncoder

client = MongoClient('mongodb+srv://sadikislam46:QPKIU0iq3OtBQUTh@cluster0.4n37hvw.mongodb.net/?retryWrites=true&w=majority')
db = client['chat']
messages_collection = db['messages']

rooms = {}


def generate_unique_code(length):
    while True:
        code = ""
        for _ in range(length):
            code += random.choice(ascii_uppercase)
        
        if code not in rooms:
            break

    return code

# routes
@app.route('/', methods=['POST', 'GET'])
def home():
    session.clear() 
    if request.method == 'POST':
        name = request.form.get("name")
        code = request.form.get("code")
        join = request.form.get("join", False)
        create = request.form.get("create", False)

        if not name:
            return render_template('home.html', error='Enter a name', code=code, name=name)
        
        if join != False and not code:
            return render_template('home.html', error='Enter a room code', code=code, name=name)
        
        room = code
        if create != False:
            room = generate_unique_code(6)
            rooms[room] = {"members": 0, "messages": []}
        elif code not in rooms:
            return render_template('home.html', error='Room does not exist', code=code, name=name)

        session['room'] = room
        session['name'] = name

        # retrieve previous messages from MongoDB and send to user
        messages = list(messages_collection.find({"room": room}))
        for message in messages:
            send(message, to=room)

        return redirect(url_for("room"))

    return render_template('home.html')

@app.route('/room')
def room():
    room = session.get("room")
    if room is None or session.get("name") is None or room not in rooms:
        return redirect(url_for("home"))
    return render_template('room.html', code=room)

@socketio.on("message")
def message(data): # handle message -> retransmit to room
    room = session.get("room")
    if room not in rooms:
        return
    # the format and content of message
    content = {
        "name": session.get("name"),
        "message": data["data"],
        "timestamp": datetime.datetime.now(),
        "room": room
    }
    send(content, to=room)
    messages_collection.insert_one(content)

# socket connecting => user joining a room
@socketio.on("connect")
def connect(auth):
    # look in session for user name and room code
    room = session.get("room")
    name = session.get("name")
    if not room or not name:
        return
    # if room doesn't exist, remove user from that room
    if room not in rooms:
        leave_room(room)
        return

    # put user in the existing room
    join_room(room)
    send({"name": name, "message": "has entered the chat"}, to=room)
    rooms[room]["members"] += 1
    print(f"{name} joined room {room}")

# socket disconnecting => user leaving the room
@socketio.on("disconnect")
def disconnect():
    room = session.get("room")
    name = session.get("name")

    if room in rooms:
        rooms[room]["members"] -= 1
        if rooms[room]["members"] <= 0:
            del rooms[room]

    send({"name": name, "message": "has left the chat"}, to=room)
    print(f"{name} has left the room {room}")

# handle message -> retransmit to room and store in database
@socketio.on("message")
def message(data): 
    room = session.get("room")
    if room not in rooms:
        return
    # format message
    content = {
        "name": session.get("name"),
        "message": data["data"],
        #"timestamp": datetime.datetime.now()
    }
    send(content, to=room)
    # store message in MongoDB database
    messages_collection.insert_one(content)
    rooms[room]["messages"].append(content)

# route to retrieve all messages from a room from the MongoDB database
@app.route('/messages/<room>')
def get_messages(room):
    messages = list(messages_collection.find({"room": room}))
    return json.dumps({"messages": messages}, cls=CustomJSONEncoder)

if __name__ == '__main__':
    socketio.run(app, debug=True)