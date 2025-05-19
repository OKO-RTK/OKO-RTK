from app.services.alert_service import AlertService
from app.services.user_service import UserService
from app.services.auth_service import AuthService

from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity, decode_token 
import logging


user_bp = Blueprint('user', __name__)
logger = logging.getLogger("flask")

@user_bp.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    identity = get_jwt_identity()
    user = AuthService.accept_user(identity)
    try:
        if not user:
            return jsonify({"msg": "User not found"}), 404

        return jsonify(user.to_dict()), 200

    except Exception as e:
        current_app.logger.error(f"Ошибка при отображении группs: {e}")
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500


@user_bp.route('/user/edit', methods=['PUT'])
@jwt_required()
def edit_user():
    identity = get_jwt_identity() 
    update_data = request.get_json() 
    try:
        user = UserService.edit_user(identity, update_data)
        token = UserService.update_user_token(user)
        decoded = decode_token(token)
        identity = decoded['sub']
        alert = AlertService.add_alert("/user/edit",identity,user.to_dict()['email'])
        return jsonify({
            "user": user.to_dict(), 
            "access_token": token  
        }), 200
    except ValueError as e:
        return jsonify({"msg": str(e)}), 400  
    except Exception as e:
        return jsonify({"msg": str(e)}), 500 


@user_bp.route('/user/edit/email', methods=['PUT'])
@jwt_required()
def edit_user_email():
    login = get_jwt_identity() 
    data = request.get_json()
    try:
        user,status = UserService.edit_user_email(login, data)
        if status == 200:
            token = UserService.update_user_token(user)
            return jsonify({
            "email": user.email, 
            "access_token": token  
        }),status  
        else:
            return jsonify(user), status
    except Exception as e:
        return jsonify({"msg": str(e)}), 500  