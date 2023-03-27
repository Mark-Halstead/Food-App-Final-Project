from functools import wraps
from flask import request, abort, g

def user_token_required(role):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            token = request.headers.get('Authorization')
            if not token:
                abort(401, 'Token is missing')

            token_data = g.token_model.find_by_token(token)
            if not token_data or token_data.get('role') != role:
                abort(401, 'Invalid token')

            user_id = token_data.get('user_id')
            user_data = g.user_model.get(user_id)
            if not user_data:
                abort(401, 'User not found')

            kwargs['user_data'] = user_data
            return func(*args, **kwargs)

        return wrapper
    return decorator

def nutritionist_token_required(role):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            token = request.headers.get('Authorization')
            if not token:
                abort(401, 'Token is missing')

            token_data = g.token_model.find_by_token(token)
            if not token_data or token_data.get('role') != role:
                abort(401, 'Invalid token')

            nutritionist_id = token_data.get('nutritionist_id')
            nutritionist_data = g.nutritionist_model.get(nutritionist_id)
            if not nutritionist_data:
                abort(401, 'Nutritionist not found')

            kwargs['nutritionist_data'] = nutritionist_data
            return func(*args, **kwargs)

        return wrapper
    return decorator
