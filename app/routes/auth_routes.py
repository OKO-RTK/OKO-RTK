from flask import Blueprint, request, jsonify
from app.services.auth_service import AuthService

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"msg": "Missing username or password"}), 400

    user, error = AuthService.register_user(data['username'], data['password'])
    if error:
        return jsonify({"msg": error}), 409

    return jsonify({"msg": "User created successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"msg": "Missing username or password"}), 400

    token = AuthService.authenticate_user(data['username'], data['password'])
    if token:
        return jsonify(access_token=token), 200

    return jsonify({"msg": "Bad credentials"}), 401