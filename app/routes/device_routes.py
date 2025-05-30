from app.services.device_service import DeviceService
from app.services.alert_service import AlertService

from app.models.device import Device
from app.models.user import User

from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity

from app import cache
from app import db


device_bp = Blueprint('device', __name__)


@device_bp.route('/api/device', methods=['GET'])
@jwt_required()
@cache.cached(timeout=10, key_prefix=lambda: f"devices_list:{get_jwt_identity()}")
def get_device():
    identity = get_jwt_identity()
    try:
        DeviceService.update_device_statuses_by_user(identity)
        devices = DeviceService.get_device(identity)
        return jsonify({'devices': devices}), 200
    except:
        return jsonify({"error": "Ошибка сервера"}), 500


@device_bp.route('/api/device/<int:device_id>', methods=['GET'])
@jwt_required()
def get_device_id(device_id):
    identity = get_jwt_identity()
    try:
        device = DeviceService.get_device_by_id(identity,device_id)
        return jsonify({"device": device}), 200
    except:
        return jsonify({"error": "Ошибка сервера"}), 500


@device_bp.route('/api/device/<int:device_id>/delete', methods=['DELETE'])
@jwt_required()
def delete_device_id(device_id):
    identity = get_jwt_identity()
    try:
        message = DeviceService.delete_device_by_id(identity,device_id)
        #AlertService.add_alert("/device/delete",identity,message.name)
        return jsonify({"message": message}), 200
    except:
        return jsonify({"error": "Ошибка сервера"}), 500
    


@device_bp.route('/api/device/add', methods=['POST'])
@jwt_required()
def add_device():
    try:
        data = request.get_json()
        identity = get_jwt_identity()
        if not data:
            return jsonify({"error": "Заполните поля данных"}), 400
        device,error = DeviceService.add_device(data, identity)
        if device is None:
            return jsonify({"error": error}), 402
        AlertService.add_alert("/device/add",identity,device.name)
        return jsonify({"message": "Устройство добавлено","device":device.name}), 201
    
    except Exception as e:
        current_app.logger.error(f"Ошибка при добавлении устройства: {e}")
        return jsonify({"error": "Ошибка сервера"}), 500


@device_bp.route('/api/device/<int:device_id>/edit', methods=['PUT'])
@jwt_required()
def edit_device_id(device_id):
    try:
        data = request.get_json()
        identity = get_jwt_identity()
        device = DeviceService.edit_device_by_id(identity, data,device_id)
        AlertService.add_alert("/device/edit",identity,device.name)
        return jsonify({"device": device.to_dict()}), 200
    except Exception as e:
        current_app.logger.error(f"Ошибка при добавлении устройства: {e}")
        return jsonify({"error": "Ошибка сервера"}), 500


