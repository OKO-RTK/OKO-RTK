from app.services.alert_service import AlertService

from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity 
import logging

alert_bp = Blueprint('alert', __name__)
logger = logging.getLogger("flask")

@alert_bp.route('/api/alert', methods=['GET'])
@jwt_required()
def get_alert():
    login = get_jwt_identity()
    try:
        alerts = AlertService.get_alerts(login)
        if alerts is None:
            return jsonify({"error": "Пользователь не найден"}), 404
        return jsonify(alerts), 200
    except: 
        return jsonify({"error": "Ошибка сервера"}), 500



