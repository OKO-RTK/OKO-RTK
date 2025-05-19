from app.services.dashboard_service import DashboardService
from app.services.alert_service import AlertService

from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity

from app import db


dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/dashboard/device/<string:device_name>', methods=['GET'])
@jwt_required()
def get_device_by_name(device_name):
    identity = get_jwt_identity()
    device = DashboardService.get_device_by_name(identity,device_name)
    return jsonify(device), 200

@dashboard_bp.route('/dashboard/export/<string:device_name>/<string:filename>', methods=['GET'])
@jwt_required()
def export_device_logs(device_name,filename):
    identity = get_jwt_identity()
    response = DashboardService.export_device_logs_to_csv(identity, device_name,filename)
    if not response:
        return jsonify({"msg": "Данные не найдены"}), 404
    return response

