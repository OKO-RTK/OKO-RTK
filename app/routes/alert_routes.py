from flask import Blueprint, request, jsonify, current_app
from app.services.alert_service import AlertService
from flask_jwt_extended import jwt_required, get_jwt_identity 
import logging

alert_bp = Blueprint('alert', __name__)
logger = logging.getLogger("flask")

@alert_bp.route('/alert', methods=['GET'])
@jwt_required()
def get_alert():
    login = get_jwt_identity()
    alerts = AlertService.get_alerts(login)
    if alerts is None:
        return jsonify({"msg": "User not found"}), 404
    return jsonify(alerts), 200


