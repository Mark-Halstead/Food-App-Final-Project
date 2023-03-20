from app import app

@app.route('/')
def index():
    return {"welcome":"Welcome to the PlatePal API"}
