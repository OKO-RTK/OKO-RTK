from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import Blueprint, jsonify

protected_bp = Blueprint('protected', __name__)

@protected_bp.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200