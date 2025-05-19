from app.services.auth_service import AuthService

from flask import Blueprint, request, jsonify, current_app
import logging

auth_bp = Blueprint('auth', __name__)
logger = logging.getLogger("flask")

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('login') or not data.get('password'):
        return jsonify({"message": "Отсутсвует логин или пароль"}), 400
    user, error = AuthService.register_user(data['login'], data['password'])
    
    if error:
        return jsonify({"message": error}), 409
    current_app.logger.info(f"Пользователь {data['login']} успешно зарегистрирован")
    return jsonify({"message": "Вы успешно зарегистрированы"}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('login') or not data.get('password'):
        return jsonify({"message": "Отсутсвует логин или пароль"}), 400

    token, error = AuthService.authenticate_user(data['login'], data['password'])
    if error:
        return jsonify({"message": error}), 409
    if token:
        current_app.logger.info(f"Пользователь {data['login']} успешно вошел")
        return jsonify(access_token=token), 200

