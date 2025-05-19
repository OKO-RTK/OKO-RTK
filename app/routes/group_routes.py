from app.services.alert_service import AlertService
from app.services.group_service import GroupService

from app.models.device_status import DeviceStatus
from app.models.group import Group

from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity

from app import db


group_bp = Blueprint('group', __name__)

@group_bp.route('/group/add', methods=['POST'])
@jwt_required()
def add_group():
    try:
        data = request.get_json()
        identity = get_jwt_identity()
        if not data:
            return jsonify({"message": "Нет переданных данных"}), 400

        group, status = GroupService.add_group(identity, data)

        if status != 201:
            AlertService.add_alert("/group/add'",identity,group.group_name)
            return jsonify({"message": group}), status
        return jsonify({"group":group.to_dict()}), status

    except Exception as e:
        current_app.logger.error(f"Ошибка при добавлении группы: {e}")
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500


@group_bp.route('/group/<string:group_name>', methods=['GET'])
@jwt_required()
def get_group_by_name(group_name):
    try:
        identity = get_jwt_identity()
        group, status = GroupService.get_group_by_name(identity, group_name)

        if status != 200:
            return jsonify(group), status
        return jsonify({"group": group}), status

    except Exception as e:
        current_app.logger.error(f"Ошибка при отображении группы: {e}")
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500


@group_bp.route('/group/<string:group_name>/edit', methods=['PUT'])
@jwt_required()
def edit_group_by_name(group_name):
    try:
        identity = get_jwt_identity()
        data = request.get_json()

        message, status = GroupService.edit_group_by_name(identity, group_name,data)
        AlertService.add_alert("/group/edit",identity,group_name)
        return jsonify(message), status

    except Exception as e:
        current_app.logger.error(f"Ошибка при отображении группы: {e}")
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500


@group_bp.route('/group/<string:group_name>/delete', methods=['DELETE'])
@jwt_required()
def delete_group_by_name(group_name):
    try:
        identity = get_jwt_identity()
        message, status = GroupService.delete_group_by_name(identity, group_name)
        AlertService.add_alert("/group/delete'",identity,group_name)
        return jsonify(message), status

    except Exception as e:
        current_app.logger.error(f"Ошибка при отображении группы: {e}")
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500


@group_bp.route('/group', methods=['GET'])
@jwt_required()
def get_group():
    try:
        identity = get_jwt_identity()
        groups, status = GroupService.get_group(identity)

        if status != 200:
            return jsonify(groups), status
        return jsonify({"groups": groups})

    except Exception as e:
        current_app.logger.error(f"Ошибка при отображении группs: {e}")
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500

