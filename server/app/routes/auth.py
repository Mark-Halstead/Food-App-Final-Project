from app import jwt
from flask import request, g
from flask_jwt_extended import get_jwt_identity, JWTManager

@jwt.user_claims_loader
def add_claims_to_access_token(user):
    return {'role': user['role']}

@jwt.user_identity_loader
def user_identity_lookup(user):
    return user["_id"]

@jwt.token_in_request_loader
def extract_token_from_request():
    token = request.headers.get('Authorization')
    if token:
        token = token.split(' ')[1]
    return token

@jwt.user_loader_callback_loader
def user_loader_callback(identity):
    user = g.user_model.get(identity)
    if user:
        return user
    return None